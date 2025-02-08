from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import secrets
from sql_classes import *
from roles import UserRoles
from datetime import datetime

# REMOVES OLD DATABASE
# create example users, posts, and comments
with app.app_context():
    db.drop_all()
    db.create_all()
    user1 = User(username="user1", password="password", role=UserRoles.STUDENT)
    user2 = User(username="user2", password="password", role=UserRoles.STUDENT)
    db.session.add(user1)
    db.session.add(user2)
    db.session.commit()
    post1 = Post(
        user_id=user1.id,
        content="post1 content",
        title="post1 title",
        timestamp=datetime.now(),
    )
    post2 = Post(
        user_id=user2.id,
        content="post2 content",
        title="post2 title",
        timestamp=datetime.now(),
    )
    db.session.add(post1)
    db.session.add(post2)
    db.session.commit()
    comment1 = Comment(
        user_id=user1.id,
        content="comment1 content",
        post_id=post2.id,
        timestamp=datetime.now(),
    )
    comment2 = Comment(
        user_id=user2.id,
        content="comment2 content",
        post_id=post1.id,
        timestamp=datetime.now(),
    )
    instructor1 = User(
        username="instructor1", password="password", role=UserRoles.INSTRUCTOR
    )
    # Add the instructor to the database
    db.session.add(instructor1)
    db.session.add(comment1)
    db.session.add(comment2)
    db.session.commit()

    # Retrieve an existing comment (example: updating comment1)
    comment_to_update = Comment.query.filter_by(id=comment1.id).first()
    if comment_to_update:
        comment_to_update.endorsed = True
        db.session.commit()
    print(db.session.query(Comment).all())
