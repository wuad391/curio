import enum


class UserRoles(enum.Enum):
    ADMIN = "admin"
    INSTRUCTOR = "instructor"
    STUDENT = "student"
    TA = "ta"
