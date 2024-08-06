from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_login import UserMixin, login_user, LoginManager, current_user, logout_user
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship, DeclarativeBase, Mapped, mapped_column
from sqlalchemy import Integer, String, Text
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
cors = CORS(app, origins="*")

login_manager = LoginManager()
login_manager.init_app(app)

class Base(DeclarativeBase):
    pass
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///users.db"
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

@app.route('/api/users', methods=["GET"])
def users():
    return { 
        "users": [
            "test1", "test2", "test3"
            ] 
        }

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

    print(f"Received email: {name}") # Outputs the name to the console    
    print(f"Received email: {email}") # Outputs the email to the console 
    print(f"Received email: {password_hashed}") # Outputs the password to the console 

    result = db.session.execute(db.select(User).where(User.email == email))
    user = result.scalar()
    if user:
        return jsonify({"message": "User already exists. Log in instead! Redirecting...", "redirectLogin" : True})

    new_user = User(email=email, name=name, password=password_hashed)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Succesful!", "redirectLogin" : False}), 200

if __name__ == "__main__":
    app.run(debug=True, port=5000)
