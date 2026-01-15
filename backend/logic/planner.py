import random
import unicodedata
from bson import ObjectId
from connection.dataset_connection import coll_restaurant, coll_activity, coll_hotel


# ---------- UTILS ----------

def normalize_city(s):
    if not s:
        return ""
    return unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode("ascii").lower().strip()


def safe_int(v):
    try:
        return int(str(v).replace(",", "").strip())
    except:
        return 0


def extract_price(doc):
    for k, v in doc.items():
        if "price" in k.lower() or "budget" in k.lower():
            return safe_int(v)
    return 0


# ---------- USER INPUT ----------

def parse_user_input(form_data: dict):
    cities = []
    city_settings = {}

    for c in form_data.get("cities", []):
        name = c.get("name")
        days = int(c.get("days", 0))
        if name and days > 0:
            cities.append(name)
            city_settings[name] = {"days": days}

    return {
        "cities": cities,
        "city_settings": city_settings,
        "total_budget": float(form_data.get("budget", 0))
    }


# ---------- NORMALIZERS ----------

def normalize_restaurant(r):
    return {
        "name": r.get("Restaurant") or r.get("Nom") or r.get("Name") or "Restaurant",
        "price": extract_price(r),
        "rating": r.get("Rating") or 0,
        "address": r.get("Address") or "",
        "phone": r.get("Phone Number") or "",
        "ambiance": r.get("ambiance") or "",
        "imageIndex": int(r.get("imageIndex", random.randint(0, 9)))
    }


def normalize_activity(a):
    return {
        "name": (
            a.get("Nom de l’Activite") or
            a.get("Nom de l'activite") or
            a.get("Nom de l’Activité") or
            a.get("Name") or
            "Activité"
        ),
        "category": a.get("Categorie") or "",
        "description": a.get("Description") or "",
        "price": extract_price(a),
        "imageIndex": int(a.get("imageIndex", random.randint(0, 9)))
    }


def normalize_hotel(h):
    return {
        "name": h.get("Hotel Name") or h.get("Hotel name") or h.get("Name") or h.get("Nom") or "Hôtel",
        "price": extract_price(h),
        "rating": h.get("Rating") or 0,
        "address": h.get("Address") or "",
        "phone": h.get("Phone Number") or "",
        "imageIndex": int(h.get("imageIndex", random.randint(0, 9)))
    }


# ---------- PLANNER ----------

def build_trip_plan(user_input):
    trip = []
    budget_remaining = user_input["total_budget"]
    day_counter = 1

    total_days = sum(v["days"] for v in user_input["city_settings"].values())
    if total_days == 0:
        return {"trip": []}

    for city in user_input["cities"]:
        days = user_input["city_settings"][city]["days"]
        city_norm = normalize_city(city)

        hotels = [normalize_hotel(h) for h in coll_hotel.find() if normalize_city(h.get("City", "")) == city_norm]
        restos = [normalize_restaurant(r) for r in coll_restaurant.find() if normalize_city(r.get("City", "")) == city_norm]
        acts   = [normalize_activity(a) for a in coll_activity.find() if normalize_city(a.get("City", "")) == city_norm]

        for _ in range(days):

            remaining_days = max((total_days - day_counter + 1), 1)
            day_budget = budget_remaining / remaining_days

            # Répartition cible
            hotel_cap = day_budget * 0.4
            resto_cap = day_budget * 0.35 / 3
            act_cap   = day_budget * 0.25 / 3

            used = 0
            used_today = []

            def pick(items, cap):
                nonlocal used
                candidates = [
                    i for i in items
                    if i not in used_today and i["price"] <= cap and i["price"] + used <= day_budget
                ]
                if not candidates:
                    return None
                chosen = random.choice(candidates)
                used_today.append(chosen)
                used += chosen["price"]
                return chosen

            hotel = pick(hotels, hotel_cap)
            morning_r = pick(restos, resto_cap)
            morning_a = pick(acts, act_cap)
            afternoon_r = pick(restos, resto_cap)
            afternoon_a = pick(acts, act_cap)
            evening_r = pick(restos, resto_cap)
            evening_a = pick(acts, act_cap)

            # Fallback si rien n’a été choisi
            if used == 0:
                free = [a for a in acts if a["price"] == 0]
                random.shuffle(free)
                morning_a = free[0] if len(free) > 0 else None
                afternoon_a = free[1] if len(free) > 1 else None
                evening_a = free[2] if len(free) > 2 else None

            budget_remaining -= used

            trip.append({
                "id": day_counter,
                "city": city,
                "hotel": hotel,
                "morning": {"restaurant": morning_r, "activity": morning_a},
                "afternoon": {"restaurant": afternoon_r, "activity": afternoon_a},
                "evening": {"restaurant": evening_r, "activity": evening_a},
            })

            day_counter += 1

    return {"trip": trip}



# ---------- JSON SAFE ----------

def make_json_safe(obj):
    if isinstance(obj, dict):
        return {k: make_json_safe(v) for k, v in obj.items()}
    if isinstance(obj, list):
        return [make_json_safe(v) for v in obj]
    if isinstance(obj, ObjectId):
        return str(obj)
    return obj
