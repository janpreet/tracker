from google.oauth2 import service_account
from googleapiclient.discovery import build
import json
import os
from datetime import datetime

def fetch_gcp_permissions():
    credentials = service_account.Credentials.from_service_account_info(
        json.loads(os.environ['GCP_SERVICE_ACCOUNT_KEY']),
        scopes=['https://www.googleapis.com/auth/cloud-platform']
    )

    service = build('iam', 'v1', credentials=credentials)

    project_id = os.environ.get('GCP_PROJECT_ID')
    roles = []

    if project_id:
        request = service.roles().list(parent=f'projects/{project_id}')
    else:
        request = service.roles().list()

    while request is not None:
        response = request.execute()
        for role in response.get('roles', []):
            roles.append({
                'name': role['name'],
                'title': role['title'],
                'description': role.get('description', ''),
                'includedPermissions': role.get('includedPermissions', [])
            })
        request = service.roles().list_next(previous_request=request, previous_response=response)

    os.makedirs('snapshots/gcp', exist_ok=True)

    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    filename = f'snapshots/gcp/gcp_permissions_{timestamp}.json'
    with open(filename, 'w') as f:
        json.dump(roles, f, indent=2)

if __name__ == "__main__":
    fetch_gcp_permissions()