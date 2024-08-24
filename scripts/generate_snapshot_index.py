import os
import json

def generate_snapshot_index(provider):
    snapshot_dir = f'snapshots/{provider}'
    snapshots = sorted(os.listdir(snapshot_dir))

    snapshot_files = [file for file in snapshots if file.endswith('.json') and 'permissions' in file]

    index_data = {
        "snapshots": snapshot_files
    }

    index_file = os.path.join(snapshot_dir, f'{provider}_snapshots_index.json')
    with open(index_file, 'w') as f:
        json.dump(index_data, f, indent=2)
    print(f"Index file generated for {provider}: {index_file}")

def main():
    providers = ['aws', 'azure', 'gcp']
    for provider in providers:
        generate_snapshot_index(provider)

if __name__ == "__main__":
    main()
