<br/>
<p align="center">
  <h2 align="center"> - Core Rest Api Library -</h3>

  <p align="center">
    The core of <strong>core-rest-api service</strong>, providing robust and flexible domain logic.
    <br/>
    <br/>
    <a href="https://github.com/ItaloRAmaral/cliniccontrol/tree/main/docs"><strong><< Index</strong></a>
    -
    <a href="https://github.com/ItaloRAmaral/cliniccontrol/tree/main/docs/libs/core-rest-api/core">Core Docs</a>
    -
    <a href="https://github.com/ItaloRAmaral/cliniccontrol/tree/main/docs/libs/core-rest-api/adapters">Adapters Docs</a>
  </p>
</p>

---

## 📋 Table of Contents

- 📌 [Introduction](#introduction)
- 🤔 [Why "Core Rest Api Service"?](#why-core-rest-api-service)
- 🗂️ [Folder Structure](#folder-structure)
- 📚 [Definitions](#definitions)

<h3 id="introduction">📌 Introduction</h3>

This library provides the core of the <strong>core-rest-api service</strong>, containing the domain logic and the business rules of the application.

The domain logic is implemented using the <strong>Hexagonal Architecture</strong>, which separates the core logic of the application from the services that it uses, making the system more maintainable, scalable, and testable.

<h3 id="why-core-rest-api-service">🤔 Why "Core Rest Api Service"?</h3>

The name core-rest-api service was chosen to emphasize its role as the central unit handling RESTful APIs that govern the core entities—psychologists, patients, appointments, and clinics of our system. It is the core of the system, the heart of the application.

<h3 id="folder-structure">🗂️ Folder Structure</h3>

```
core-rest-api
├── core
│   └── src
│       ├── domains
│       │   ├── domain_1
│       │   │   ├── entities
│       │   │   ├── interfaces
│       │   │   ├── repositories
│       │   │   └── use_cases
│       │   └── domain_n
│       │
│       └── shared
│           ├── errors
│           ├── interfaces
│           ├── utils
│           └── validators
│
└── adapters
    └── src
        ├── controllers
        │   └── (under development)
        │
        ├── database
        │   └── (under development)
        │
        └── events (?)
            └── (under development)
```

<h3 id="definitions">📚 Definitions</h3>

`core/`

This directory houses the domain-specific logic, business rules, and use-cases of the service. It serves as the heart of your application, designed to be both extensible and insulated from outside changes. Files and modules within this folder dictate the 'what' and 'why'—but not the 'how'—of your service.

`core/src/domains/`

This sub-folder is the cradle of your domain-specific logic, housing business rules, entities, and use-cases. It delineates what your service does and why it does it, effectively acting as the backbone of your application.

`core/src/domains/domain_1/entities`

Entities are the business objects of the application. In the context of Hexagonal Architecture, these entities contain the core business logic and rules, isolated from any external influences.

`core/src/domains/domain_1/interfaces`

This folder houses the primary ports of your application for domain_1. These ports define the contract that the core domain will expose to the outside world. Ports can be driven (API-like structures that are called by external actors) or driving (typically repositories that the core logic uses to interact with external systems).

`core/src/domains/domain_1/repositories`

In Hexagonal Architecture, repositories are often used as driving ports. This folder contains the interface definitions that the core logic will use to interact with external elements like databases or third-party services. The real implementation will reside in the adapters directory.

`core/src/domains/domain_1/use_cases`

This folder contains the use-case classes that define the specific business operations that can be performed. These use-cases will leverage entities and interact with repositories through the defined interfaces to fulfill the application's business rules.

---

`core/shared/`

Consider this as a utility belt for your core/domains/. Here, you'll find shared resources, helpers, or utilities that are commonly used across different domains but don't necessarily belong to any single domain.

`core/src/shared/errors`

This folder contains generic error classes that can be thrown by various elements of the core logic, decoupled from any external error-handling mechanisms.

`core/src/shared/interfaces`

This folder may contain interface definitions that are common to multiple domains but still focused on business logic, not on any specific external technology or protocol.

`core/src/shared/utils`

These are utility functions or classes that serve the core logic and are independent of any external technologies, protocols, or systems.

`core/src/shared/validators`

This folder contains validator classes or functions that are used within the core logic to enforce business rules and data integrity, independent of any external validation or error-handling mechanisms.

---

`adapters/`

Here you will find various adapters that act as the bridge between your core business logic and external services or databases. Whether it's a database driver, third-party API, or other kinds of service integrations, this folder enables seamless connectivity without affecting the core domain logic.

`adapters/src/controllers/`

Controllers act as driven ports in the Hexagonal Architecture. They take external HTTP requests, translate them into a format understandable by the use-cases, and invoke the appropriate business logic.

`adapters/src/database/`

This folder contains the actual implementation of your repositories, making it the adapter that plugs into your driving ports. It could include various mechanisms for accessing databases, third-party services, or other storage solutions.

`adapters/src/events (?)`

This is potentially where you could place any event-driven external interfaces or additional driven ports, like message queue handlers or WebSocket handlers, should your application require them.

<!-- ## 🎯 Objectives

- Provide a clear abstraction layer between the domain logic and the application's outer layers. In our case, handle domain logic for psychologists, patients, appointments, and clinics.
- Enable easy testability and extendability.
- Facilitate collaboration among developers by making the code more readable and maintainable.

## 💡 Why Hexagonal Architecture?

- **Isolation:** Keeps the domain logic untainted by side-effects and external dependencies. Ensures that domain logic remains clean, focused, and free from external dependencies.
- **Reusability:** Enables code reuse across various components or even different projects.
- **Testability:** Makes unit and integration testing easier with a decoupled domain logic.
- **Delimitation of boundaries and protection:** Hexagonal architecture establishes clear boundaries and protects the application's business rules. It separates the complexity of the business logic from the technical complexities, allowing developers to identify and work within defined limits.

## 📋 Primary Responsibilities

- **Business Rule Management:** Defines and enforces the rules governing the application's domain.
- **Validation:** Ensures compliance with domain requirements and constraints.
- **Layer Interaction:** Acts as the conduit between the domain logic and application or infrastructure layers, easing communication.

## 🚀 Features

- **Robust Business Rule Management:** The core-rest-api takes charge of defining and implementing domain-specific rules and logic, safeguarding the system's integrity.
- **Comprehensive Validation:** Equipped with a series of validators to confirm that operations are in line with domain policies.
- **Integration Flexibility:** Owing to its Hexagonal Architecture, the core-rest-api can be seamlessly integrated with various layers and services, be it databases, UI, or external services, without compromising the domain logic. -->
