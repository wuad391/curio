from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import secrets
from sql_classes import *
from roles import UserRoles
from scoring import (
    Ranking,
    StarHistory,
    add_to_history,
    derived_post_score,
    derived_post_stars,
    post_visibility,
    derived_comment_score,
)

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
    post1 = Post(user_id=user1.id, content="post1 content")
    post2 = Post(user_id=user2.id, content="post2 content")
    db.session.add(post1)
    db.session.add(post2)
    db.session.commit()
    comment1 = Comment(user_id=user1.id, content="comment1 content", post_id=post2.id)
    comment2 = Comment(user_id=user2.id, content="comment2 content", post_id=post1.id)
    instructor1 = User(
        username="instructor1", password="password", role=UserRoles.INSTRUCTOR
    )
