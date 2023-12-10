<br/>

<p align="center">
  <h1 align="center"> - Patient Core Domain -</h3>
  A Comprehensive Overview of the Patient Core Domain in Clinic Control Project: Deep Dive into Patient Management and Data Structure

  <p align="center">
    <br/>
    <a href="https://github.com/ItaloRAmaral/cliniccontrol/tree/main/docs"><strong><< Index</strong></a>
    -
    <a href="https://github.com/ItaloRAmaral/cliniccontrol/tree/main/docs/libs/core-rest-api/core">Core Docs</a>
    -
    <a href="https://github.com/ItaloRAmaral/cliniccontrol/tree/main/docs/libs/core-rest-api/adapters">Adapters Docs</a>
  </p>
</p>

---

This documentation provides an overview of the **Patient** entity folder within the core module of the TypeScript and NestJS-based project, following the principles of Clean Architecture. The **Patient** entity folder is central to managing patient information, including appointments, and encompasses various components, each serving specific purposes to ensure maintainability and flexibility in the application.

## **Summary**

The **Patient** domain folder contains key components organized in a structured manner to handle the creation, retrieval, updating, and deletion of patient records. This folder adheres to Clean Architecture and NestJS conventions to maintain a separation of concerns and improve the maintainability of the codebase.

### **Folder Structure**

1. **Entities**: Defines the **Patient** entity class, which represents the fundamental data structure for patient records.
2. **DTOs (Data Transfer Objects)**: Contains DTOs that facilitate the communication between different layers of the application, helping to maintain a clear separation of concerns.
3. **Repositories**: Contains both database repository and in-memory database repository, providing different data storage options for patient information.
4. **Use Cases**: Houses use cases that encapsulate the business logic for creating patients, updating patient information, and deleting patients.

## **Entities**

The **Entities** subfolder primarily defines the **`Patient`** class. In Clean Architecture, entities represent the core data structures of the application and are typically free from any framework-specific code. The **`Patient`** entity encapsulates essential attributes and behavior related to patients, such as personal details and associated appointments.

## **DTOs (Data Transfer Objects)**

The **DTOs** subfolder is dedicated to Data Transfer Objects, which are used for exchanging data between different application layers, such as controllers, use cases, and repositories. The primary purpose of using DTOs is to decouple the internal representation of data from its external representation, enhancing flexibility and maintainability. In a practical way, DTO will define the types of the entity’s attributes.

## **Repositories**

### Database **Repository**

The **Regular Repository** is responsible for persisting and retrieving patient data using a traditional database or data storage system. It adheres to the repository pattern, providing an abstraction layer over data access. This separation allows you to change the underlying data storage mechanism without affecting the application's core logic. **`PatientDatabaseRepository`** serves as a contract for handling patient-related database operations. This abstract class defines a set of common database operations that can be implemented by concrete classes to interact with a patient database. It enforces a consistent interface for handling patient-related data, making it easier to maintain and extend the database functionality while ensuring adherence to a defined structure.

### Database **In-Memory Repository**

**`InMemoryPatientDatabaseRepository`** provides a basic in-memory storage and CRUD operations (Create, Read, Update, Delete) for patient data.

The **In-Memory Repository** offers an alternative storage mechanism for patient data. It is particularly useful for testing and prototyping purposes, as it stores data in memory instead of a persistent database. This repository can be easily swapped with the regular repository, thanks to Clean Architecture's dependency inversion principle. It follows the principles of dependency injection, as indicated by the **`@Injectable()`** decorator, which suggests that it's meant to be used as a service that can be injected into other parts of the application.

## **Use Cases**

The **Use Cases** subfolder contains a set of use cases that encapsulate the business logic related to patients. Each use case corresponds to a specific operation:

- **Create Patient**: Handles the creation of new patient records, enforcing business rules and validation.
- **Update Patient**: Manages updates to patient information, ensuring data consistency and adherence to business rules.
- **Delete Patient**: Provides functionality for deleting patient records while handling any associated side-effects or constraints.

These use cases represent the core functionalities of the application, following the Clean Architecture principle of separating business logic from the infrastructure and frameworks.

In each use-case folder, there are three files: **dto.ts**, **service.ts**, and **spec.ts**:

- **dto.ts:** The **`<useCase>Dto`** class defines the structure and validation rules for the data required when creating/updating or deleting a patient. It ensures that the incoming data adheres to specific criteria and data types, maintaining data integrity during the patient CRUD processes. This DTO helps facilitate the creation of patient records within the application while enforcing necessary validation checks to ensure data accuracy. It uses decorators like **`@IsString()`** and **`@IsMobilePhone()`** to enforce type and validation constraints on the incoming data, ensuring that it meets the expected format and data types required for create/read/update a valid patient.

- **service.ts:** The **`<useCase>Service`** class encapsulates the business logic for creating/updating or deleting patients within the application (according to use case). It validates input data, checks for the uniqueness of patient emails, and interacts with the database repository to store the new patient, edit an existing patient or delete data. This service class follows the principles of dependency injection and encapsulation, making it a modular and testable component of the application's use cases. It helps ensure that patients are created with valid data and that duplicate patients with the same email are prevented.

- **spec.ts:** The **`<use-case>.spec.ts`** file contains test cases and describes the behavior of the corresponding**`PatientService`** class. Before running the tests, a fake patient object (**`fakePatient`**) is defined. This object represents data that will be used for testing the creation of a new patient, for example (or new data to update an existing patient). It includes various properties such as name, email, CPF (Brazilian Individual Taxpayer Registry), phone number, payment method, psychologist ID, and clinic ID. The **`beforeEach`** block is executed before each individual test case within the suite. It sets up the testing environment by creating a testing module using **`Test.createTestingModule`**. It also initializes instances of the **`PatientService`** and **`PatientDatabaseRepository`** classes. This type of test file is responsible for validating the behavior of the **`PatientService`** class, defined in the same folder as the test. It tests both the successful creation/ update/ deletion of patients and the handling of patient conflicts, ensuring that the service behaves as expected and maintains data integrity. These tests are crucial for verifying that the patient CRUD processes functions correctly and for catching any potential issues in the service's logic.
