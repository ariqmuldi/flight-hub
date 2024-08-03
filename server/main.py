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

@app.route('/submit-email', methods=['POST'])
def submit_email():
    data = request.get_json()  # Get the JSON data from the request
    email = data.get('email')  # Extract the email field
    # You can now process the email (e.g., save it to a database)
    print(f"Received email: {email}")
    return jsonify({"message": "Email received",}), 200

if __name__ == "__main__":
    app.run(debug=True, port=5000)
