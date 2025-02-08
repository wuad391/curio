from app import db


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(150), nullable=False)
    user_role = db.Column(db.String(50), nullable=False)
    content = db.Column(db.Text, nullable=False)
    score = db.Column(db.Integer, default=0)
    comments = db.relationship("Comment", backref="post", lazy=True)


def derived_post_score(post):
    return post.score * 2
