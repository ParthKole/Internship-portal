import requests

BACKEND_BASE_URL = "http://localhost:8001"  # backend service URL

def fetch_internships():
    """
    Fetch internships from backend service.
    Backend owns the database.
    """
    response = requests.get(f"{BACKEND_BASE_URL}/internships")
    response.raise_for_status()
    return response.json()
