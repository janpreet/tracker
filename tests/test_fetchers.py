import unittest
import os
import json
from scripts.fetch_aws_permissions import fetch_aws_permissions

class TestFetchers(unittest.TestCase):
    def test_aws_fetcher(self):
        fetch_aws_permissions()
        latest_file = max(os.listdir('src/snapshots/aws'))
        with open(f'src/snapshots/aws/{latest_file}', 'r') as f:
            data = json.load(f)
        self.assertIsInstance(data, list)
        self.assertTrue(len(data) > 0)
        self.assertIn('PolicyName', data[0])
        self.assertIn('PolicyDocument', data[0])

if __name__ == '__main__':
    unittest.main()