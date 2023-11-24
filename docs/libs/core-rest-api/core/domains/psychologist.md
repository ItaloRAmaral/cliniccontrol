<br/>

<p align="center">
  <h1 align="center"> - Psychologist Core Domain -</h3>
  Exploring the Psychologist Core Domain in the Clinic Control Project: A Detailed Guide to the Architecture and Logic of Psychologist Management

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

This documentation provides an overview of the **Psychologist** entity folder within the core module of the project, following the principles of Clean Architecture. The **Psychologist** entity folder is integral to managing information about **psychologists**, including their **qualifications** and **availability**, and encompasses various components, each serving specific purposes to ensure **maintainability** and **flexibility** in the application.

## **Summary**

The **Psychologist** entity folder contains key components organized in a structured manner to handle the creation, retrieval, updating, and deletion of **psychologist** records. This folder adheres to Clean Architecture and NestJS conventions to maintain a separation of concerns and improve the **maintainability** of the codebase.

### **Folder Structure**

1. **Entity**: Defines the **Psychologist** entity class, which represents the fundamental data structure for **psychologist** records.
2. **DTOs (Data Transfer Objects)**: Contains DTOs that facilitate the communication between different layers of the application, helping to maintain a clear separation of concerns.
3. **Repositories**: Contains both database repository and in-memory database repository, providing different data storage options for **psychologist** information.
4. **Use Cases**: Houses use cases that encapsulate the business logic for creating **psychologists**, updating **psychologist** information, and deleting **psychologists**.

## **Entities**

The **Entities** subfolder primarily defines the **`Psychologist`** class. In Clean Architecture, **entities** represent the core data structures of the application and are typically free from any framework-specific code. The **`Psychologist`** entity encapsulates essential attributes and behavior related to **psychologists**, such as personal details, **qualifications**, and **availability**.

## **DTOs (Data Transfer Objects)**

The **DTOs** subfolder is dedicated to Data Transfer Objects, which are used for exchanging data between different layers of the application, such as controllers, use cases, and repositories. The primary purpose of using DTOs is to decouple the internal representation of data from its external representation, enhancing **flexibility** and **maintainability**. In a practical way, DTO will define the types of the **psychologist** attributes.

## **Repositories**

### Database **Repository**

The **`PsychologistDatabaseRepository`** abstract class serves as an interface between application business logic and the database layer. It defines a set of abstract methods that outline the database operations related to **psychologists**. These methods include creating a **psychologist**, finding a **psychologist** that’s already registered in db using the id or email, retrieving a list of **psychologists**, updating **psychologist** information, and deleting a **psychologist**. By providing these abstract methods, the class establishes a contract that any concrete repository implementing this interface must adhere to. This abstraction allows you to switch between different types of databases or storage mechanisms while maintaining a consistent interface for the application's **psychologist**-related database operations. Additionally, it promotes separation of concerns by isolating database-specific code from the rest of application's logic, aligning with Clean Architecture principles.

### **In-Memory Repository**

The **`InMemoryPsychologistDatabaseRepository`** class is responsible for providing an in-memory implementation of the **`PsychologistDatabaseRepository`** interface. This class serves as a repository for **psychologist**-related data and allows the application to interact with **psychologist** records stored in memory rather than a traditional database. It is particularly useful for testing and prototyping purposes, as it stores data in memory instead of a persistent database. This repository can be easily swapped with the regular repository, thanks to Clean Architecture's dependency inversion principle.

## **Use Cases**

The **Use Cases** subfolder contains a set of use cases that encapsulate the business logic related to **psychologists**. Each use case corresponds to a specific operation:

- **Create **Psychologist\***\*: Handles the creation of new **psychologist\*\* records, enforcing business rules and validation.
- **Update **Psychologist\***\*: Manages updates to **psychologist\*\* information, ensuring data consistency and adherence to business rules.
- **Delete **Psychologist\***\*: Provides functionality for deleting **psychologist\*\* records while handling any associated side-effects or constraints.

These use cases represent the core functionalities of the application, following the Clean Architecture principle of separating business logic from the infrastructure and frameworks.

In each use-case folder, there are three files: **dto.ts**, **service.ts**, and **spec.ts**:

- **dto.ts:** In summary, the **`<use-case>Dto`** class defines the structure of data that should be provided when creating, reading, and updating a **psychologist**, according to each existent use-case. It uses decorators like **`@IsString()`**, **`@IsNumber()`**, and **`@IsOptional()`** to enforce type and validation constraints on the incoming data, ensuring that it meets the expected format and data types required for create/read/update a valid **psychologist**. This DTO class helps maintain a clear separation of concerns between different parts of the application and ensures data integrity during the **psychologist** interaction by use cases process.

- **service.ts:** The **`PsychologistServices`** classes are service classes responsible for handling the **psychologist** CRUD operations. Each **`PsychologistService`** class encapsulates the business logic for creating (or reading, update and delete) single **psychologists**. It validates input data, checks for conflicts, and interacts with the database repository to store the new **psychologist** or to modify one. This service class adheres to the principles of dependency injection and encapsulation, making it a modular and testable component of the application's use cases.

- **spec.ts:** The **`<use-case>.spec.ts`** file contains test cases and describes the behavior of the corresponding**`PsychologistService`** class. Before running the tests, a fake **psychologist** object (**`fakePsychologist`**) is defined. This object represents data that will be used for testing the creation of a new **psychologist**, for example (or new data to update an existing **psychologist**). It includes various properties such as **`Name`**, **`Email`**, **`Password`**, **`Role`**, and **`Plan`**. The **`beforeEach`** block is executed before each individual test case within the suite. It sets up the testing environment by creating a testing module using **`Test.createTestingModule`**. It also initializes instances of the **`PsychologistService`** and **`PsychologistDatabaseRepository`** classes. This type of test file is responsible for validating the behavior of the **`PsychologistService`** class, defined in the same folder as the test. It tests both the successful creation/update/deletion of **psychologists** and the handling of **psychologist** conflicts, ensuring that the service behaves as expected and maintains data integrity. These tests are crucial for verifying that the **psychologist** CRUD processes functions correctly and for catching any potential issues in the service's logic.
