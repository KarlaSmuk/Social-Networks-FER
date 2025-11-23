import requests
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

RAPIDAPI_KEY = os.getenv("RAPIDAPI_KEY")
MONGO_URI = os.getenv("MONGO_URI")

mongo_client = MongoClient(MONGO_URI)
db = mongo_client["public"]
genres_collection = db["genres"]

def fetch_genres():
    url = "https://streaming-availability.p.rapidapi.com/genres"
    header = {
        "X-RapidAPI-Key": RAPIDAPI_KEY
    }
    response = requests.get(url, headers=header)
    return response.json()


def save_genres(genres_data):
    for genre in genres_data:
        genres_collection.update_one(
            {"id": genre["id"]},
            {"$set": genre},
            upsert=True
        )


if __name__ == "__main__":
    genres_data = fetch_genres()
    save_genres(genres_data)
    print(f"Saved {len(genres_data)} genres to MongoDB.")
