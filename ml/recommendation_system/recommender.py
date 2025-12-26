from core.skill_matcher import (
    normalize_student_skills,
    normalize_internship_skills,
    compute_skill_matches,
    aggregate_results
)

MANDATORY_PENALTY_FACTOR = 0.8


def is_eligible(student_profile, internship):
    """
    Returns True if the student satisfies internship eligibility.
    Missing fields are treated as non-restrictive.
    """

    # --- Education checks ---
    student_edu = student_profile.get("education") or {}
    internship_elig = internship.get("eligibility", {})

    student_year = student_edu.get("year")
    if student_year is not None:
        min_year = internship_elig.get("min_year")
        max_year = internship_elig.get("max_year")

        if min_year is not None and student_year < min_year:
            return False
        if max_year is not None and student_year > max_year:
            return False

    student_degree = student_edu.get("degree")
    allowed_degrees = internship_elig.get("allowed_degrees")
    if allowed_degrees and student_degree:
        if student_degree not in allowed_degrees:
            return False

    # --- Domain preference ---
    internship_domain = internship.get("domain")
    preferred_domains = student_profile.get("preferences", {}).get("domains")
    if internship_domain and preferred_domains:
        if internship_domain not in preferred_domains:
            return False

    # --- Location preference ---
    internship_location = internship.get("location")
    preferred_location = student_profile.get("preferences", {}).get("location")
    if internship_location and preferred_location:
        if internship_location != preferred_location:
            return False

    return True


def apply_mandatory_penalty(base_score, skill_matches):
    """
    Applies multiplicative penalty for each missing mandatory skill.
    """
    missing_mandatory = 0
    for item in skill_matches:
        if item["mandatory"] and item["match_ratio"] == 0.0:
            missing_mandatory += 1

    final_score = base_score * (MANDATORY_PENALTY_FACTOR ** missing_mandatory)
    return round(final_score, 2), missing_mandatory


def compute_tiebreak_metrics(skill_matches):
    """
    Computes metrics used ONLY for tie-breaking.
    """
    matched_mandatory_count = 0
    matched_weight_sum = 0.0

    for item in skill_matches:
        if item["match_ratio"] > 0:
            matched_weight_sum += item["weight"]
            if item["mandatory"]:
                matched_mandatory_count += 1

    return {
        "matched_weight_sum": round(matched_weight_sum, 3),
        "matched_mandatory_count": matched_mandatory_count
    }


def build_explanation(skill_matches, missing_mandatory_count):
    """
    Generates a short, human-readable explanation.
    """
    matched = []
    missing = []

    for item in skill_matches:
        if item["match_ratio"] > 0:
            matched.append(item["skill"])
        elif item["mandatory"]:
            missing.append(item["skill"])

    explanation = {
        "matched_skills": matched,
        "missing_mandatory_skills": missing,
        "summary": ""
    }

    if missing_mandatory_count > 0:
        explanation["summary"] = (
            f"Missing {missing_mandatory_count} mandatory skill(s): {', '.join(missing)}"
        )
    else:
        explanation["summary"] = "Good alignment with required skills"

    return explanation


def recommend_internships(student_profile, internships):
    """
    Core recommendation function with eligibility filtering
    and deterministic tie-breakers.
    """

    recommendations = []

    normalized_student_skills = normalize_student_skills(
        student_profile.get("skills", {})
    )

    for internship in internships:

        # ---- PHASE 6: ELIGIBILITY FILTER ----
        if not is_eligible(student_profile, internship):
            continue

        normalized_internship_skills = normalize_internship_skills(
            internship.get("skills", {})
        )

        skill_matches = compute_skill_matches(
            normalized_student_skills,
            normalized_internship_skills
        )

        base_score, _ = aggregate_results(skill_matches)

        final_score, missing_mandatory_count = apply_mandatory_penalty(
            base_score, skill_matches
        )

        tiebreak = compute_tiebreak_metrics(skill_matches)

        explanation = build_explanation(
            skill_matches, missing_mandatory_count
        )

        recommendations.append({
            "internship_id": internship.get("id"),
            "score": final_score,
            "explanation": explanation,
            # internal-only fields for sorting
            "_missing_mandatory": missing_mandatory_count,
            "_matched_weight_sum": tiebreak["matched_weight_sum"],
            "_matched_mandatory_count": tiebreak["matched_mandatory_count"],
        })

    # ---- Deterministic sort with tie-breakers ----
    recommendations.sort(
        key=lambda x: (
            -x["score"],
            x["_missing_mandatory"],
            -x["_matched_weight_sum"],
            -x["_matched_mandatory_count"],
        )
    )

    # Remove internal fields before returning
    for rec in recommendations:
        rec.pop("_missing_mandatory")
        rec.pop("_matched_weight_sum")
        rec.pop("_matched_mandatory_count")

    return recommendations
