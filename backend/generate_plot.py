import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
from typing import List
import calmap
from io import StringIO, BytesIO
import base64
from flask import render_template, jsonify, send_file
from sql_classes import db, Post, app, Users

IMAGE_FORMAT = "png"


def plot_to_template(plot, name: str = "plot.html"):
    img = StringIO()
    plot.savefig(img, IMAGE_FORMAT)
    plot.close()
    img.seek(0)
    plot_url = base64.b64encode(img.getvalue())
    return render_template(name, plot_url=plot_url)


def plot_to_filelike(plot):
    img = BytesIO()
    plot.savefig(img, IMAGE_FORMAT)
    img.seek(0)
    return img


def plot_user_activity_calmap(user, posts: pd.DataFrame, comments: pd.DataFrame):
    plot = plt.subplots(nrows=4)
    posts_dates = pd.Series(
        np.ones(len(posts["created_at"])), index=posts["created_at"]
    )
    plot[0] = calmap.yearplot(posts_dates)
    comments_dates = pd.Series(
        np.ones(len(comments["created_at"])), index=comments["created_at"]
    )
    plot[1] = calmap.yearplot(comments_dates)
    answers_dates = pd.Series(
        np.ones(len(comments[comments["type"] == "answer"]["created_at"])),
        index=comments[comments["type"] == "answer"]["created_at"],
    )
    plot[2] = calmap.yearplot(answers_dates)
    answers_weighted = pd.Series(
        posts[posts["type"] == "answer"]["score"],
        index=posts[posts["type"] == "answer"]["created_at"],
    )
    plot[3] = calmap.yearplot(answers_weighted["created_at"])
    return plot_to_filelike(plot)


if __name__ == "__main__":

    all_days = pd.date_range("1/15/2014", "1/22/2014", freq="D")
    days = np.random.choice(all_days, 5)
    events = pd.Series(np.random.randn(len(days)), index=days)
    calmap.calendarplot(
        events,
        monthticks=3,
        daylabels="MTWTFSS",
        dayticks=[0, 2, 4, 6],
        cmap="YlGn",
        fillcolor="grey",
        linewidth=0,
        fig_kws=dict(figsize=(8, 4)),
    )
    print(events)
    plt.show()
