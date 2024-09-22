from pymongo import MongoClient
from config import Config
from bson import ObjectId


class Database:
    def __init__(self, url=Config.DB_URL, database_name=Config.DB_NAME):
        self.client = MongoClient(url)
        self.db = self.client[database_name]
        self.col = self.db["blogs"]
        self.cache = {}

    def get_blogs(self):
        blogs = []
        for blog in self.col.find({}):
            blog["id"] = str(blog["_id"])
            del blog["_id"]
            blogs.append(blog)
        return {"blogs": blogs}

    def add_blog(self, blog):
        inserted = self.col.insert_one(blog)
        blog["id"] = inserted.inserted_id
        return blog

    def delete_blog(self, blog_id):
        self.col.delete_one({"_id": ObjectId(blog_id)})


db = Database()
