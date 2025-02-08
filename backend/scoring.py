from roles import UserRoles
from sql_classes import User, Post, Comment, db
from sqlalchemy.orm import validates
from datetime import datetime

MAX_STARS = 100


class Ranking(db.Model):
    # Ranking is for a post OR comment
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("post.id"), nullable=True)
    comment_id = db.Column(db.Integer, db.ForeignKey("comment.id"), nullable=True)
    ranking = db.Column(db.Integer, nullable=False)

    @validates("ranking")
    def validate_ranking(self, key, ranking):
        if ranking not in [-1, 0, 1, 2, 3]:
            raise ValueError("Invalid ranking")
        return ranking


class StarHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)
    stars = db.Column(db.Integer, nullable=False)


def add_to_history(user_id):
    new_entry = StarHistory(
        user_id=user_id, stars=User.query.get(user_id).stars, timestamp=datetime.now()
    )
    db.session.add(new_entry)
    db.session.commit()


def derived_post_rank(post_id):
    rankings = [
        ranking.star for ranking in Ranking.query.filter_by(post_id=post_id).all()
    ]
    return sum(rankings) / len(rankings)


def derived_post_stars(post_id):
    post = Post.query.get(post_id)
    if post.pinned:
        return 4
    else:
        return max(0, post.rank)


def post_visibility(post):
    if post.pinned:
        if User.query == UserRoles.INSTRUCTOR:
            return 4
        else:
            return 3
    else:
        return post.score


def derived_comment_rank(comment_id):
    rankings = [
        ranking.star for ranking in Ranking.query.filter_by(comment_id=comment_id).all()
    ]
    return sum(rankings) / len(rankings)


def derived_comment_stars(comment):
    if comment.endorsed:
        return 4
    if comment.accepted:
        return 3
    else:
        return max(0, comment.rank)
