import os 
from serpapi import GoogleSearch

def get_author_profile_by_name(author_name):
  params = {
    "engine": "google_scholar_profiles",
    "mauthors": author_name,
    "api_key": os.environ.get('SERP_API_KEY')
  }

  search = GoogleSearch(params)
  results = search.get_dict()
  profiles = results["profiles"]

  return profiles

def get_publications_by_author(author_id):
  params = {
    "engine": "google_scholar_author",
    "author_id": author_id,
    "api_key": os.environ.get('SERP_API_KEY')
  }
  
  search = GoogleSearch(params)
  results = search.get_dict()
  # author = results["author"]
  # articles = results["articles"]

  return results
