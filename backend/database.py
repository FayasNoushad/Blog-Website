from pymongo import MongoClient
from config import Config


class Database:
    def __init__(self, url=Config.DB_URL, database_name=Config.DB_NAME):
        self.client = MongoClient(url)
        self.db = self.client[database_name]
        self.col = self.db["blogs"]
        self.cache = {}

    def get_blogs(self):
        blogs = list(self.col.find({}))
        return {"blogs": blogs}

    def add_blog(self, blog):
        inserted = self.col.insert_one(blog)
        blog["_id"] = inserted.inserted_id
        return blog


db = Database()
