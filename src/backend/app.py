from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "../../.env"))

app = Flask(__name__)
CORS(app)

client = MongoClient(os.getenv('MONGODB_URL'))
db = client['DB_NAME']
collection = db['SmallCap']

@app.route('/api/data', methods=['GET'])
def get_data():
    data = collection.find_one({})
    if data:
        return jsonify({"message": data.get("message")})
    else:
        return jsonify({"message": "No data found"})

@app.route('/api/data', methods=['POST'])
def add_data():
    data = request.json
    collection.insert_one(data)
    return jsonify({"message": "Data added successfully"})

if __name__ == '__main__':
    app.run(debug=True)
