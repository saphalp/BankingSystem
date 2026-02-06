from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:5173"]
    }
})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    print(data)
    return jsonify({"success": True})

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    print(data)
    return jsonify({"success": True})


if __name__=="__main__":
    app.run(debug=True)