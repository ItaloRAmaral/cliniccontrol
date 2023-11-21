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

- [📌 Introduction](#introduction)
- [🗂️ Folder Structure](#folder-structure)
- [💻 Scripts](#scripts)
  - [nx](#nx)
  - [setup](#setup)
    - [core-rest-api](#core-rest-api)

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

<h2 id="scripts">💻 Scripts</h2>

<h3 id="nx">Nx</h3>

#### set-nx-cloud-token.sh

This script accepts named arguments and overwrites the token from nx.json with a fake token of your choice.

Call this script with the following command:

```bash
  bash scripts/nx/set-token.sh --access-token=my-secret-token
```

<h3 id="nx">Setup</h3>
<h4 id="core-rest-api">Core-rest-api</h4>

#### run-setup.sh

#### run-prisma-setup.sh

#### docker-compose-control.sh
