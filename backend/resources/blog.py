from datetime import datetime
from flask import Flask, request
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from database import db
from schemas import BlogSchema, BlogsSchema, BlogEditSchema, BlogDeleteSchema

blp = Blueprint("Blogs", __name__, description="Operations on Blogs")


@blp.route("/blogs/<string:author_id>")
class GetBlogs(MethodView):
    @blp.response(200, BlogsSchema)
    def get(self, author_id):
        return db.get_blogs(author_id)


@blp.route("/blog")
class Blogs(MethodView):
    @blp.response(201, BlogSchema)
    @blp.arguments(BlogSchema)
    def post(self, blog_data):
        blog_data["time"] = str(datetime.today())
        response = db.add_blog(blog_data)
        if "error" in response:
            abort(401, response["error"])
        return response

    @blp.response(200, BlogEditSchema)
    @blp.arguments(BlogEditSchema)
    def put(self, blog_data):
        response = db.edit_blog(blog_data)
        if "error" in response:
            abort(401, response["error"])
        return response

    @blp.arguments(BlogDeleteSchema)
    def delete(self, blog_data):
        response = db.delete_blog(blog_data)
        if "error" in response:
            abort(403, response["error"])
        response = {"message": "blog deleted"}
        if "error" in response:
            abort(401, response["error"])
        return response
