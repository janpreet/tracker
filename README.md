# Cloud Permissions Tracker

Cloud Permissions Tracker is a tool designed to monitor and compare permissions across multiple cloud providers (AWS, Azure, GCP) over time. It is part of the Kado ecosystem, enhancing infrastructure management capabilities.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Benefits](#benefits)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Integration with Kado](#integration-with-kado)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Cloud Permissions Tracker provides a comprehensive solution for tracking and analyzing cloud permissions across different providers. By offering snapshots of permissions over time, it allows users to monitor changes and ensure compliance with security policies.

## Features

- Track permissions for AWS, Azure, and Google Cloud Platform
- Compare permissions across different time snapshots
- Search functionality for roles and permissions
- Dark-themed user interface for comfortable viewing
- Expandable/collapsible view of detailed permissions
- Responsive design for various screen sizes

## Benefits

- **Change Tracking**: Easily identify any modifications to predefined cloud roles and permissions over time.
- **Security Compliance**: Ensure that your cloud permissions remain consistent with your security policies.
- **Cross-Provider Visibility**: Get a unified view of permissions across multiple cloud providers.
- **Historical Analysis**: Review how permissions have evolved, helping in audit and compliance processes.

## Usage

This tool will fetch the latest permissions daily and update the webpage.

To view the permissions:

1. Visit https://janpreet.github.io/cloud-permissions-tracker/.
2. Use the cloud provider buttons to switch between AWS, Azure, and GCP.
3. Use the search bar to filter roles or permissions.
4. Click on roles to expand/collapse detailed permission information.

## Configuration

Key configuration files include:

- `scripts/fetch_aws_permissions.py`: Script to fetch AWS permissions.
- `scripts/fetch_azure_permissions.py`: Script to fetch Azure permissions.
- `scripts/fetch_gcp_permissions.py`: Script to fetch GCP permissions.
- `index.html`: Main page of the web interface.
- `styles.css`: Styles for the web interface.
- `script.js`: JavaScript for the web interface functionality.

## Integration with Kado

Cloud Permissions Tracker is part of the Kado ecosystem, a suite of tools designed for comprehensive infrastructure management. While it can be used standalone, it integrates seamlessly with other Kado components to provide enhanced visibility and control over your infrastructure:

- Use in conjunction with Kado's configuration management to ensure permissions align with your infrastructure setup.
- Leverage Kado's templating system to dynamically update tracked permissions based on your infrastructure changes.
- Combine with Kado's policy enforcement to automatically validate permission changes against your defined policies.

## Contributing

Contributions to Cloud Permissions Tracker are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature.
3. Commit your changes.
4. Push to your fork and submit a pull request.

Please ensure your code adheres to the project's coding standards and include tests for new features.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.