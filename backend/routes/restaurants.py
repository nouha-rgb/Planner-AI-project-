from fastapi import APIRouter
from connection.dataset_connection import coll_restaurant

router = APIRouter()

@router.get("/")
def get_restaurants(city: str | None = None):
    query = {}
    if city:
        query["City"] = city

    restos = list(coll_restaurant.find(query, {"_id": 0}))
    return restos
