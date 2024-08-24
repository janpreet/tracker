import pytest
import boto3
from botocore.exceptions import NoCredentialsError

def test_aws_iam_api():
    try:
        client = boto3.client("iam")
        response = client.list_roles()
        
        assert "Roles" in response, "AWS API response missing Roles"
        assert isinstance(response["Roles"], list), "AWS API response Roles is not a list"
    except NoCredentialsError:
        pytest.fail("AWS credentials not found")

