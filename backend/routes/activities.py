from fastapi import APIRouter
from connection.dataset_connection import coll_activity
from bson import ObjectId

router = APIRouter()

@router.get("/")
def get_activities(city: str = None):
    query = {}
    if city:
        query["City"] = city

    acts = []
    for a in coll_activity.find(query):
        a["_id"] = str(a["_id"])  # ✅ IMPORTANT
        acts.append(a)

    return acts
