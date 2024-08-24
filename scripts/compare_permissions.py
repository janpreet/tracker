import json
import os
from datetime import datetime

def compare_permissions():
    providers = ['aws', 'azure', 'gcp']
    comparison_results = {}

    for provider in providers:
        snapshot_dir = f'snapshots/{provider}'
        files = sorted(os.listdir(snapshot_dir), reverse=True)
        
        if len(files) < 2:
            comparison_results[provider] = "Not enough snapshots for comparison"
            continue

        latest_file = files[0]
        previous_file = files[1]

        with open(os.path.join(snapshot_dir, latest_file), 'r') as f:
            latest_data = json.load(f)
        with open(os.path.join(snapshot_dir, previous_file), 'r') as f:
            previous_data = json.load(f)

        changes = []
        for policy in latest_data:
            if policy not in previous_data:
                changes.append(f"Added: {policy['PolicyName']}")
        for policy in previous_data:
            if policy not in latest_data:
                changes.append(f"Removed: {policy['PolicyName']}")
        if not changes:
            changes = latest_data
        comparison_results[provider] = changes

    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    os.makedirs('snapshots', exist_ok=True)
    
    with open(f'snapshots/comparison_{timestamp}.json', 'w') as f:
        json.dump(comparison_results, f, indent=2)
    
    with open('snapshots/comparison_latest.json', 'w') as f:
        json.dump(comparison_results, f, indent=2)

if __name__ == "__main__":
    compare_permissions()