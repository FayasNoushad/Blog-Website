import os
from dotenv import load_dotenv

load_dotenv()


class Config:

    DB_URL = os.environ.get("DB_URL")
    DB_NAME = os.environ.get("DB_NAME", "blogs")
