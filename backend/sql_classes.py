from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import secrets


app = Flask(__name__)

app.secret_key = secrets.token_urlsafe(16)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///messages.db"
db = SQLAlchemy(app)

MAX_STARS = 100

# SQL Tables/Models:

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    stars = db.Column(db.Integer, default=0, max=MAX_STARS)


class Instructor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    role = db.Column(db.String(50), nullable=False)


class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), nullable=False)
    user_role = db.Column(db.String(50), nullable=False)
    content = db.Column(db.Text, nullable=False)
    comments = db.relationship("Comment", backref="message", lazy=True)


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(150), nullable=False)
    user_role = db.Column(db.String(50), nullable=False)
    content = db.Column(db.Text, nullable=False)
    message_id = db.Column(db.Integer, db.ForeignKey("message.id"), nullable=False)