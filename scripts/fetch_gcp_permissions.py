from google.oauth2 import service_account
from googleapiclient.discovery import build
import json
import os
from datetime import datetime

def fetch_gcp_permissions():
    print("Starting GCP permissions fetch...")
    
    try:
        credentials = service_account.Credentials.from_service_account_info(
            json.loads(os.environ['GCP_SERVICE_ACCOUNT_KEY']),
            scopes=['https://www.googleapis.com/auth/cloud-platform']
        )
        print("Successfully loaded GCP credentials")
    except Exception as e:
        print(f"Error loading GCP credentials: {str(e)}")
        return

    service = build('iam', 'v1', credentials=credentials)

    roles = []
    request = service.roles().list(parent='roles')

    try:
        while request is not None:
            response = request.execute()
            for role in response.get('roles', []):
                roles.append({
                    'name': role['name'].split('/')[-1],
                    'title': role['title'],
                    'description': role.get('description', ''),
                    'includedPermissions': role.get('includedPermissions', [])
                })
            request = service.roles().list_next(previous_request=request, previous_response=response)
    except Exception as e:
        print(f"Error fetching roles: {str(e)}")

    print(f"Fetched {len(roles)} predefined roles from GCP")

    if len(roles) == 0:
        print("No roles fetched. Check permissions and API enablement.")
        return

    os.makedirs('snapshots/gcp', exist_ok=True)

    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    filename = f'snapshots/gcp/gcp_permissions_{timestamp}.json'
    latest_filename = 'snapshots/gcp/gcp_permissions_latest.json'

    formatted_roles = []
    for role in roles:
        formatted_role = {
            "PolicyName": role['name'],
            "PolicyDocument": {
                "Version": "GCP Predefined Role",
                "Statement": [
                    {
                        "Effect": "Allow",
                        "Action": role['includedPermissions'],
                        "Resource": "*"
                    }
                ]
            }
        }
        formatted_roles.append(formatted_role)

    with open(filename, 'w') as f:
        json.dump(formatted_roles, f, indent=2)
    print(f"Saved GCP permissions to {filename}")

    with open(latest_filename, 'w') as f:
        json.dump(formatted_roles, f, indent=2)
    print(f"Updated {latest_filename}")

if __name__ == "__main__":
    fetch_gcp_permissions()