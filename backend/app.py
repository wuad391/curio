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
import secrets
from sql_classes import app, db, User, Post, Comment


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


# Ensure database tables are created before the first request
with app.app_context():
    db.create_all()


@app.route("/", methods=["GET", "POST"])
@app.route("/login", methods=["GET", "POST"])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user and user.password == form.password.data and user.role == form.role.data:
            session["user"] = user.username
            session["role"] = user.role
            flash("Login successful!", "success")
            return redirect(url_for("message_board"))
        else:
            flash("Invalid username/password/role", "danger")
    return render_template("login.html", form=form)


@app.route("/register", methods=["GET", "POST"])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        if form.role.data == "student":
            new_user = Student(username=form.username.data, password=form.password.data)
        else:
            new_user = Instructor(
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
        return redirect(url_for("message_board"))

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


@app.route("/logout")
def logout():
    session.pop("user", None)
    session.pop("role", None)
    flash("Logged out successfully!", "info")
    return jsonify(redirect(url_for("login")))


if __name__ == "__main__":
    app.run(debug=True)
