from datetime import datetime
from flask import Flask, request
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from database import db
from schemas import BlogSchema, BlogsSchema

blp = Blueprint("Blogs", __name__, description="Operations on Blogs")


@blp.route("/blogs")
class Blogs(MethodView):
    @blp.response(200, BlogsSchema)
    def get(self):
        return db.get_blogs()

    @blp.response(201, BlogSchema)
    @blp.arguments(BlogSchema)
    def post(self, blog_data):
        if not (blog_data.get("title") and blog_data.get("content")):
            abort(500, "title and content required")
        blog_data["time"] = str(datetime.today())
        return db.add_blog(blog_data)
