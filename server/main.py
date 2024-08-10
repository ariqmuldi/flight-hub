import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_login import UserMixin, login_user, LoginManager, current_user, logout_user, login_required
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship, DeclarativeBase, Mapped, mapped_column
from sqlalchemy import Integer, String, Text
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
TOKEN_ENDPOINT = "https://test.api.amadeus.com/v1/security/oauth2/token"
API_ENDPOINT = "https://test.api.amadeus.com/v1/reference-data/locations/cities"
FLIGHT_OFFERS_ENDPOINT = "https://test.api.amadeus.com/v2/shopping/flight-offers"

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv("FLASK_SECRET_KEY") # Session managment
cors = CORS(app, origins="*", supports_credentials=True)

AMADEUS_API_KEY = os.getenv("AMADEUS_API_KEY")
AMADEUS_API_SECRET = os.getenv("AMADEUS_API_SECRET")

login_manager = LoginManager()
login_manager.init_app(app)

class Base(DeclarativeBase):
    pass
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
db = SQLAlchemy(model_class=Base)
db.init_app(app)

class User(UserMixin, db.Model):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String(100), unique=True)
    password: Mapped[str] = mapped_column(String(100))
    name: Mapped[str] = mapped_column(String(100))
    posts = relationship("BlogPost", back_populates="author")
    comments = relationship("Comment", back_populates="comment_author")

class BlogPost(db.Model):
    __tablename__ = "blog_posts"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    author_id: Mapped[int] = mapped_column(Integer, db.ForeignKey("users.id"))
    author = relationship("User", back_populates="posts")
    title: Mapped[str] = mapped_column(String(250), unique=True, nullable=False)
    subtitle: Mapped[str] = mapped_column(String(250), nullable=False)
    date: Mapped[str] = mapped_column(String(250), nullable=False)
    body: Mapped[str] = mapped_column(Text, nullable=False)
    img_url: Mapped[str] = mapped_column(String(250), nullable=False)
    
    #***************Parent Relationship*************#
    comments = relationship("Comment", back_populates="parent_post")

class Comment(db.Model):
    __tablename__ = "comments"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    author_id: Mapped[int] = mapped_column(Integer, db.ForeignKey("users.id"))
    comment_author = relationship("User", back_populates="comments")
    
    #***************Child Relationship*************#
    post_id: Mapped[int] = mapped_column(Integer, db.ForeignKey("blog_posts.id"))
    parent_post = relationship("BlogPost", back_populates="comments")
    text: Mapped[str] = mapped_column(Text, nullable=False)

with app.app_context():
    db.create_all()

def get_amadeus_token():
    header = {
            'Content-Type': 'application/x-www-form-urlencoded'
    }
    body = {
        'grant_type': 'client_credentials',
        'client_id': AMADEUS_API_KEY,
        'client_secret': AMADEUS_API_SECRET
    }
    response = requests.post(url=TOKEN_ENDPOINT, headers=header, data=body) # Idk why its data instead of json but yeah
    # print(f"Your token is {response.json()['access_token']} and expires in {response.json()['expires_in']} seconds")
    return response.json()['access_token']

@login_manager.user_loader
def load_user(user_id):
    return db.get_or_404(User, user_id)

@app.route('/api/users', methods=["GET"])
def users():
    return { 
        "users": [
            "test1", "test2", "test3"
            ] 
        }

@app.route('/get-destination-code', methods=["GET", "POST"])
def get_destination_code():
    iataCodes = []
    data = request.get_json()
    amadeus_token = get_amadeus_token()
    cities = [data.get('departureCity'), data.get('arrivalCity')]
    
    for city in cities:
        parameters = {
            "keyword" : city,
            "max" : "2",
            "include" : "AIRPORTS"
        }
        header = {
            "Authorization": f"Bearer {amadeus_token}"
        }
        response = requests.get(url=API_ENDPOINT, params=parameters, headers=header)
        try:
            iataCodes.append(response.json()["data"][0]['iataCode'])
        except IndexError:
            return jsonify({"message" : f"IndexError: No airport code found for {city}. (N/A)" , "success" : False})
        except KeyError:
            return jsonify({"message" : f"KeyError: No airport code found for {city}. (Not found)" , "success" : False})
    
    print(iataCodes)
    return jsonify({"success" : True, "iataCodes" : iataCodes})
    
