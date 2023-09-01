<br/>
<p align="center">
  <h2 align="center"> - Core Rest Api Library -</h3>

  <p align="center">
    The core of <strong>core-rest-api service</strong>, providing robust and flexible domain logic.
    <br/>
    <br/>
    <a href="https://github.com/ItaloRAmaral/cliniccontrol/tree/main/docs"><strong><< Index</strong></a>
    -
    <a href="https://github.com/italoRAmaral/cliniccontrol/issues">Core Docs</a>
    -
    <a href="https://github.com/italoRAmaral/cliniccontrol/issues">Adapters Docs</a>
  </p>
</p>

---

## 📌 Introduction

<p> This library provides the core of the <strong>core-rest-api service</strong>, containing the domain logic and the business rules of the application. </p>

<p> The domain logic is implemented using the <strong>Hexagonal Architecture</strong>, which separates the core logic of the application from the services that it uses, making the system more maintainable, scalable, and testable. </p>

## 🤔 Why "Core Rest API Service"?

The name core-rest-api service was chosen to emphasize its role as the central unit handling RESTful APIs that govern the core entities—psychologists, patients, appointments, and clinics of our system. It is the core of the system, the heart of the application.

## 📂 Folder Structure

`core/`

This directory houses the domain-specific logic, business rules, and use-cases of the service. It serves as the heart of your application, designed to be both extensible and insulated from outside changes. Files and modules within this folder dictate the 'what' and 'why'—but not the 'how'—of your service.

`core/domains/`

This sub-folder is the cradle of your domain-specific logic, housing business rules, entities, and use-cases. It delineates what your service does and why it does it, effectively acting as the backbone of your application.

`core/shared/`

Consider this as a utility belt for your core/domains/. Here, you'll find shared resources, helpers, or utilities that are commonly used across different domains but don't necessarily belong to any single domain.

`adapters/`

Here you will find various adapters that act as the bridge between your core business logic and external services or databases. Whether it's a database driver, third-party API, or other kinds of service integrations, this folder enables seamless connectivity without affecting the core domain logic.

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
