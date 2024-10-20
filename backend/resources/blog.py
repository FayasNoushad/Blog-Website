from datetime import datetime
from flask import Flask, request
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import jwt_required, get_jwt_identity
from database import db
from schemas import BlogSchema, BlogsSchema, BlogEditSchema, BlogDeleteSchema


blp = Blueprint("Blogs", __name__, description="Operations on Blogs")


@blp.route("/blogs")
class GetAllBlogs(MethodView):
    @blp.response(200, BlogsSchema)
    def get(self):
        """To get all blogs"""
        return db.get_all_blogs()


@blp.route("/blogs/<string:author_id>")
class GetBlogs(MethodView):
    @blp.response(200, BlogsSchema)
    def get(self, author_id):
        """To get blogs of an author"""
        return db.get_blogs(author_id)


@blp.route("/blog")
class Blogs(MethodView):
    @jwt_required()
    @blp.response(201, BlogSchema)
    @blp.arguments(BlogSchema)
    def post(self, blog_data):
        current_user_id = get_jwt_identity()
        if blog_data["author_id"] != current_user_id:
            abort(403, "You are not authorized to add blog on this account")
        blog_data["time"] = str(datetime.today())
        response = db.add_blog(blog_data)
        if "error" in response:
            abort(401, response["error"])
        return response

    @jwt_required()
    @blp.response(200, BlogEditSchema)
    @blp.arguments(BlogEditSchema)
    def put(self, blog_data):
        current_user_id = get_jwt_identity()
        if blog_data["author_id"] != current_user_id:
            abort(403, "You are not authorized to edit this blog")

        response = db.edit_blog(blog_data)
        if "error" in response:
            abort(401, response["error"])
        return response

    @jwt_required()
    @blp.arguments(BlogDeleteSchema)
    def delete(self, blog_data):
        current_user_id = get_jwt_identity()
        if blog_data["author_id"] != current_user_id:
            abort(403, "You are not authorized to delete this blog")
        response = db.delete_blog(blog_data)
        if "error" in response:
            abort(403, response["error"])
        response = {"message": "blog deleted"}
        if "error" in response:
            abort(401, response["error"])
        return response
