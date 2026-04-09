from flask import Flask
from flask_cors import CORS
from app.routes.contact import contact_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(contact_bp)

@app.route("/")
def home():
    return "Backend is running 🚀"

if __name__ == "__main__":
    app.run(debug=True)