import pytest
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../scripts")))

def test_gcp_permissions_parsing():
    gcp_role = {
        "name": "roles/editor",
        "title": "Editor",
        "description": "Provides access to edit resources",
        "includedPermissions": [
            "compute.instances.start",
            "compute.instances.stop"
        ]
    }

    from scripts.fetch_gcp_permissions import formatGCPPermissions
    formatted_output = formatGCPPermissions(gcp_role)
    
    assert "Role Name: roles/editor" in formatted_output, "GCP role name formatting failed"
    assert "Included Permissions:" in formatted_output, "GCP permissions formatting failed"

def test_aws_permissions_parsing():
    aws_policy = {
        "PolicyName": "AdministratorAccess",
        "PolicyDocument": {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Action": "*",
                    "Resource": "*"
                }
            ]
        }
    }

    from scripts.fetch_aws_permissions import formatAWSPermissions
    formatted_output = formatAWSPermissions(aws_policy)
    
    assert "Policy Name: AdministratorAccess" in formatted_output, "AWS policy name formatting failed"
    assert "Effect: Allow" in formatted_output, "AWS policy effect formatting failed"

def test_azure_permissions_parsing():
    azure_role = {
        "RoleName": "Contributor",
        "Description": "Grants full access to manage resources",
        "Permissions": [
            {
                "actions": ["*"],
                "not_actions": [],
                "data_actions": [],
                "not_data_actions": []
            }
        ]
    }

    from scripts.fetch_azure_permissions import formatAzurePermissions
    formatted_output = formatAzurePermissions(azure_role)
    
    assert "Role Name: Contributor" in formatted_output, "Azure role name formatting failed"
    assert "Actions: *" in formatted_output, "Azure role actions formatting failed"

