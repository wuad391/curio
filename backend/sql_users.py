from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Table
import secrets
from sql_classes import app, db
from scoring import MAX_STARS


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


InstructorClassAssociation_table = Table(
    "instructor_class_association",
    db.Base.metadata,
    db.Column("instructor_id", db.Integer, db.ForeignKey("Instructor.id")),
    db.Column("class_id", db.Integer, db.ForeignKey("class.id")),
)

StudentClassAssociation_table = Table(
    "student_class_association",
    db.Base.metadata,
    db.Column("student_id", db.Integer, db.ForeignKey("Student.id")),
    db.Column("class_id", db.Integer, db.ForeignKey("class.id")),
)

PostClassAssociation_table = Table(
    "post_class_association",
    db.Base.metadata,
    db.Column("post_id", db.Integer, db.ForeignKey("post.id")),
    db.Column("class_id", db.Integer, db.ForeignKey("class.id")),
)


class Class(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    instructors = db.relationship("Instructor", backref="class", lazy=True)
    students = db.relationship("Student", backref="class", lazy=True)
    posts = db.relationship("Posts", backref="post", lazy=True)
