from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Table
import secrets

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

InstructorClassAssociation_table = Table("instructor_class_association", 
    Base.metadata,
    Column('instructor_id', Integer, ForeignKey("Instructor.id")),
    Column('class_id', Integer, ForeignKey('class.id'))
)

StudentClassAssociation_table = Table("student_class_association", 
    Base.metadata,
    Column('student_id', Integer, ForeignKey("Student.id")),
    Column('class_id', Integer, ForeignKey('class.id'))
)

PostClassAssociation_table = Table("post_class_association",
    Base.metadata,
    Column('post_id', Integer, ForeignKey("post.id")),
    Column('class_id', Integer, ForeignKey('class.id'))
)

class Class(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    instructors = db.relationship("Instructor", backref="class", lazy=True)
    students = db.relationship("Student", backref="class", lazy=True)
    posts = db.relationship("Posts", backref="post", lazy=True)

