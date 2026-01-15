from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import cities, hotels, restaurants, activities
from routes import planner
app = FastAPI(title="AI Travel Planner API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",
            "http://127.0.0.1:5173",
             "http://localhost:5000",
        "http://127.0.0.1:5000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(cities.router, prefix="/cities", tags=["cities"])
app.include_router(hotels.router, prefix="/hotel", tags=["hotels"])
app.include_router(restaurants.router, prefix="/restaurant", tags=["restaurants"])
app.include_router(activities.router, prefix="/activity", tags=["activities"])
app.include_router(planner.router, prefix="/planner", tags=["planner"])