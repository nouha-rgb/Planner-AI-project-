from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

from logic.planner import parse_user_input, build_trip_plan, make_json_safe

router = APIRouter()


class CityPlan(BaseModel):
    name: str
    days: int


class PlanningRequest(BaseModel):
    budget: int
    cities: List[CityPlan]


@router.post("/generate")
def generate_planning(data: PlanningRequest):
    try:
        payload = {
            "budget": data.budget,
            "cities": [{"name": c.name, "days": c.days} for c in data.cities],
        }

        parsed = parse_user_input(payload)

        result = build_trip_plan(parsed)  # {"trip": [...]}

        safe_result = make_json_safe(result)

        return {
            "success": True,
            "planning": safe_result["trip"]
        }

    except Exception as e:
        print("❌ BACKEND ERROR:", repr(e))
        raise HTTPException(status_code=500, detail=str(e))
