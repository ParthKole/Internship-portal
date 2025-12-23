# analyzer.py

from config import (
    LEVEL_MAP,
    MANDATORY_THRESHOLD,
    GOOD_FIT_THRESHOLD,
    PARTIAL_FIT_THRESHOLD
)

# ----------------------------
# Normalization helpers
# ----------------------------

def normalize_student_skills(student_skills):
    normalized = {}

    for skill_name, level_label in student_skills.items():
        level_key = level_label.lower()

        if level_key not in LEVEL_MAP:
            raise ValueError(f"Invalid skill level: {level_label}")

        normalized[skill_name] = LEVEL_MAP[level_key]

    return normalized


def normalize_internship_skills(internship_skills):
    normalized = {}
    total_weight = 0.0

    for skill_name, meta in internship_skills.items():
        required_level = meta.get("required_level")
        weight = meta.get("weight")
        mandatory = meta.get("mandatory", False)

        if not (0 < required_level <= 1):
            raise ValueError(f"Invalid required_level for {skill_name}")

        if not (0 < weight <= 1):
            raise ValueError(f"Invalid weight for {skill_name}")

        total_weight += weight

        normalized[skill_name] = {
            "required_level": required_level,
            "weight": weight,
            "mandatory": mandatory
        }

    if total_weight > 1.0:
        print("Warning: total internship skill weight exceeds 1.0")

    return normalized


# ----------------------------
# Core computation
# ----------------------------

def compute_skill_matches(student_skills, internship_skills):
    matches = []

    for skill_name, meta in internship_skills.items():
        required_level = meta["required_level"]
        weight = meta["weight"]
        mandatory = meta["mandatory"]

        student_level = student_skills.get(skill_name, 0.0)
        match_ratio = min(student_level / required_level, 1.0)

        matches.append({
            "skill": skill_name,
            "student_level": student_level,
            "required_level": required_level,
            "match_ratio": round(match_ratio, 3),
            "weight": weight,
            "mandatory": mandatory
        })

    return matches


def aggregate_results(skill_matches):
    total_weight = 0.0
    weighted_score = 0.0
    mandatory_failed = False

    for item in skill_matches:
        match = item["match_ratio"]
        weight = item["weight"]

        weighted_score += match * weight
        total_weight += weight

        if item["mandatory"] and match < MANDATORY_THRESHOLD:
            mandatory_failed = True

    overall_fit = (weighted_score / total_weight) if total_weight > 0 else 0.0
    overall_percentage = round(overall_fit * 100, 2)

    if mandatory_failed:
        eligibility = "NOT_ELIGIBLE"
    elif overall_fit >= GOOD_FIT_THRESHOLD:
        eligibility = "GOOD_FIT"
    elif overall_fit >= PARTIAL_FIT_THRESHOLD:
        eligibility = "PARTIAL_FIT"
    else:
        eligibility = "POOR_FIT"

    return overall_percentage, eligibility


# ----------------------------
# FINAL public API function
# ----------------------------

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
