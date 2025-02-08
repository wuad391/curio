from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import secrets
from roles import UserRoles
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.secret_key = secrets.token_urlsafe(16)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///curio.db"
db = SQLAlchemy(app)


# SQL Tables/Models:


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    role = db.Column(db.Enum(UserRoles), nullable=False)

    def serialize(self):
        return {"username": self.username, "role": self.role}


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    content = db.Column(db.Text, nullable=False)
    comments = db.relationship("Comment", backref="post", lazy=True)
    title = db.Column(db.String(150), nullable=False)
    pinned = db.Column(db.Boolean, default=False)
    instructor_endorsed = db.Column(db.Boolean, default=False)
    rank = db.Column(db.Float, default=0)
    visibility = db.Column(db.Float, default=0)
    timestamp = db.Column(db.DateTime, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "content": self.content,
            "comments": [comment.serialize() for comment in self.comments],
            "title": self.title,
            "pinned": self.pinned,
            "instructor_endorsed": self.instructor_endorsed,
            "rank": self.rank,
            "visibility": self.visibility,
            "timestamp": str(self.timestamp),
        }


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    content = db.Column(db.Text, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("post.id"), nullable=False)
    instructor_endorsed = db.Column(db.Boolean, default=False)
    accepted = db.Column(db.Boolean, default=False)
    rank = db.Column(db.Float, default=0)
    visibility = db.Column(db.Float, default=0)
    timestamp = db.Column(db.DateTime, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "content": self.content,
            "post_id": self.post_id,
            "instructor_endorsed": self.instructor_endorsed,
            "accepted": self.accepted,
            "rank": self.rank,
            "visibility": self.visibility,
            "timestamp": str(self.timestamp),
        }


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
