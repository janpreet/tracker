from azure.identity import ClientSecretCredential
from azure.mgmt.authorization import AuthorizationManagementClient
import os
import json
from datetime import datetime

def fetch_azure_permissions():
    tenant_id = os.environ['AZURE_TENANT_ID']
    client_id = os.environ['AZURE_CLIENT_ID']
    client_secret = os.environ['AZURE_CLIENT_SECRET']
    subscription_id = os.environ['AZURE_SUBSCRIPTION_ID']

    credential = ClientSecretCredential(tenant_id, client_id, client_secret)
    auth_client = AuthorizationManagementClient(credential, subscription_id)

    roles = list(auth_client.role_definitions.list(scope="/"))

    role_definitions = []
    for role in roles:
        role_definitions.append({
            'RoleName': role.role_name,
            'Description': role.description,
            'Permissions': [perm.to_dict() for perm in role.permissions]
        })

    os.makedirs('snapshots/azure', exist_ok=True)

    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    filename = f'snapshots/azure/azure_permissions_{timestamp}.json'
    with open(filename, 'w') as f:
        json.dump(role_definitions, f, indent=2)

if __name__ == "__main__":
    fetch_azure_permissions()