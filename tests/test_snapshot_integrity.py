import os
import json

def test_aws_snapshot_file_creation():
    file_path = "./snapshots/aws/aws_permissions_latest.json"
    
    assert os.path.exists(file_path), "AWS snapshot file does not exist"
    
    with open(file_path, "r") as f:
        data = json.load(f)
        assert isinstance(data, list), "AWS snapshot data is not a list"
        assert len(data) > 0, "AWS snapshot data is empty"

def test_gcp_snapshot_file_creation():
    file_path = "./snapshots/gcp/gcp_permissions_latest.json"
    
    assert os.path.exists(file_path), "GCP snapshot file does not exist"
    
    with open(file_path, "r") as f:
        data = json.load(f)
        assert isinstance(data, list), "GCP snapshot data is not a list"
        assert len(data) > 0, "GCP snapshot data is empty"

def test_azure_snapshot_file_creation():
    file_path = "./snapshots/azure/azure_permissions_latest.json"
    
    assert os.path.exists(file_path), "Azure snapshot file does not exist"
    
    with open(file_path, "r") as f:
        data = json.load(f)
        assert isinstance(data, list), "Azure snapshot data is not a list"
        assert len(data) > 0, "Azure snapshot data is empty"

