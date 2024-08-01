from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins="*")

@app.route('/api/users', methods=["GET"])
def users():
    return { 
        "users": [
            "test1", "test2", "test3"
            ] 
        }

if __name__ == "__main__":
    app.run(debug=True, port=5000)
