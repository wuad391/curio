from flask import (
    Flask,
    render_template,
    request,
    redirect,
    url_for,
    flash,
    session,
    jsonify,
)
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, TextAreaField, SelectField
from wtforms.validators import DataRequired
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import secrets
from sql_classes import app, db, User, Post, Comment
from scoring import *
from roles import UserRoles


class RegistrationForm(FlaskForm):
    username = StringField("Username", validators=[DataRequired()])
    password = PasswordField("Password", validators=[DataRequired()])
    role = SelectField(
        "Role",
        choices=[
            ("student", "Student"),
            ("instructor", "Instructor"),
            ("ta", "TA"),
            ("admin", "Admin"),
        ],
        validators=[DataRequired()],
    )
    submit = SubmitField("Register")


class LoginForm(FlaskForm):
    username = StringField("Username", validators=[DataRequired()])
    password = PasswordField("Password", validators=[DataRequired()])
    role = SelectField(
        "Role",
        choices=[
            ("student", "Student"),
            ("instructor", "Instructor"),
            ("ta", "TA"),
            ("admin", "Admin"),
        ],
        validators=[DataRequired()],
    )
    submit = SubmitField("Login")


class MessageForm(FlaskForm):
    message = TextAreaField("Message", validators=[DataRequired()])
    submit = SubmitField("Post")


class CommentForm(FlaskForm):
    comment = TextAreaField("Comment", validators=[DataRequired()])
    submit = SubmitField("Post Comment")


@app.route("/", methods=["GET", "POST"])
@app.route("/test", methods=["GET", "POST"])
def pull_usernames():
    return db.session.query(User).all()


@app.route("/login", methods=["GET", "POST"])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user and user.password == form.password.data and user.role == form.role.data:
            session["user"] = user.username
            session["role"] = user.role
            flash("Login successful!", "success")
            return jsonify(
                {
                    "redirect": redirect(url_for("message_board")),
                    "message": "Login successful!",
                    "status": "success",
                }
            )
        else:
            flash("Invalid username/password/role", "danger")
    return jsonify(
        {
            "message": "Invalid username/password/role",
            "status": "danger",
        }
    )


@app.route("/register", methods=["GET", "POST"])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        new_user = User(
            username=form.username.data,
            password=form.password.data,
            role=form.role.data,
        )
        db.session.add(new_user)
        db.session.commit()
        flash("Registration successful! Please log in.", "success")
        return jsonify(
            {
                "redirect": redirect(url_for("login")),
                "message": "Registration successful! Please log in.",
                "status": "success",
            }
        )
    return jsonify(
        {
            "message": "Registration failed. Please try again.",
            "status": "danger",
        }
    )


@app.route("/message_board", methods=["GET", "POST"])
def message_board():
    if "user" not in session:
        flash("Please log in first", "warning")
        return redirect(url_for("login"))

    form = MessageForm()
    if form.validate_on_submit():
        new_message = Post(
            username=session["user"],
            user_role=session["role"],
            content=form.message.data,
        )
        db.session.add(new_message)
        db.session.commit()
        return jsonify(
            {
                "message": "Comment posted successfully!",
                "form": form,
                "status": "success",
            }
        )

    messages = Post.query.all()
    return jsonify({"messages": messages, "form": form})


@app.route("/message/<int:message_id>", methods=["GET", "POST"])
def view_message(message_id):
    if "user" not in session:
        flash("Please log in first", "warning")
        return redirect(url_for("login"))
    message = Post.query.get_or_404(message_id)
    comment_form = CommentForm()

    if comment_form.validate_on_submit():
        new_comment = Comment(
            user=session["user"],
            user_role=session["role"],
            content=comment_form.comment.data,
            message_id=message.id,
        )
        db.session.add(new_comment)
        db.session.commit()
        return jsonify(
            {
                "message": "Comment posted successfully!",
                "comment_form": comment_form,
                "comments": message.comments,
                "status": "success",
            }
        )

    return jsonify(
        {
            "message": message,
            "comment_form": comment_form,
            "comments": message.comments,
        }
    )


@app.route("/rank_message/<int:message_id>", methods=["POST"])
def rank_message(message_id):
    if "user" not in session:
        flash("Please log in first", "warning")
        return jsonify
    message = Post.query.get_or_404(message_id)
    user = User.query.filter_by(username=session["user"]).first()
    with app.app_context():
        old_ranking = Ranking.query.filter_by(
            user_id=user.id,
            post_id=message.id,
        ).first()
        if old_ranking:
            db.session.delete(old_ranking)
            db.session.commit()
        new_ranking = Ranking(
            user_id=user.id,
            post_id=message.id,
            ranking=request.form["ranking"],
        )

        db.session.add(new_ranking)
        user.stars -= derived_comment_stars(message.id)
        message.rank = derived_comment_rank(message.id)
        user.stars += derived_comment_stars(message.id)
        db.session.commit()

    return jsonify(redirect(url_for("message_board")))


@app.route("/endorse_comment/<int:comment_id>", methods=["POST"])
def endorse_comment(comment_id):
    if "user" not in session or session["role"] != UserRoles.INSTRUCTOR:
        flash("Only instructors can endorse comments", "danger")
        return jsonify(
            {"message": "Only instructors can endorse comments", "status": "danger"}
        )

    comment = Comment.query.get_or_404(comment_id)
    if comment.instructor_endorsed:
        return jsonify({"message": "Comment already endorsed", "status": "info"})
    with app.app_context():
        user.stars -= derived_comment_stars(comment.id)
        comment.instructor_endorsed = True
        user = User.query.filter_by(username=comment.user).first()

        user.stars += derived_comment_stars(comment.id)
        db.session.commit()
        flash("Comment endorsed successfully!", "success")
    return jsonify(url_for("message_board"))


@app.route("/accept_comment/<int:comment_id>", methods=["POST"])
def accept_comment(comment_id):
    user = User.query.filter_by(username=session["user"]).first()
    comment = Comment.query.get_or_404(comment_id)
    poster = Post.query.get(comment.post_id).user
    if user.id != poster.id:
        return jsonify(
            {
                "message": "Only the poster can accept comments",
                "status": "danger",
            }
        )
    if comment.accepted:
        return jsonify(
            {
                "message": "Comment already accepted",
                "status": "info",
            }
        )
    with app.app_context():
        user.stars -= derived_comment_stars(comment.id)
        comment.accepted = True
        user.stars += derived_comment_stars(comment.id)
        db.session.commit()
    return jsonify(
        {
            "message": "Comment accepted successfully!",
            "status": "success",
        }
    )


@app.route("/get_top")
def get_top():
    with app.app_context():
        top_posts = Post.query.order_by(Post.visibility.desc()).all()
        posts_serialized = [post.__dict__ for post in top_posts]
        return jsonify(posts_serialized)


@app.route("/get_recent")
def get_recent():
    with app.app_context():
        recent_posts = Post.query.order_by(Post.timestamp.desc()).all()
        return jsonify(recent_posts)


@app.route("/logout")
def logout():
    session.pop("user", None)
    session.pop("role", None)
    flash("Logged out successfully!", "info")
    return jsonify(redirect(url_for("login")))


def main():
    with app.app_context():
        db.drop_all()
        db.create_all()
        user = User(id=0, username="user1", password="pw", role=UserRoles.STUDENT)
        post = Post(
            user_id=user.id, title="title", content="content", timestamp=datetime.now()
        )
        db.session.add(user)
        db.session.add(post)
        db.session.commit()
        print({post: post.__dict__ for post in db.session.query(Post).all()})
    print(get_top())
    app.run(debug=True)


if __name__ == "__main__":
    main()
