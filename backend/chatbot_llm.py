import os
import json
import unicodedata
from dotenv import load_dotenv, find_dotenv
from openai import OpenAI

from backend.connection.dataset_connection import (
    coll_hotel,
    coll_restaurant,
    coll_activity
)
from backend.logic import planner

# -------------------------------------------------
# ENV
# -------------------------------------------------
load_dotenv(find_dotenv())
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

# -------------------------------------------------
# SYSTEM PROMPTS
# -------------------------------------------------
PLAN_SYSTEM_PROMPT = """
You are a travel assistant.

STRICT RULES:
- The travel plan is ALREADY GENERATED
- You MUST NOT modify it
- You MUST NOT add/remove cities, hotels, restaurants, or activities
- You MUST NOT recalculate budget, days, or nights

If the user asks to modify the plan:
Reply ONLY:
"Please return to the form to modify your travel preferences."
"""

DB_SYSTEM_PROMPT = """
You are a travel assistant.

You may suggest hotels, restaurants, or activities
ONLY from the database.

These are OPTIONAL suggestions.
They DO NOT modify the existing plan.
"""

# -------------------------------------------------
# HELPERS
# -------------------------------------------------
def normalize(text: str) -> str:
    if not text:
        return ""
    return unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("ascii").lower()

def json_safe(obj) -> str:
    return json.dumps(obj, indent=2, ensure_ascii=False, default=str)

# -------------------------------------------------
# AUTOMATIC CITY DETECTION
# -------------------------------------------------
def get_all_cities():
    hotel_cities = coll_hotel.distinct("City")
    restaurant_cities = coll_restaurant.distinct("City")
    activity_cities = coll_activity.distinct("City")
    all_cities = set()
    for c in hotel_cities + restaurant_cities + activity_cities:
        if c:
            all_cities.add(c.strip().lower())
    return all_cities

ALL_CITIES = get_all_cities()

def extract_city_from_message(message: str):
    message_norm = normalize(message)
    for city in ALL_CITIES:
        if city in message_norm:
            return city.capitalize()
    return None

# -------------------------------------------------
# DATABASE SEARCH
# -------------------------------------------------
def search_database(message: str):
    msg = normalize(message)
    city = extract_city_from_message(message)

    query = {}
    if city:
        query["City"] = {"$regex": f"^{city}$", "$options": "i"}

    if "hotel" in msg:
        data = list(coll_hotel.find(query).sort("Rating", -1).limit(5))
        return "Hotels", data
    if "restaurant" in msg:
        data = list(coll_restaurant.find(query).limit(5))
        return "Restaurants", data
    if "activity" in msg or "activities" in msg:
        data = list(coll_activity.find(query).limit(5))
        return "Activities", data

    return None, []

# -------------------------------------------------
# CHAT FUNCTION WITH AUTO-PLAN
# -------------------------------------------------
class TravelChatbot:
    def __init__(self):
        self.trip_plan = None
        self.user_form = None  # store the last user form for generating plan

    def set_user_form(self, form_data: dict):
        """Store user form data for trip generation"""
        self.user_form = form_data
        # Automatically build trip plan
        self.trip_plan = planner.build_trip_plan(planner.parse_user_input(form_data))

    def chat(self, message: str) -> str:
        msg = normalize(message)

        # -------- BLOCK ONLY REAL MODIFICATIONS ----------
        if any(k in msg for k in ["change", "modify", "update", "remove", "replace"]):
            return "Please return to the form to modify your travel preferences."

        # -------- SHOW PLAN ON DEMAND ----------
        if any(k in msg for k in ["show my plan", "my trip", "trip plan", "give me a plan", "planning"]):
            if self.trip_plan is None:
                if self.user_form is None:
                    return "Please provide your travel preferences form first to generate a plan."
                self.trip_plan = planner.build_trip_plan(planner.parse_user_input(self.user_form))
            return json_safe(self.trip_plan)

        # -------- DB SUGGESTIONS ----------
        if any(k in msg for k in ["hotel", "restaurant", "activity", "activities"]):
            title, data = search_database(message)
            if not data:
                return "Sorry, no data found in the database for this city."

            messages = [
                {"role": "system", "content": DB_SYSTEM_PROMPT},
                {"role": "system", "content": f"{title} from database:\n{json_safe(data)}"},
                {"role": "user", "content": message}
            ]
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=messages,
                temperature=0.6
            )
            return response.choices[0].message.content

        # -------- PLAN EXPLANATION ----------
        if self.trip_plan:
            messages = [
                {"role": "system", "content": PLAN_SYSTEM_PROMPT},
                {"role": "system", "content": f"Current travel plan:\n{json_safe(self.trip_plan)}"},
                {"role": "user", "content": message}
            ]
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=messages,
                temperature=0.6
            )
            return response.choices[0].message.content

        # -------- NO PLAN, NO DB REQUEST ----------
        return "Please generate a travel plan first by providing your travel preferences."

