from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
cors = CORS(app, origins="*")

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

if __name__ == "__main__":
    app.run(debug=True, port=5000)
