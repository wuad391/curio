from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import secrets


app = Flask(__name__)

app.secret_key = secrets.token_urlsafe(16)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///messages.db"
db = SQLAlchemy(app)


# SQL Tables/Models:

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    points = db.Column(db.Integer, default=0)


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), nullable=False)
    user_role = db.Column(db.String(50), nullable=False)
    # title = db.Column(db.String(150), nullable=False)
    content = db.Column(db.Text, nullable=False)
    comments = db.relationship("Comment", backref="message", lazy=True)
    endorsed = db.Column(db.Boolean, default=False)
    score = db.Column(db.Integer, default=0)


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(150), nullable=False)
    user_role = db.Column(db.String(50), nullable=False)
    content = db.Column(db.Text, nullable=False)
    message_id = db.Column(db.Integer, db.ForeignKey("post.id"), nullable=False)
    comment_id = db.Column(db.Integer, db.ForeignKey("comment.id"), nullable=True)
    subcomments = db.relationship("Comment", backref="parent", remote_side=[id])