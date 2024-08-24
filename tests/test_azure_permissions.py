import pytest
import os
from azure.identity import DefaultAzureCredential
from azure.mgmt.authorization import AuthorizationManagementClient

def test_azure_iam_api():
    try:
        credential = DefaultAzureCredential()
        client = AuthorizationManagementClient(credential, os.environ["AZURE_SUBSCRIPTION_ID"])
        roles = list(client.role_definitions.list(
            scope=f"/subscriptions/{os.environ['AZURE_SUBSCRIPTION_ID']}"
        ))
        
        assert len(roles) > 0, "Azure API response returned no roles"
    except Exception as e:
        pytest.fail(f"Azure API call failed: {str(e)}")

