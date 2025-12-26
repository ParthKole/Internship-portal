from skill_gap_analyzer.service import analyze_skill_gap

payload = {
    "student": {
        "id": "S123",
        "skills": {
            "Python": "Mediocre",
            "DSA": "Expert",
            "Git": "Beginner"
        }
    },
    "internship": {
        "id": "I456",
        "skills": {
            "DSA": {
                "required_level": 0.8,
                "weight": 0.3,
                "mandatory": True
            },
            "Python": {
                "required_level": 0.5,
                "weight": 0.25,
                "mandatory": True
            },
            "SQL": {
                "required_level": 0.5,
                "weight": 0.2,
                "mandatory": False
            }
        }
    }
}

result = analyze_skill_gap(payload)
print("Overall Match:", result["overall_match_percentage"])
print("Eligibility:", result["eligibility"])
print("\nPer-skill breakdown:")
for item in result["skill_matches"]:
    print(item)
