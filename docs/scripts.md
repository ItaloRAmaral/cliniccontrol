<br/>
<p align="center">
  <h2 align="center"> - Scripts Documentation -</h3>

  <p align="center">
    Scripts Documentation: Delve into the Essential <strong>Scripts of the Clinic Control Project</strong> - Your Gateway to Efficient Operations and Customization
    <br/>
    <br/>
    <a href="https://github.com/ItaloRAmaral/cliniccontrol/tree/main/docs"><strong><< Index</strong></a>
  </p>
</p>

---

## 📋 Table of Contents

<!-- 🔨 🔩 🪛 📏 📐 -->

- [📌 Introduction](#introduction)
- [🗂️ Folder Structure](#folder-structure)
- [🧰 Scripts](#scripts)
  - [🛠️ nx](#nx)
    - [set-nx-cloud-token.sh](#set-nx-cloud-token.sh)
  - [🛠️ setup](#setup)
    - [🔧 core-rest-api](#core-rest-api)
      - [run-setup.sh](#run-setup.sh)
      - [run-prisma-setup.sh](#run-prisma-setup.sh)
      - [docker-compose-control.sh](#docker-compose-control.sh)

<h2 id="introduction">📌 Introduction</h2>

Welcome to the Scripts Documentation section of the Clinic Control Project. This resource is meticulously crafted to guide you through the diverse array of scripts that form the backbone of the Clinic Control system. Our scripts are engineered with precision, aiming to streamline operations, enhance functionality, and provide a customizable experience to meet the unique demands of healthcare management.

In this section, you will find comprehensive documentation that covers everything from basic setup to advanced script functionalities. Whether you are looking to understand the core workings of the system, implement new features, or optimize existing processes, these documents serve as your go-to resource. We have structured this guide to cater to both beginners and advanced users, ensuring that everyone can make the most out of the Clinic Control Project.

<h2 id="folder-structure">🗂️ Folder Structure</h2>

```
scripts
├── nx
├── setup
│   └── core-rest-api
│
└── other_project_scripts
```

<h2 id="scripts"> 🧰 Scripts</h2>

<h3 id="nx">🛠️ Nx</h3>

<code id="set-nx-cloud-token.sh">set-nx-cloud-token.sh</code>

This bash script accepts named arguments and overwrites the token from nx.json with a fake token of your choice.

Call this script with the following command:

```bash
  bash scripts/nx/set-token.sh --access-token=my-secret-token
```

<h3 id="setup">🛠️ Setup</h3>
<h4 id="core-rest-api">🔧 Core-rest-api</h4>

<code id="run-setup.sh">run-setup.sh</code>

This bash script is designed to automate the setup of a Docker Compose-based environment and the execution of the Prisma migration. It accepts named arguments and performs the following actions:

- Starts Docker Compose services defined in docker-compose.yaml.
- Checks if the Docker Compose setup was successful and exits with an error if not.
- Waits for a brief moment for the services to become ready.
- Executes another script called run-prisma-setup.sh with an argument.
- Checks if the run-prisma-setup.sh script ran successfully and exits with an error if not.

```bash
  bash scripts/setup/core-rest-api/run-setup.sh --action=<prisma_action>
```

<code id="run-prisma-setup.sh">run-prisma-setup.sh</code>

This bash script is designed to automate the execution of the Prisma migration, Prisma client generation, and Prisma Studio opening. It accepts named arguments and performs the following actions:

- `--action`: The action to be performed. This argument is required and accepts the following values:
  - `migrate`: Executes the Prisma migration.
  - `generate`: Generates the Prisma client.
  - `studio`: Opens the Prisma Studio.

```bash
  bash ./scripts/setup/core-rest-api/run-prisma-setup.sh --action=<prisma_action>
```

<code id="docker-compose-control.sh">docker-compose-control.sh</code>

This bash script is designed to automate the control of Docker Compose services. It accepts named arguments and performs the following actions:

- `--action`: The action to be performed. This argument is required and accepts the following values:
  - `up`: Starts Docker Compose services defined in docker-compose.yaml.
  - `restart`: Restarts Docker Compose services defined in docker-compose.yaml.
  - `stop`: Stops Docker Compose services defined in docker-compose.yaml.
  - `down`: Stops and removes Docker Compose services defined in docker-compose.yaml.

```bash
  bash ./scripts/setup/core-rest-api/docker-compose-control.sh--action=<docker_compose_action>
```
