import requests
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

TMDB_API_KEY = os.getenv("TMDB_API_KEY")
OMDB_API_KEY = os.getenv("OMDB_API_KEY")
MONGO_URI = os.getenv("MONGO_URI")

mongo_client = MongoClient(MONGO_URI)
db = mongo_client["public"]
collection = db["movies"]

def fetch_tmdb_page(page):
    url = f"https://api.themoviedb.org/3/movie/popular?api_key={TMDB_API_KEY}&language=en-US&page={page}"
    response = requests.get(url)
    return response.json()

def fetch_imdb_id(tmdb_id):
    url = f"https://api.themoviedb.org/3/movie/{tmdb_id}/external_ids?api_key={TMDB_API_KEY}"
    response = requests.get(url)
    data = response.json()
    return data["imdb_id"]

def fetch_omdb(imdb_id):
    params = {
        "i": imdb_id,
        "apikey": OMDB_API_KEY
    }

    response = requests.get("http://www.omdbapi.com/", params=params)
    data = response.json()

    if data.get("Response") == "False":
        print(f"Error for IMDb ID {imdb_id}: {data.get('Error')}")
        return None

    return data

def save_movie(movie):
    collection.update_one(
        {"tmdb_id": movie["tmdb_id"]},
        {"$set": movie},
        upsert=True
    )

def import_all_movies():
    # first_page = fetch_tmdb_page(1)
    total_pages = 5 # first_page.get("total_pages", 1)

    print(f"Total TMDB pages: {total_pages}")

    for page in range(1, total_pages + 1):
        print(f"Fetching TMDB page {page}/{total_pages}")

        data = fetch_tmdb_page(page)
        for m in data.get("results", []):
            tmdb_id = m["id"]
            imdb_id = fetch_imdb_id(tmdb_id)
            print(f"  Fetching OMDb: {m.get("title")} ({imdb_id})")

            omdb = fetch_omdb(imdb_id)
            if omdb is None:
                print(f"Movie with TMDB ID {tmdb_id} skipped")
                continue
            omdb["tmdb_id"] = tmdb_id
            save_movie(omdb)

    print("Finished importing!")

if __name__ == "__main__":
    import_all_movies()
