[![Update Cloud Permissions](https://github.com/janpreet/kado-permissions-tracker/actions/workflows/update.yaml/badge.svg)](https://github.com/janpreet/kado-permissions-tracker/actions/workflows/update.yaml)[![codecov](https://codecov.io/github/janpreet/kado-permissions-tracker/graph/badge.svg?token=Z4WUTLQLTV)](https://codecov.io/github/janpreet/kado-permissions-tracker)[![Known Vulnerabilities](https://snyk.io/test/github/janpreet/kado-permissions-tracker/badge.svg)](https://snyk.io/test/github/janpreet/kado-permissions-tracker)

# Kado Permissions Tracker

Kado Permissions Tracker is an advanced tool designed to monitor and compare permissions across multiple cloud providers—AWS, Azure, and Google Cloud Platform (GCP)—over time. As part of the [Kado ecosystem](https://github.com/janpreet/kado), it enhances your ability to manage and secure your cloud infrastructure by providing insights into permission changes and compliance with security policies.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Benefits](#benefits)
- [Usage](#usage)
- [Configuration](#configuration)
- [Integration with Kado](#integration-with-kado)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Kado Permissions Tracker offers a comprehensive solution for tracking and analyzing cloud permissions across different providers. By capturing snapshots of permissions over time, it allows users to monitor changes, identify potential security risks, and ensure compliance with established security policies.

## Features

- **Multi-Cloud Support:** Track and analyze permissions for AWS, Azure, and Google Cloud Platform.
- **Snapshot Comparison:** Compare permissions across different time snapshots to identify changes.
- **Search and Filter:** Easily search for specific roles or permissions within each provider.
- **Dark/Light Theme Toggle:** A user-friendly interface with a dark and light theme toggle for comfortable viewing.
- **Expandable/Collapsible Views:** Expand or collapse detailed permission views for easier navigation.
- **Responsive Design:** Optimized for various screen sizes, ensuring usability on all devices.

## Benefits

- **Change Tracking:** Detect modifications to cloud roles and permissions over time, allowing for proactive security management.
- **Security Compliance:** Ensure that your cloud permissions remain consistent with your organization's security policies, helping to prevent unauthorized access.
- **Cross-Provider Visibility:** Gain a unified view of permissions across AWS, Azure, and GCP, making it easier to manage multi-cloud environments.
- **Historical Analysis:** Review how permissions have evolved over time, assisting in audit, compliance, and forensic analysis.

## Usage

Kado Permissions Tracker automatically fetches and updates the latest permissions daily.

To view the permissions:

1. Visit the live site at [Kado Permissions Tracker](https://janpreet.github.io/kado-permissions-tracker/).
2. Use the cloud provider buttons to switch between AWS, Azure, and GCP.
3. Utilize the search bar to filter specific roles or permissions.
4. Click on roles to expand or collapse detailed permission information.
5. Use the theme toggle in the top-right corner to switch between dark and light modes.

## Configuration

Key configuration files include:

- `scripts/fetch_aws_permissions.py`: Fetches and processes AWS permissions.
- `scripts/fetch_azure_permissions.py`: Fetches and processes Azure permissions.
- `scripts/fetch_gcp_permissions.py`: Fetches and processes GCP permissions.
- `index.html`: The main page of the web interface.
- `styles.css`: Styles for the web interface, including theme customization.
- `script.js`: JavaScript functionality for the web interface, including search, expand/collapse, and theme toggle features.

## Integration with Kado

Kado Permissions Tracker is an integral component of the Kado ecosystem, a suite of tools designed to provide comprehensive infrastructure management. It works seamlessly with other Kado tools to offer enhanced visibility and control over your cloud infrastructure:

- **Configuration Management:** Ensure that your cloud permissions are always in sync with your infrastructure setup by integrating with Kado’s configuration management tools.
- **Dynamic Updates:** Utilize Kado’s templating system to dynamically adjust tracked permissions based on changes to your infrastructure.
- **Policy Enforcement:** Combine with Kado’s policy enforcement capabilities to automatically validate and enforce permission changes according to your security policies.

## Contributing

Contributions to Kado Permissions Tracker are welcome! Whether you're fixing bugs, adding new features, or improving documentation, your input is valuable. Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes with clear and descriptive messages.
4. Push your branch to your fork and submit a pull request.

Please ensure that your contributions adhere to the project’s coding standards and include tests where applicable.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.