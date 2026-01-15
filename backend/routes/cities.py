from fastapi import APIRouter
from connection.dataset_connection import coll_restaurant, coll_hotel, coll_activity
import unicodedata

router = APIRouter()

@router.get("/")
def get_cities():
    def normalize(city_name: str) -> str:
        city_name = city_name.strip().lower()
        city_name = unicodedata.normalize("NFKD", city_name).encode("ASCII", "ignore").decode()
        if city_name == "dakha":
            city_name = "dakhla"
        return city_name

    # ⚡ Ultra rapide — Mongo fait le travail
    hotel_cities = coll_hotel.distinct("City")
    resto_cities = coll_restaurant.distinct("City")
    activity_cities = coll_activity.distinct("City")

    cities_raw = hotel_cities + resto_cities + activity_cities

    unique_cities = {}
    for c in cities_raw:
        if not isinstance(c, str):
            continue
        norm = normalize(c)
        if norm not in unique_cities:
            unique_cities[norm] = c.strip()

    CITY_DESCRIPTIONS = {
        "casablanca": "Grande métropole économique, moderne et dynamique.",
        "rabat": "Capitale administrative, calme et culturelle.",
        "marrakech": "Ville touristique célèbre pour sa médina et ses riads.",
        "fes": "Ville historique et spirituelle du Maroc.",
        "tanger": "Ville portuaire entre la Méditerranée et l’Atlantique.",
        "agadir": "Station balnéaire ensoleillée et moderne.",
        "essaouira": "Ville côtière artistique et paisible.",
        "dakhla": "Destination idéale pour le kitesurf et la nature.",
        "laayoune": "Ville du sud, porte du Sahara marocain.",
        "taghazout": "Village de surf, détente et océan."
    }

    city_list = [
        {
            "name": name,
            "slug": norm,
            "image": f"/images/{norm.capitalize()}.jpg",
            "description": CITY_DESCRIPTIONS.get(norm, "Destination populaire")
        }
        for norm, name in unique_cities.items()
    ]

    return city_list
