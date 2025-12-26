from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict
import requests

from recommendation_system.recommender import recommend_internships

app = FastAPI(title="Internship Recommendation API")


# ----------------------------
# Configuration
# ----------------------------

BACKEND_BASE_URL = "http://localhost:8001"  # Backend service URL


# ----------------------------
# Pydantic models
# ----------------------------

class StudentModel(BaseModel):
    id: str
    skills: Dict[str, str]
    education: dict | None = None
    preferences: dict | None = None


class RecommendationRequest(BaseModel):
    student: StudentModel


class RecommendationResponse(BaseModel):
    recommendations: list


# ----------------------------
# Helper: Fetch internships from backend
# ----------------------------

def fetch_internships_from_backend():
    """
    Fetch internships from backend service.
    Backend owns the database.
    """
    response = requests.get(f"{BACKEND_BASE_URL}/internships")
    response.raise_for_status()
    return response.json()


# ----------------------------
# Endpoints
# ----------------------------

@app.get("/")
def health_check():
    return {"status": "Recommendation API is running"}


@app.post("/recommendations", response_model=RecommendationResponse)
def recommend(request: RecommendationRequest):
    student_profile = request.student.dict()

    # Fetch internships from backend API
    internships = fetch_internships_from_backend()

    recommendations = recommend_internships(student_profile, internships)

    return {"recommendations": recommendations}
