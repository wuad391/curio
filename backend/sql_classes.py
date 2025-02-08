from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import secrets

app = Flask(__name__)
app.secret_key = secrets.token_urlsafe(16)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///curio.db"
db = SQLAlchemy(app)


# SQL Tables/Models:


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    role = db.Column(db.String(50), nullable=False)


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), nullable=False)
    user_role = db.Column(db.String(50), nullable=False)
    content = db.Column(db.Text, nullable=False)
    comments = db.relationship("Comment", backref="post", lazy=True)


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(150), nullable=False)
    user_role = db.Column(db.String(50), nullable=False)
    content = db.Column(db.Text, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("post.id"), nullable=False)
    instructor_endorsed = db.Column(db.Boolean, default=False)
    accepted = db.Column(db.Boolean, default=False)


# InstructorClassAssociation_table = db.Table(
#     "instructor_class_association",
#     db.Base.metadata,
#     db.Column("instructor_id", db.Integer, db.ForeignKey("Instructor.id")),
#     db.Column("class_id", db.Integer, db.ForeignKey("class.id")),
# )

# StudentClassAssociation_table = db.Table(
#     "student_class_association",
#     db.Base.metadata,
#     db.Column("student_id", db.Integer, db.ForeignKey("Student.id")),
#     db.Column("class_id", db.Integer, db.ForeignKey("class.id")),
# )

# PostClassAssociation_table = db.Table(
#     "post_class_association",
#     db.Base.metadata,
#     db.Column("post_id", db.Integer, db.ForeignKey("post.id")),
#     db.Column("class_id", db.Integer, db.ForeignKey("class.id")),
# )
