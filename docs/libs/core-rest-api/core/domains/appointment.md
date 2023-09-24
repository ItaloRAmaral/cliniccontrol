<br/>

<p align="center">
  <h1 align="center"> - Appointment Core Domain -</h3>

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

This documentation provides an overview of the **Appointment** entity folder within the core module of the project, following the principles of Clean Architecture. The **Appointment** entity folder plays a crucial role in managing appointments of patients in a clinic. It encompasses various components, each serving specific purposes to ensure maintainability and flexibility in the application.

## **Summary**

The **Appointment** entity folder contains key components organized in a structured manner to handle the creation, retrieval, updating, and deletion of appointments. This folder adheres to Clean Architecture and NestJS conventions to maintain a separation of concerns and improve the codebase maintainability.

### **Folder Structure**

1. **Entity**: Defines the **Appointment** entity class, which represents the fundamental data structure for appointments.
2. **DTOs (Data Transfer Objects)**: Contains DTOs that facilitate the communication between different layers of the application, helping to maintain a clear separation of concerns.
3. **Repositories**: Contains both database repository and database in-memory repository, providing different data storage options for appointments.
4. **Use Cases**: Houses use cases that encapsulate the business logic for creating single appointments, updating appointment dates, updating appointment information, and deleting single appointments.

Let's delve into each of these components in more detail:

## **Entities**

The **Entities** subfolder primarily defines the **`Appointment`** class. In Clean Architecture, entities represent the core data structures of the application and are typically free from any framework-specific code. The **`Appointment`** entity encapsulates the essential attributes and behavior related to an appointment, such as patient details, psychologist, date, time, and others. In Entity all the getters and setters are defined.

## **DTOs (Data Transfer Objects)**

The **DTOs** subfolder is dedicated to Data Transfer Objects, which are used for exchanging data between different applications’ layers, such as controllers, use cases, and repositories. The primary purpose of using DTOs is to decouple the internal representation of data from its external representation, enhancing flexibility and maintainability. In a practical way, DTO will define the types of the entity’s attributes.

## **Repositories**

### Database **Repository**

The **`AppointmentDatabaseRepository`** abstract class serves as an interface between application business logic and the database layer. It defines a set of abstract methods that outline the database operations related to appointments. These methods include creating a single appointment, finding an appointment by date or ID, retrieving a list of appointments, updating appointment information and date, and deleting a single appointment. By providing these abstract methods, the class establishes a contract that any concrete repository implementing this interface must adhere to. This abstraction allows you to switch between different types of databases or storage mechanisms while maintaining a consistent interface for the application's appointment-related database operations. Additionally, it promotes separation of concerns by isolating database-specific code from the rest of the application's logic, aligning with Clean Architecture principles.

### Database **In-Memory Repository**

The **`InMemoryAppointmentDatabaseRepository`** class is responsible for providing an in-memory implementation of the **`AppointmentDatabaseRepository`** interface. This class serves as a repository for appointment-related data and allows the application to interact with appointment records stored in memory rather than a traditional database. It is particularly useful for testing and prototyping purposes, as it stores data in memory instead of a persistent database. This repository can be easily swapped with the regular repository, thanks to Clean Architecture's dependency inversion principle.

## **Use Cases**

The **Use Cases** subfolder contains a set of use cases that encapsulate the business logic related to appointments. Each use case corresponds to a specific operation:

- **Create Single Appointment**: Handles the creation of new appointments, enforcing business rules and validation.
- **Update Appointment Date**: Manages updates to appointment dates, ensuring data consistency and adherence to business rules.
- **Update Appointment Info**: Facilitates updates to other appointment information (excluding date), maintaining data integrity and validation.
- **Delete Single Appointment**: Provides functionality for deleting appointments while handling any associated side-effects or constraints.

These use cases represent the core functionalities of the application, following the Clean Architecture principle of separating business logic from the infrastructure and frameworks.

In each use-case folder, there are three files: **dto.ts**, **service.ts**, and **spec.ts**:

- **dto.ts:** In summary, the **`<use-case>Dto`** class defines the structure of data that should be provided when creating, reading, and updating an appointment, according to each existent use-case. It uses decorators like **`@IsString()`**, **`@IsDate()`**, **`@IsBoolean()`**, and **`@IsString()`** to enforce type and validation constraints on the incoming data, ensuring that it meets the expected format and data types required for create/read/update a valid appointment. This DTO class helps maintain a clear separation of concerns between different parts of the application and ensures data integrity during the appointment interaction by use cases process.

- **service.ts:** The **`AppointmentServices`** classes are service classes responsible for handling the appointment CRUD operations. Each **`AppointmentService`** class encapsulates the business logic for creating (or reading, update and delete) single appointments. It validates input data, checks for conflicts, and interacts with the database repository to store the new appointment or to modify one. This service class adheres to the principles of dependency injection and encapsulation, making it a modular and testable component of the application's use cases.

- **spec.ts:** The **`<use-case>.spec.ts`** file contains test cases and describes the behavior of the corresponding**`AppointmentService`** class. Before running the tests, a fake appointment object (**`fakeAppointment`**) is defined. This object represents data that will be used for testing the creation of a new appointment, for example (or new data to update an existing appointment). It includes various properties such as **`psychologistId`**, **`patientId`**, **`date`**, **`online`**, **`clinicId`**, **`confirmed`**, **`confirmationDate`**, **`cancelled`**, and **`paymentMethod`**. The **`beforeEach`** block is executed before each individual test case within the suite. It sets up the testing environment by creating a testing module using **`Test.createTestingModule`**. It also initializes instances of the **`AppointmentService`** and **`AppointmentDatabaseRepository`** classes. This type of test file is responsible for validating the behavior of the **`AppointmentService`** class, defined in the same folder as the test. It tests both the successful creation/ update/ deletion of appointments and the handling of appointment conflicts, ensuring that the service behaves as expected and maintains data integrity. These tests are crucial for verifying that the appointment CRUD processes functions correctly and for catching any potential issues in the service's logic.
