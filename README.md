<br/>
<p align="center">
  <!-- <a href="https://github.com/italoRAmaral/cliniccontrol">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

  <h1 align="center">Clinic Control</h3>

  <p align="center">
    Effortlessly manage your schedule, track costs, and monitor earnings - initially made for psychologists
    <br/>
    <br/>
    <a href="https://github.com/ItaloRAmaral/cliniccontrol/tree/main/docs"><strong>Explore the docs</strong></a>
    -
    <a href="https://github.com/italoRAmaral/cliniccontrol/issues">Report Bug</a>
    -
    <a href="https://github.com/italoRAmaral/cliniccontrol/issues">Request Feature</a>
  </p>
</p>

<div align="center">

![Issues](https://img.shields.io/github/issues/italoRAmaral/cliniccontrol) ![Contributors](https://img.shields.io/github/contributors/italoRAmaral/cliniccontrol?color=dark-green) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ItaloRAmaral_cliniccontrol&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ItaloRAmaral_cliniccontrol) [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=ItaloRAmaral_cliniccontrol&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=ItaloRAmaral_cliniccontrol) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=ItaloRAmaral_cliniccontrol&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=ItaloRAmaral_cliniccontrol) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=ItaloRAmaral_cliniccontrol&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=ItaloRAmaral_cliniccontrol) [![GitHub release](https://img.shields.io/github/release/italoRAmaral/cliniccontrol?include_prereleases=&sort=semver&color=green)](https://github.com/italoRAmaral/cliniccontrol/releases/) [![GitHub tag](https://img.shields.io/github/tag/italoRAmaral/cliniccontrol?include_prereleases=&sort=semver&color=green)](https://github.com/italoRAmaral/cliniccontrol/releases/)

</div>

## 📋 Table Of Contents

- [📖 About the Project](#about-the-project)
  - [✨ Features](#features)
  - [🏗️ Project Structure](#project-structure)
    - [📚 Definitions](#definitions)
  - [🛠️ Built With](#built-with)
- [🚀 Getting Started](#getting-started)
  - [🔧 Prerequisites](#prerequisites)
  - [⚙️ Installation](#installation)
- [▶️ Usage](#usage)
- [🗺️ Roadmap](#roadmap)
<!-- - [🤝 Contributing](#contributing)
- [📜 License](#license) -->
- [👥 Authors](#authors)
- [📝 Acknowledgements](#acknowledgements)

<h2 id="about-the-project">📖 About The Project</h2>

<!-- ![Screen Shot](images/screenshot.png) -->

In the fast-paced and demanding field of psychology, professionals need an effective way to manage their practices without getting bogged down by administrative tasks. Our project aims to simplify and streamline these processes so that psychologists can focus more on what really matters: their patients.

<h3 id="features">✨ Features</h3>

- <b>⏳- Schedule Management:</b> Easily schedule appointments, set reminders, and automate cancellations to manage your time efficiently.
- <b>⏳- Cost Tracking:</b> Accurately record and analyze costs such as rent, utilities, and supplies, to get a clear picture of your overhead expenses.
- <b>⏳- Earnings Monitoring:</b> Keep track of payments, generate invoices, and visualize your income over various time frames to understand your financial health.
- <b>⏳- Client Management:</b> Safely store client information, treatment plans, and session notes in one centralized, secure database.
- <b>⏳- Data Visualization:</b> Use intuitive graphs and charts to understand your practice's performance metrics, like client retention, earnings, and more.
- <b>⏳- User-Friendly Interface:</b> Designed with user experience in mind, making it easy for anyone to use, even with little to no technical expertise.

<h3 id="project-structure">🏗️ Project Structure</h3>

```
cliniccontrol
├── apps
│   ├── core-rest-api-service
│   └── (...)
│
├── docs
│
├── libs
│   ├── core-rest-api
│   │   └── src
│   │       ├── core
│   │       └── adapters
│   │
│   └── (...)
│
├── scripts
│
(...)
```

We have chosen to use a monorepo structure for this project, which allows us to manage all of our code in a single repository. This makes it easier to share code between different applications, and also allows us to use powerful development tools like [Nx Console](https://nx.dev/latest/react/getting-started/console).

Along with the monorepo structure, we have also chosen to use [Hexagonal Architecture](https://github.com/Sairyss/domain-driven-hexagon), which separates the core logic of the application from the services that it uses, making the system more maintainable, scalable, and testable.

<h3 id="definitions">📚 Definitions</h3>

### Apps

`apps/core-rest-api-service/`

This directory houses the RESTful API service. It is where we define the entry point of our application, and where we can configure the server and database connections.

### Docs

`docs/`

This directory houses all of the documentation for the project. It is where we can find the project's requirements, design documents, and other important information.

### Libraries

`libs/core-rest-api/src/core/`

This directory houses the domain-specific logic, business rules, and use-cases of the service. It serves as the heart of your application, designed to be both extensible and insulated from outside changes. Files and modules within this folder dictate the 'what' and 'why' but not the 'how' of our service.

`libs/core-rest-api/src/adapters/`

Here you will find various adapters that act as the bridge between your core business logic and external services or databases. Whether it's a database driver, third-party API, or other kinds of service integrations, this folder enables seamless connectivity without affecting the core domain logic.

<h3 id="built-with">🛠️ Built With</h3>

This project leverages a robust and modern tech stack to deliver a fast, secure, and scalable solution. Below are some of the key technologies, frameworks, and architectures we've used:

##### Architecture

- <b>Hexagonal Architecture:</b> This architecture separates the core logic of the application from the services that it uses, making the system more maintainable, scalable, and testable.

##### Monorepo Management

- [Nx Workspace:](https://nx.dev) Utilized for efficient monorepo management, Nx Workspace allows for optimized builds, code sharing, and powerful development tools.

##### Frontend

- [Vite:](https://vitejs.dev/guide/) A build tool and development server that serves as the backbone for our frontend, offering fast development and build times.
- [ReactJS:](https://react.dev) Employed for building a dynamic and interactive UI, React allows for efficient data rendering and state management.

##### Backend

- [NestJS:](https://nestjs.com) A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.

<h2 id="getting-started">🚀 Getting Started</h2>

_under development_

<h3 id="prerequisites">🔧 Prerequisites</h3>

In order to run the application the following should have been installed on your local machine:

- [Docker Engine](https://docs.docker.com/engine/)
- [Docker Compose](https://docs.docker.com/compose/)
- [NodeJS](https://nodejs.org/en/)
- [pnpm](https://pnpm.io/)

#### We Recommend

- [Nx Console Plugin](https://nx.dev/latest/react/getting-started/console)
- [Code Spell Plugin](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- [Excalidraw Plugin](https://marketplace.visualstudio.com/items?itemName=ViktorQvarfordt.vscode-excalidraw)
- [Docker Plugin](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)

### Installation

<h3 id="installation">⚙️ Installation</h3>

- Fork this repository
- Clone the forked repository to your local machine
- Run `pnpm install` to install all dependencies

### Project Setup

<h3 id=""></h3>

- Run `pnpm run env:setup` to create the `.env` file and set the environment variables
- To create `JWT_PRIVATE_KEY` and `JWT_PUBLIC_KEY` follow the steps below:

  - Run the following commands to generate **_private_** and **_public_** keys:

  ```bash
  openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
  openssl rsa -pubout -in private_key.pem -out public_key.pem
  ```

  - Run the following commands to generate **_private_** and **_public_** keys in base64:

  ```bash
  base64 -i private_key.pem > private_key-base64.txt
  base64 -i public_key.pem > public_key-base64.txt
  ```

  - Copy the private key in base64 and paste it in the `.env` file as the value of `JWT_PRIVATE_KEY`
  - Copy the public key and paste it in the `.env` file as the value of `JWT_PUBLIC_KEY`

- To setup `core-rest-api service` containers and database, follow the steps below:

```bash
  pnpm run core-setup --action=migrate,generate   # setup docker container and run migrations and generate prisma client

  pnpm exec nx run core-rest-api:serve   # start the core-rest-api service in development mode
```

###### For more information about scripts and commands, please checkout to the [scripts]()

<h2 id="usage">▶️ Usage</h2>

_under development_

<h2 id="roadmap"> 🗺️ Roadmap</h2>

See the [open issues](https://github.com/italoRAmaral/cliniccontrol/issues) for a list of proposed features (and known issues).

<!-- ## Contributing

_under development_

### Creating A Pull Request

_under development_ -->

<!-- ## License

Distributed under the MIT License. See [LICENSE](https://github.com/italoRAmaral/cliniccontrol/blob/main/LICENSE.md) for more information. -->

<h2 id="authors">👥 Authors</h2>

- **[Italo Amaral](https://github.com/italoRAmaral)** - _FullStack Developer_ - _Owner_
- **[Luana Vefago](https://github.com/luanavfg)** - _FullStack Developer_ - _Owner_
- **[Aline Crestani](https://www.linkedin.com/in/aline-crestani/)** - _Designer & UX/UI_ - _Owner_

<h2 id="acknowledgements">📝 Acknowledgements/References</h2>

- [ImgShields](https://shields.io/)
- [Explore](https://github.com/amaralc/explore)
- [DDD Hexagonal CQRS ES EDA](https://github.com/bitloops/ddd-hexagonal-cqrs-es-eda)
- [Domain Driven Hexagon](https://github.com/Sairyss/domain-driven-hexagon)
