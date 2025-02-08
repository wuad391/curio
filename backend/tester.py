from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import secrets

app = Flask(__name__)
app.secret_key = secrets.token_urlsafe(16)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///curio.db"
db = SQLAlchemy(app)
with app.app_context():
    db.create_all()
app.run(debug=True)