@app.route("/search-flights", methods=["GET", "POST"])
def search_flights():
    amadeus_token = get_amadeus_token()
    print(amadeus_token)
    data = request.get_json()
    originCode = data.get("originCode")
    destinationCode = data.get("destinationCode")
    numPassengers = str(data.get("numPassengers"))
    nonStop = data.get("nonStop")

    nonStopString = ''
    if(nonStop):
        nonStopString = "true"
    else:
        nonStopString = "false"

    header = {
        "accept" : "application/vnd.amadeus+json",
        "Authorization": f"Bearer {amadeus_token}"
    }

    tripType = data.get("tripType")
    if tripType == "1":
        fromDate = data.get("fromDate")
        parameters = {
            "originLocationCode" : originCode,
            "destinationLocationCode" : destinationCode,
            "departureDate" : fromDate,
            "adults" : numPassengers,
            "nonStop" : nonStopString, 
            "currencyCode": "USD",
            "max": "3",
        }
    else:
        fromDate = data.get("fromDate")
        toDate = data.get("toDate")
        parameters = {
            "originLocationCode" : originCode,
            "destinationLocationCode" : destinationCode,
            "departureDate" : fromDate,
            "returnDate" : toDate,
            "adults" : numPassengers,
            "nonStop" : nonStopString, 
            "currencyCode": "USD",
            "max": "3",
        }

    response = requests.get(url=FLIGHT_OFFERS_ENDPOINT, params=parameters, headers=header)
    if response.status_code != 200:
        print(f"response code: {response.status_code}")
        return jsonify({"message": "An error has occurred", "success": False})
    
    data = response.json()

    if(data["meta"]["count"] == 0):
        return jsonify({"message" : "There are no flights avaliable", "success" : False})
    else:
        flights_dict = {}
        flights = data['data']
        for flight in flights:
            depature_flight_segments = flight["itineraries"][0]["segments"]
            depature_flight_segments_dict = {}
            depature_flight_number = 0
            for segment in depature_flight_segments:
                depature_flight_segments_dict[depature_flight_number] = {
                    "departureCode" : segment["departure"]["iataCode"],
                    "departureTime" : segment["departure"]["at"].split("T")[0] + " " + segment["departure"]["at"].split("T")[1],
                    "arrivalCode" : segment["arrival"]["iataCode"],
                    "arrivalTime" : segment["arrival"]["at"].split("T")[0] + " " + segment["arrival"]["at"].split("T")[1],
                    "flightDuration" : segment["duration"].split("PT")[1]
                }
                depature_flight_number += 1

            return_flight_segments = None if tripType == "1" else flight["itineraries"][1]["segments"]
            return_flight_segments_dict = {}
            return_flight_number = 0
            if return_flight_segments:
                for segment in return_flight_segments:
                    return_flight_segments_dict[return_flight_number] = {
                        "departure" : segment["departure"]["iataCode"],
                        "departureTime" : segment["departure"]["at"].split("T")[0] + " " + segment["departure"]["at"].split("T")[1],
                        "arrivalCode" : segment["arrival"]["iataCode"],
                        "arrivalTime" : segment["arrival"]["at"].split("T")[0] + " " + segment["arrival"]["at"].split("T")[1],
                        "flightDuration" : segment["duration"].split("PT")[1]
                    }
                    return_flight_number += 1

            flights_dict[int(flight["id"])] = {
                "source" : flight["source"],
                "flight-price" : "$" + flight["price"]["grandTotal"],
                "origin" : flight["itineraries"][0]["segments"][0]["departure"]["iataCode"],
                "destination" : flight["itineraries"][0]["segments"][len(depature_flight_segments)-1]["arrival"]["iataCode"],
                "out-date" : flight["itineraries"][0]["segments"][0]["departure"]["at"].split("T")[0],
                "return-date" : None if tripType == "1" else flight["itineraries"][1]["segments"][0]["departure"]["at"].split("T")[0],
                "total-departure-flight-duration" : flight["itineraries"][0]["duration"].split("PT")[1],
                "total-return-flight-duration" : None if tripType == "1" else flight["itineraries"][1]["duration"],
                "departure_flight_routes" : depature_flight_segments_dict,
                "return_flight_routes" : return_flight_segments_dict
            }
        
        print(flights_dict)
        return jsonify({"flightOffers" : flights_dict, "success" : True})
    
    
    

    

    
    
    

# Define a route that handles POST requests to the /submit-email endpoint
@app.route('/submit-email', methods=['POST'])
def submit_email():
    # This function is called when a POST request is made to /submit-email
    # Get the JSON data from the request body

    data = request.get_json()  # Get the JSON data from the request
    email = data.get('email')  # Extract the email field

    print(f"Received email: {email}") # Outputs the email to the console 
    return jsonify({"message": "Email received",}), 200 # Returns JSON response with a message and a status code of 200 (OK) to React

@app.route('/register', methods=["POST"])
def register():
    data = request.get_json()

    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    password_hashed = generate_password_hash(password, method='pbkdf2:sha256', salt_length=8)

    print(f"Received name: {name}") # Outputs the name to the console    
    print(f"Received email: {email}") # Outputs the email to the console 
    print(f"Received password: {password_hashed}") # Outputs the password to the console 

    result = db.session.execute(db.select(User).where(User.email == email))
    user = result.scalar()
    if user:
        return jsonify({"user" : None, "message": "User already exists. Log in instead! Redirecting...", 
                        "redirectLogin" : True, "isLogin" : False, "success" : False})

    new_user = User(email=email, name=name, password=password_hashed)
    db.session.add(new_user)
    db.session.commit()

    login_user(new_user)
    return jsonify({"user" : {"email": current_user.email, "name": current_user.name}, 
                    "message": "Succesful!", "redirectLogin" : False, "isLogin" : False, "success" : True}), 200

@app.route('/login', methods=["POST"])
def login():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    print(f"Received email: {email}") # Outputs the email to the console 
    print(f"Received email: {password}") # Outputs the password to the console

    result = db.session.execute(db.select(User).where(User.email == email))
    user = result.scalar()

    if not user:
        return jsonify({"user" : None, "message": "That email does not exist, please try again.", "isLogin" : True, "success" : False})
    elif not check_password_hash(user.password, password):
        return jsonify({"user" : None, "message": "Password incorrect, please try again.", "isLogin" : True, "success" : False})
    else:
        login_user(user)
        return jsonify({"user" : { "email": current_user.email, "name": current_user.name}, 
                        "message": "Success!", "isLogin" : True, "success" : True})
    
@app.route('/logout', methods=["POST"])
def logout():
    logout_user()
    return jsonify({"user" : None, "message": "Logged out successfully", "success": True})

@app.route('/current_user', methods=["GET"])
def get_current_user():
    # Ensure the user is logged in before accessing current_user
    if current_user.is_authenticated:
        return jsonify({"email": current_user.email, "name": current_user.name})
    else:
        return jsonify({"message": "User not authenticated"}), 401

if __name__ == "__main__":
    app.run(debug=True, port=5000)
