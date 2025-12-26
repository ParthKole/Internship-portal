# skill_gap_analyzer/service.py

from core.skill_matcher import (
    normalize_student_skills,
    normalize_internship_skills,
    compute_skill_matches,
    aggregate_results
)

def analyze_skill_gap(payload):
    student_data = payload.get("student", {})
    internship_data = payload.get("internship", {})

    normalized_student_skills = normalize_student_skills(
        student_data.get("skills", {})
    )

    normalized_internship_skills = normalize_internship_skills(
        internship_data.get("skills", {})
    )

    skill_matches = compute_skill_matches(
        normalized_student_skills,
        normalized_internship_skills
    )

    overall_percentage, eligibility = aggregate_results(skill_matches)

    return {
        "student_id": student_data.get("id"),
        "internship_id": internship_data.get("id"),
        "overall_match_percentage": overall_percentage,
        "eligibility": eligibility,
        "skill_matches": skill_matches
    }
