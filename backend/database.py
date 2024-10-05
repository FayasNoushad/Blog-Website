from pymongo import MongoClient
from config import Config
from bson import ObjectId
from collections import deque
from passlib.hash import pbkdf2_sha256


class Database:
    def __init__(self, url=Config.DB_URL, database_name=Config.DB_NAME):
        self.client = MongoClient(url)
        self.db = self.client[database_name]
        self.users = self.db["users"]
        self.blogs = self.db["blogs"]
        self.cache = {}

    def add_user(self, user):
        inserted = self.users.insert_one(user)
        user["id"] = inserted.inserted_id
        del user["password"]
        return user

    def get_user_details(self, data):
        user = self.users.find_one(data)
        if not user:
            return {"error": "user not found"}
        return {
            "first_name": user["first_name"],
            "last_name": user["last_name"],
            "id": str(user["_id"]),
            "username": user["username"],
        }

    def get_user(self, user_data):
        password = user_data.get("password")
        user = self.users.find_one(user_data["data"])
        if user is None:
            return {"error": "user not found"}
        if not pbkdf2_sha256.verify(password, user["password"]):
            return {"error": "password not match"}
        user["id"] = str(user["_id"])
        del user["_id"]
        del user["password"]
        return user

    def get_all_blogs(self):
        blogs = deque()
        for blog in self.blogs.find({}):
            blog["id"] = str(blog["_id"])
            del blog["_id"]
            blogs.appendleft(blog)
        return {"blogs": blogs}

    def get_blogs(self, author_id):
        blogs = deque()
        for blog in self.blogs.find({"author_id": author_id}):
            blog["id"] = str(blog["_id"])
            del blog["_id"]
            blogs.appendleft(blog)
        return {"blogs": blogs}

    def get_blog(self, blog_id):
        blog = self.blogs.find_one({"_id": ObjectId(blog_id)})
        blog["id"] = str(blog["_id"])
        del blog["_id"]
        return blog

    def add_blog(self, blog_data):
        response = self.get_user(
            {
                "data": {"_id": ObjectId(blog_data["author_id"])},
                "password": blog_data["password"],
            }
        )
        if "error" in response:
            return response
        inserted = self.blogs.insert_one(blog_data)
        blog_data["id"] = inserted.inserted_id
        del blog_data["password"]
        return blog_data

    def edit_blog(self, blog_data):
        response = self.get_user(
            {
                "data": {"_id": ObjectId(blog_data["author_id"])},
                "password": blog_data["password"],
            }
        )
        if "error" in response:
            return response
        self.blogs.update_one(
            {"_id": ObjectId(blog_data["id"])},
            {
                "$set": {
                    "title": blog_data["title"],
                    "content": blog_data["content"],
                }
            },
        )
        return self.get_blog(blog_data["id"])

    def delete_blog(self, blog_data):
        response = self.get_user(
            {
                "data": {"_id": ObjectId(blog_data["author_id"])},
                "password": blog_data["password"],
            }
        )
        if "error" in response:
            return response
        self.blogs.delete_one({"_id": ObjectId(blog_data["id"])})
        return {}


db = Database()
