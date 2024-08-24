import pytest
import json
import os
from google.oauth2 import service_account
from googleapiclient.discovery import build

def test_gcp_iam_api():
    credentials_info = json.loads(os.environ["GCP_SERVICE_ACCOUNT_KEY"])
    credentials = service_account.Credentials.from_service_account_info(
        credentials_info,
        scopes=["https://www.googleapis.com/auth/cloud-platform"]
    )
    service = build("iam", "v1", credentials=credentials)
    request = service.roles().list()
    response = request.execute()
    
    assert "roles" in response, "GCP API response missing roles"
    assert isinstance(response["roles"], list), "GCP API response roles is not a list"


