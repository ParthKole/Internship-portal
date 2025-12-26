# recommendation_system/main.py

from recommendation_system.recommender import recommend_internships


def main():
    # ----------------------------
    # Test student profile
    # ----------------------------
    student_profile = {
    "id": "S123",
    "skills": {
        "Python": "Mediocre",
        "DSA": "Expert",
        "Git": "Beginner"
    },
    "education": {
        "degree": "BTech",
        "year": 3
    },
    "preferences": {
        "domains": ["AI"],
        "location": "Remote"
    }
}


    # ----------------------------
    # Test internships
    # ----------------------------
    internships = [
        {
            "id": "I001",
            "skills": {
                "DSA": {
                    "required_level": 0.8,
                    "weight": 0.4,
                    "mandatory": True
                },
                "Python": {
                    "required_level": 0.5,
                    "weight": 0.3,
                    "mandatory": True
                }
            }
        },
        {
            "id": "I002",
            "skills": {
                "Python": {
                    "required_level": 0.7,
                    "weight": 0.5,
                    "mandatory": True
                },
                "SQL": {
                    "required_level": 0.5,
                    "weight": 0.3,
                    "mandatory": False
                }
            }
        },
        {
            "id": "I003",
            "skills": {
                "Git": {
                    "required_level": 0.3,
                    "weight": 0.2,
                    "mandatory": False
                },
                "DSA": {
                    "required_level": 0.6,
                    "weight": 0.4,
                    "mandatory": True
                }
            }
        }
    ]

    # ----------------------------
    # Run recommendation
    # ----------------------------
    recommendations = recommend_internships(student_profile, internships)

    # ----------------------------
    # Print results
    # ----------------------------
    print("\n=== RECOMMENDATION RESULTS ===\n")

    for idx, rec in enumerate(recommendations, start=1):
        print(f"Rank {idx}")
        print(f"Internship ID: {rec['internship_id']}")
        print(f"Score: {rec['score']}")
        print(f"Explanation: {rec['explanation']['summary']}")
        print(f"Matched Skills: {rec['explanation']['matched_skills']}")
        print(f"Missing Mandatory Skills: {rec['explanation']['missing_mandatory_skills']}")
        print("-" * 40)


if __name__ == "__main__":
    main()
