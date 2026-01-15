from fastapi import APIRouter, HTTPException
from bson import ObjectId
from connection.dataset_connection import coll_hotel

router = APIRouter()

# =========================
# GET ALL HOTELS
# =========================
@router.get("/")
def get_hotels():
    hotels = []

    for hotel in coll_hotel.find():
        hotel["_id"] = str(hotel["_id"])   # 🔥 OBLIGATOIRE
        hotels.append(hotel)

    return hotels


# =========================
# GET HOTEL BY ID
# =========================
@router.get("/{id}")
def get_hotel(id: str):
    try:
        hotel = coll_hotel.find_one({"_id": ObjectId(id)})
    except:
        raise HTTPException(status_code=400, detail="Invalid ID")

    if not hotel:
        raise HTTPException(status_code=404, detail="Hotel not found")

    hotel["_id"] = str(hotel["_id"])       # 🔥 OBLIGATOIRE
    return hotel
