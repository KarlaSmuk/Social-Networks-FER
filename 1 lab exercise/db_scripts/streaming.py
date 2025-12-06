import requests
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import time

load_dotenv()

RAPIDAPI_KEY = os.getenv("RAPIDAPI_KEY")
MONGO_URI = os.getenv("MONGO_URI")

mongo_client = MongoClient(MONGO_URI)
db = mongo_client["public"]
movies_collection = db["movies"]   # collection with OMDb movies
streaming_collection = db["streaming"]  # new collection for streaming info

HEADERS = {
    "X-RapidAPI-Key": RAPIDAPI_KEY
}

def fetch_streaming_by_imdb(imdb_id):
    url = f"https://streaming-availability.p.rapidapi.com/shows/{imdb_id}"
    params = {
        "country": "hr"
    }

    response = requests.get(url, headers=HEADERS, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error fetching {imdb_id}: {response.status_code}")
        return None


def update_streaming_options():
    movies = movies_collection.find({})
    for movie in movies:
        imdb_id = movie.get("imdbID")
        if not imdb_id:
            continue

        print(f"Fetching streaming platforms for {movie.get('Title')} ({imdb_id})")
        streaming_data = fetch_streaming_by_imdb(imdb_id)

        if streaming_data and streaming_data.get("streamingOptions"):
            print(f"streaming for hr found")
            record = {
                "imdbID": imdb_id,
                "streaming": streaming_data.get("streamingOptions")
            }
            streaming_collection.update_one(
                {"imdbID": imdb_id},
                {"$set": record},
                upsert=True
            )

if __name__ == "__main__":
    update_streaming_options()
    print("Done fetching streaming platforms!")
