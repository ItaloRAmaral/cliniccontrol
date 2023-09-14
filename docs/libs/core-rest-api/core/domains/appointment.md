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

This documentation provides an overview of the "Appointment" entity folder within the core module of the project, following the principles of Clean Architecture. The Appointment entity folder plays a crucial role in managing appointments of patients in a clinic. It encompasses various components, each serving specific purposes to ensure maintainability and flexibility in the application.

## **Summary**

The "Appointment" entity folder contains key components organized in a structured manner to handle the creation, retrieval, updating, and deletion of appointments. This folder adheres to Clean Architecture and NestJS conventions to maintain a separation of concerns and improve the codebase maintainability.

### **Folder Structure**

1. **Entity**: Defines the Appointment entity class, which represents the fundamental data structure for appointments.
2. **DTOs (Data Transfer Objects)**: Contains DTOs that facilitate the communication between different layers of the application, helping to maintain a clear separation of concerns.
3. **Repositories**: Contains both database repository and database in-memory repository, providing different data storage options for appointments.
4. **Use Cases**: Houses use cases that encapsulate the business logic for creating single appointments, updating appointment dates, updating appointment information and deleting single appointments.

Let's delve into each of these components in more detail:

## **Entities**

The **Entities** subfolder primarily defines the **`Appointment`** class. In Clean Architecture, entities represent the core data structures of the application and are typically free from any framework-specific code. The **`Appointment`** entity encapsulates the essential attributes and behavior related to an appointment, such as patient details, psychologist, date, time, and others. In Entity all the getters and setters are defined.

## **DTOs (Data Transfer Objects)**

The **DTOs** subfolder is dedicated to Data Transfer Objects, which are used for exchanging data between different applications’ layers, such as controllers, use cases, and repositories. The primary purpose of using DTOs is to decouple the internal representation of data from its external representation, enhancing flexibility and maintainability. In a practical way, DTO will define the types of the entity’s attributes.

## **Repositories**

### Database **Repository**

The **`AppointmentDatabaseRepository`** abstract class serves as an interface between application business logic and the database layer. It defines a set of abstract methods that outline the database operations related to appointments. These methods include creating a single appointment, finding an appointment by date or ID, retrieving a list of appointments, updating appointment information and date, and deleting a single appointment. By
