<br/>
<p align="center">
  <h2 align="center"> - Project Github Actions Documentation -</h3>

  <p align="center">
    Explore the Comprehensive <strong>Github Actions of the Clinic Control Project</strong>: A Guide to Automated Workflows and Efficient Project Management
    <br/>
    <br/>
    <a href="https://github.com/ItaloRAmaral/cliniccontrol/tree/main/docs"><strong><< Index</strong></a>
  </p>
</p>

---

## 📋 Table of Contents

<!-- 🔨 🔩 🪛 📏 📐 -->

- [📌 Introduction](#introduction)
- [📚 Project Github Actions](#project-github-actions)
  - [pre-release.yml](#pre-releaseyml)
  - [tests-pipeline.yml](#tests-pipelineyml)

---

## Introduction

Welcome to the Github Actions Documentation section of the Clinic Control Project. This resource is meticulously crafted to guide you through the diverse array of Github Actions that form the backbone of the Clinic Control system. Our Github Actions are engineered with precision, aiming to streamline operations, enhance functionality, and provide a customizable experience to meet the unique demands of healthcare management.

In this section, you will find comprehensive documentation that covers everything from basic setup to advanced Github Action functionalities. Whether you are looking to understand the core workings of the system, implement new features, or optimize existing processes, these documents serve as your go-to resource. We have structured this guide to cater to both beginners and advanced users, ensuring that everyone can make the most out of the Clinic Control Project.

<h2 id="project-github-actions">📚 Project Github Actions</h2>
<h3 id="pre-releaseyml"> pre-release.yml</h3>

This GitHub Actions workflow is designed to automate various checks and operations when changes are pushed to the main branch of the ClinicControl project. It includes steps for validating commit messages, setting up the environment, running tests, building the project, and performing a pre-release.

#### Workflow Steps

1. **Trigger Conditions:** activated on push events to the main branch.
2. **Permissions:** Configured with write permissions for pull-requests, issues, repository-projects, deployments, contents, statuses, actions, and read permissions for checks.
3. **Environment Variables:** Includes JWT keys, PostgreSQL credentials, API key, etc., sourced from GitHub secrets for security.
4. **Jobs:**

- **check-commit-message:**
  - Checks out the main branch.
  - Verifies if the commit message includes "skip-github-pipeline". If found, the workflow is canceled.
- **pre-release:**
  - Runs on Ubuntu-latest.
  - Configures the working directory and sets up Node.js, NPM, Yarn, and PNPM versions.
  - Installs PNPM and dependencies with locked versions.
  - Sets up additional environment variables.
  - Initializes Docker Compose and sets up the Prisma PostgreSQL database.
  - Overrides the Nx Cloud token for security.
  - Determines the branch name for running Nx commands.
  - Executes Nx commands to check affected projects, run linting, tests, and build tasks.
  - On successful completion and under specific conditions (not a pull request or a merged pull request), it performs a conventional pre-release using PNPM.
  - Finally, overrides the Nx token back to a fake value to secure the real token.

#### Security Considerations

The workflow uses GitHub secrets to securely handle sensitive data like API keys and database credentials.

It ensures that the Nx Cloud access token is not exposed by overriding it with a fake value after use.

---

<h3 id="tests-pipelineyml"> tests-pipeline.yml</h3>

The "Unit Tests Pipeline" is a GitHub Actions workflow in the ClinicControl project designed to automate the execution of unit and end-to-end (E2E) tests. It is triggered by push and pull request events to the main branch, ensuring that new code changes are thoroughly tested before integration.

#### Workflow Configuration

1. **Trigger Conditions:**

- The workflow is activated on pushes and pull requests targeting the main branch.

2. **Environment Variables:**

- Sets common environment variables like JWT_PRIVATE_KEY, POSTGRES_USER, etc., from GitHub secrets for secure operations.

3. **Jobs:**

- **tests-pipeline:**
  - Executes on the latest Ubuntu runner.
  - Sets up necessary environment variables for the testing process.
  - Defines the working directory as the GitHub workspace for all run commands.

4. **Steps:**

- **Checkout Repository:** Checks out the code from the repository.
- **Install PNPM:** Sets up PNPM to the specified version for dependency management.
- **Install Dependencies:** Installs all dependencies using PNPM with a locked version to ensure consistency.
- \*\*Set Up Environment Variables: Configures additional environment variables, including the database URL.
- **Run Core-Setup Script:** Executes the core-setup script with actions like migrate and generate to prepare the application for testing.
- **Run E2E Tests:** Executes end-to-end tests using the test:e2e script.
- **Run Unit Tests:** Runs unit tests with the test:unit script to validate the functionality of individual units of code.

#### Importance of This Workflow

- **Quality Assurance:** Ensures that every new or updated code that reaches the main branch is tested, maintaining the overall quality of the application.
- **Automated Testing:** Automates the testing process, saving time and reducing the risk of human error in manual testing.
- **Continuous Integration:** Facilitates continuous integration by automatically running tests on every push or pull request, allowing for quick detection and resolution of issues.

---
