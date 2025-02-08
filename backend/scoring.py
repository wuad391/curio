from roles import UserRoles


def derived_post_score(post):
    return sum(post.rankings) / len(post.rankings)


def derived_post_stars(post):
    if post.instructor_endorsed:
        return 4
    else:
        return max(0, post.score)


def post_visibility(post):
    if post.pinned:
        if post.user.role == UserRoles.INSTRUCTOR:
            return 4
        else:
            return 3
    else:
        return post.score


def derived_comment_score(comment):
    return sum(comment.rankings) / len(comment.rankings)


def derived_comment_stars(comment):
    if comment.instructor_endorsed:
        return 4
    if comment.accepted:
        return 3
    else:
        return max(0, comment.score)
