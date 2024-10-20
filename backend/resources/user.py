from datetime import datetime
from flask import Flask, request, jsonify
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import (
    create_access_token,
    get_jwt,
    get_jwt_identity,
    unset_jwt_cookies,
    jwt_required,
    JWTManager,
)

from database import db
from bson import ObjectId
from schemas import UserSchema, LoginSchema, GetUserSchema
from passlib.hash import pbkdf2_sha256

blp = Blueprint("Users", __name__, description="Operations on Users")


@blp.route("/getuser/<string:username>")
class GetUserDetails(MethodView):
    @blp.response(200, GetUserSchema)
    def get(self, username):
        return db.get_user_details({"username": username})


@blp.route("/getuserwithid/<string:id>")
class GetUserDetailsWithID(MethodView):
    @blp.response(200, GetUserSchema)
    def get(self, id):
        return db.get_user_details({"_id": ObjectId(id)})


@blp.route("/login")
class Login(MethodView):
    @blp.response(200, UserSchema)
    @blp.arguments(LoginSchema)
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
            return jsonify(response)


@blp.route("/register")
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
        return jsonify(
            db.add_user(
                {
                    "username": username.lower(),
                    "email": email.lower(),
                    "first_name": first_name,
                    "last_name": last_name,
                    "password": pbkdf2_sha256.hash(password),
                    "created_at": str(datetime.today()),
                }
            )
        )
