import os
import json
from datetime import datetime
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

def fetch_gcp_permissions():
    try:
        service_account_key = os.environ.get('GCP_SERVICE_ACCOUNT_KEY')
        if not service_account_key:
            raise ValueError("GCP_SERVICE_ACCOUNT_KEY environment variable is not set.")
        
        credentials = service_account.Credentials.from_service_account_info(
            json.loads(service_account_key),
            scopes=['https://www.googleapis.com/auth/cloud-platform']
        )
        service = build('iam', 'v1', credentials=credentials)

        project_id = os.environ.get('GCP_PROJECT_ID')
        if not project_id:
            raise ValueError("GCP_PROJECT_ID environment variable is not set.")

        roles = []
        request = service.projects().roles().list(parent=f'projects/{project_id}')
        while request is not None:
            response = request.execute()
            roles.extend(response.get('roles', []))
            request = service.projects().roles().list_next(previous_request=request, previous_response=response)

        detailed_roles = []
        for role in roles:
            detailed_roles.append({
                'RoleName': role['name'],
                'RoleTitle': role['title'],
                'Description': role.get('description', ''),
                'IncludedPermissions': role.get('includedPermissions', [])
            })

        os.makedirs('snapshots/gcp', exist_ok=True)

        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        filename = f'snapshots/gcp/gcp_permissions_{timestamp}.json'
        with open(filename, 'w') as f:
            json.dump(detailed_roles, f, indent=2)
        with open('snapshots/gcp/gcp_permissions_latest.json', 'w') as f:
            json.dump(detailed_roles, f, indent=2)

        print(f"Roles data successfully written to {filename} and 'snapshots/gcp/gcp_permissions_latest.json'")

    except HttpError as e:
        print(f"An HTTP error occurred: {e}")
    except ValueError as ve:
        print(f"Value error: {ve}")
    except Exception as ex:
        print(f"An unexpected error occurred: {ex}")

if __name__ == "__main__":
    fetch_gcp_permissions()
