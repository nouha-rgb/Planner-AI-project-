import os
from pymongo import MongoClient
import certifi

# ---- Environment variables ----
os.environ['MONGODB_URI'] = 'mongodb+srv://bouziyannouha5_db_user:YKuq4xELIk54ZHUg@cluster0.0nqtv5a.mongodb.net/?retryWrites=true&w=majority'
os.environ['MONGODB_DB'] = 'AI_Planner'
os.environ['MONGODB_COLLR'] = 'restaurant'
os.environ['MONGODB_COLLH'] = 'hotel'
os.environ['MONGODB_COLLA'] = 'activity'

# ---- MongoDB Client ----
client = MongoClient(
    os.environ["MONGODB_URI"],
    tls=True,
    tlsCAFile=certifi.where()
)

# ---- Database & Collections ----
db = client[os.environ["MONGODB_DB"]]
coll_restaurant = db[os.environ["MONGODB_COLLR"]]
coll_hotel = db[os.environ["MONGODB_COLLH"]]
coll_activity = db[os.environ["MONGODB_COLLA"]]

# ---- Test connection ----
print(" Testing connection...")
first_doc = coll_hotel.find_one()
print(first_doc)

# ---- Test specific document ----
result = coll_hotel.find_one({"Hotel Name": "Ibis"})

if result:
    print(" Data found! Connection OK")
    print(result)
else:
    print(" No data found. Check collection name or document fields.")