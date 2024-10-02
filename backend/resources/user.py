from datetime import datetime
from flask import Flask, request
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from database import db
from schemas import UserSchema, GetUserSchema, GetUserDetailsSchema
from passlib.hash import pbkdf2_sha256

blp = Blueprint("Users", __name__, description="Operations on Users")


@blp.route("/getuser/<string:username>")
class GetUserDetails(MethodView):
    @blp.response(200, GetUserDetailsSchema)
    def get(self, username):
        return db.get_user_details(username)


@blp.route("/getuser")
class GetUser(MethodView):
    @blp.response(200, UserSchema)
    @blp.arguments(GetUserSchema)
    def post(self, user_data):
        password = user_data.get("password")
        if not password:
            return {"error": "Invalid password"}
        data = {}
        if "email" in user_data and len(user_data["email"]) > 5:
            data["email"] = user_data["email"].lower()
        elif "username" in user_data and len(user_data["username"]) >= 5:
            data["username"] = user_data["username"].lower()
        response = db.get_user({"data": data, "password": password})
        if "error" in response:
            abort(401, response["error"])
        else:
            return response


@blp.route("/user")
class Users(MethodView):
    @blp.response(201, UserSchema)
    @blp.arguments(UserSchema)
    def post(self, user_data):
        username = user_data.get("username")
        email = user_data.get("email")
        first_name = user_data.get("first_name")
        last_name = user_data.get("last_name")
        password = user_data.get("password")
        if not (
            first_name
            and len(first_name) > 0
            and username
            and len(username) >= 5
            and email
            and password
            and len(password) > 5
        ):
            abort(500, "Required fields are not filled")
        return db.add_user(
            {
                "username": username.lower(),
                "email": email.lower(),
                "first_name": first_name,
                "last_name": last_name,
                "password": pbkdf2_sha256.hash(password),
                "created_at": str(datetime.today()),
            }
        )
