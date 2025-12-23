from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict
from analyzer import analyze_skill_gap


app = FastAPI(title="Skill Gap Analyzer API")

class StudentModel(BaseModel):
    id: str
    skills: Dict[str, str]


class InternshipSkillModel(BaseModel):
    required_level: float
    weight: float
    mandatory: bool


class InternshipModel(BaseModel):
    id: str
    skills: Dict[str, InternshipSkillModel]


class SkillGapRequest(BaseModel):
    student: StudentModel
    internship: InternshipModel



@app.get("/")
def health_check():
    return {"status": "Skill Gap Analyzer API is running"}

@app.post("/skill-gap/analyze")
def analyze(request: SkillGapRequest):
    payload = request.dict()
    return analyze_skill_gap(payload)

