from fastapi import FastAPI

app = FastAPI(title="Mock Internship Backend")


@app.get("/internships")
def get_internships():
    return [
        # ----------------------------
        # Strong AI Internship
        # ----------------------------
        {
            "id": "I001",
            "domain": "AI",
            "location": "Remote",
            "eligibility": {
                "min_year": 2,
                "max_year": 4,
                "allowed_degrees": ["BTech", "BE"]
            },
            "skills": {
                "Python": {
                    "required_level": 0.6,
                    "weight": 0.4,
                    "mandatory": True
                },
                "DSA": {
                    "required_level": 0.7,
                    "weight": 0.3,
                    "mandatory": True
                },
                "ML": {
                    "required_level": 0.5,
                    "weight": 0.2,
                    "mandatory": False
                }
            }
        },

        # ----------------------------
        # Web Development Internship
        # ----------------------------
        {
            "id": "I002",
            "domain": "Web",
            "location": "Remote",
            "eligibility": {
                "min_year": 1,
                "allowed_degrees": ["BTech", "BSc"]
            },
            "skills": {
                "HTML": {
                    "required_level": 0.4,
                    "weight": 0.2,
                    "mandatory": True
                },
                "CSS": {
                    "required_level": 0.4,
                    "weight": 0.2,
                    "mandatory": True
                },
                "JavaScript": {
                    "required_level": 0.5,
                    "weight": 0.3,
                    "mandatory": True
                },
                "React": {
                    "required_level": 0.4,
                    "weight": 0.2,
                    "mandatory": False
                }
            }
        },

        # ----------------------------
        # Data Analyst Internship
        # ----------------------------
        {
            "id": "I003",
            "domain": "Data",
            "location": "Onsite",
            "eligibility": {
                "min_year": 3,
                "allowed_degrees": ["BTech", "BSc"]
            },
            "skills": {
                "Python": {
                    "required_level": 0.5,
                    "weight": 0.3,
                    "mandatory": True
                },
                "SQL": {
                    "required_level": 0.6,
                    "weight": 0.4,
                    "mandatory": True
                },
                "Excel": {
                    "required_level": 0.4,
                    "weight": 0.2,
                    "mandatory": False
                }
            }
        },

        # ----------------------------
        # Cyber Security Internship
        # ----------------------------
        {
            "id": "I004",
            "domain": "Security",
            "location": "Remote",
            "eligibility": {
                "min_year": 3,
                "allowed_degrees": ["BTech"]
            },
            "skills": {
                "Networking": {
                    "required_level": 0.6,
                    "weight": 0.4,
                    "mandatory": True
                },
                "Linux": {
                    "required_level": 0.5,
                    "weight": 0.3,
                    "mandatory": True
                },
                "Python": {
                    "required_level": 0.4,
                    "weight": 0.2,
                    "mandatory": False
                }
            }
        },

        # ----------------------------
        # Intentionally Ineligible Internship
        # (to test Phase 6 filtering)
        # ----------------------------
        {
            "id": "I005",
            "domain": "Finance",
            "location": "Onsite",
            "eligibility": {
                "min_year": 4,
                "allowed_degrees": ["MBA"]
            },
            "skills": {
                "Accounting": {
                    "required_level": 0.6,
                    "weight": 0.5,
                    "mandatory": True
                }
            }
        }
    ]
