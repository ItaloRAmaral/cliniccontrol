<br/>

<p align="center">
  <h1 align="center"> - Clinic Core Domain -</h3>

  <p align="center">
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

In this project, Clinic entity is a fundamental component that plays a pivotal role in managing information about clinics where psychologists can work and serve patients, including scheduling appointments. The Clinic entity is organized within a structured folder in the codebase, which includes subfolders for entities, repositories, and use cases. This structure adheres to Clean Architecture principles, ensuring modularity and maintainability.

## **Summary**

The "Clinic" entity folder contains key components organized in a structured manner to handle the creation, retrieval, updating, and deletion of clinics. This folder adheres to Clean Architecture and NestJS conventions to maintain a separation of concerns and improve the maintainability of the codebase.

### **Folder Structure**

1. **Entity**: This subfolder defines the core structure of the "Clinic" entity. It includes the definition of the "Clinic" entity class itself, as a class. The entity class represents the primary data structure for clinics, encapsulating essential attributes such as the clinic's name, location, contact information, and potentially other relevant details.
2. **DTOs (Data Transfer Objects)**: Contains DTOs that facilitate the communication between different layers of the application, helping to maintain a clear separation of concerns.
3. **Repositories**: The Repositories subfolder contains both a database repository and an in-memory database repository for clinics. These repositories serve as the interface between the application's business logic and the data storage layer. The database repository define the abstract methods, while the in-memory repository is used for testing and prototyping purposes, storing clinic data in memory rather than in a persistent database, using the same methods set in database repository.
4. **Use Cases**: Houses use cases that encapsulate the business logic for creating clinics, updating clinic information, and deleting clinics.

## **Entities**

The **Entities** subfolder primarily defines the **`Clinic`** class. In Clean Architecture, entities represent the core data structures of the application and are typically free from any framework-specific code. The **`Clinic`** entity encapsulates essential attributes and behavior related to clinics, such as the clinic's name, location, contact information, and associated psychologists and patients.

## **DTOs (Data Transfer Objects)**

The **DTOs** subfolder is dedicated to Data Transfer Objects, which are used for exchanging data between different layers of the application, such as controllers, use cases, and repositories. The primary purpose of using DTOs is to decouple the internal representation of data from its external representation, enhancing flexibility and maintainability. In a practical way, DTO will define the types of the entity’s attributes.

## **Repositories**

### Database **Repository**

The **`ClinicDatabaseRepository`** abstract class serves as an interface between the application's business logic and the database layer, specifically for managing clinic-related data. This repository defines a set of abstract methods that outline the database operations related to clinics. These methods include creating new clinic records, retrieving a list of clinics, searching for clinics by name or unique identifier, updating clinic information, and deleting clinics. By providing these abstract methods, the class establishes a contract that any concrete repository implementing this interface must adhere to. This abstraction allows you to switch between different types of databases or storage mechanisms while maintaining a consistent interface for the application's clinic-related database operations. Additionally, it promotes the separation of concerns by isolating database-specific code from the rest of the application's logic, aligning with Clean Architecture principles.

### Database **In-Memory Repository**

The **`InMemoryClinicDatabaseRepository`** class serves as an in-memory implementation of the **`ClinicDatabaseRepository`** interface, designed to manage clinic-related data within the application. The **In-Memory Repository** offers an alternative storage mechanism for clinic data. It is particularly useful for testing and prototyping purposes, as it stores data in memory instead of a persistent database. This repository can be easily swapped with the regular repository, thanks to Clean Architecture's dependency inversion principle.

## **Use Cases**

The **Use Cases** subfolder contains a set of use cases that encapsulate the business logic related to clinics. Each use case corresponds to a specific operation:

- **Create Clinic**: Handles the creation of new clinics, enforcing business rules and validation.
- **Update Clinic**: Manages updates to clinic information, ensuring data consistency and adherence to business rules.
- **Delete Clinic**: Provides functionality for deleting clinics while handling any associated side-effects or constraints.

These use cases represent the core functionalities of the application, following the Clean Architecture principle of separating business logic from the infrastructure and frameworks.

In each use-case folder, there are three files: dto.ts, service.ts and spec.ts:

- **dto.ts:** This DTO class defines the structure of the data that should be provided when creating or updating a clinic, according to the use case. The class utilizes decorators from the **`class-validator`** library to define validation rules for each property within the DTO. These rules ensure that the incoming data meets specific criteria, such as data types and optional fields. It ensures that the incoming data adheres to specific criteria and data types, maintaining data integrity during the clinic creation process. These DTOs help maintain a clear separation of concerns in the application, facilitating data transfer between different layers and components.
- **service.ts:** The **`ClinicServices`** classes, located in the **`use-cases`** module, are service classes responsible for handling the creation, updation or deletion of a new clinic entity within the application. It encapsulates the business logic for the CRUD methods for clinics within the application. It validates input data, checks for the uniqueness of clinic names, and interacts with the database repository to store a new clinic, for example. The class is annotated with **`@Injectable()`**, indicating that it can be injected with dependencies. It takes an instance of the **`ClinicDatabaseRepository`** as a constructor parameter. This dependency injection ensures that the service has access to the repository required for database operations related to clinics.
