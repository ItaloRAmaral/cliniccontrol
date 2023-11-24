<br/>
<p align="center">
  <h1 align="center"> - Database -</h3>

  <p align="center">
    <a href="https://github.com/ItaloRAmaral/cliniccontrol/tree/main/docs"><strong><< Index</strong></a>
    -
    <a href="https://github.com/italoRAmaral/cliniccontrol/issues">Report Bug</a>
    -
    <a href="https://github.com/italoRAmaral/cliniccontrol/issues">Request Feature</a>
    -
    <a href="https://github.com/ItaloRAmaral/cliniccontrol">Home</a>
  </p>
</p>

---

## Overview

The Database Module in the ClinicControl application serves as the foundation for interacting with the PostgreSQL database using Prisma ORM. This module includes the ORM service, mappers for data transformation, and repositories for domain-specific data operations.

### Components of the Database Module

#### PostgreSqlPrismaOrmService

- **Nature:** An injectable service extending PrismaClient, integrating Prisma ORM for database interactions.
- **Lifecycle Hooks:** Implements OnModuleInit and OnModuleDestroy to manage database connections during the lifecycle of the module.
- **Methods**:
  - **onModuleInit()**: Establishes the database connection.
  - **onModuleDestroy()**: Closes the database connection.

#### Mappers (Data Transformation)

- **Purpose:** Converts data between the database layer (Prisma DTOs) and the domain layer (Entities).
- **Methods**:
  - **toDomain()**: Transforms Prisma DTOs to Domain Entities.
  - **toDomainMany()**: Transforms an array of Prisma DTOs to Domain Entities.
  - **toPrismaCreate()**: Prepares data for creating new records in the database.
  - **toPrismaUpdate()**: Prepares data for updating existing records.

#### Repositories (Domain-Specific Data Operations)

- **Role:** Implements domain-specific database operations using Prisma.
- **Key Operations:**
  - Creating, updating, finding, and deleting records.
  - Handling domain-specific logic and exceptions.

### Database Repositories Module

- **Configuration:** The module configures and exports the ORM service and repositories.
- **Providers:** Includes PostgreSqlPrismaOrmService and specific repositories for psychologists, clinics, appointments, patients.
- **Exports:** Makes the ORM service and repositories available for use in other modules.

### Usage and Examples

##### ORM Service:

- Used internally by repositories to perform database operations.
- Handles connection management with the database.

##### Mappers:

- Utilized within repositories to transform data between layers.
- Example: PostgresqlPrismaClinicMapper.toDomain(rawClinicData) transforms raw clinic data from Prisma to a ClinicEntity.

##### Repositories:

- Provide an abstraction over database operations.
- Example: PostgresqlPrismaOrmPsychologistRepository.createPsychologist(newPsychologistData) creates a new psychologist record in the database.

The Database Module in ClinicControl is a well-structured solution for managing database interactions, offering a clear separation between the ORM, data transformation logic, and domain-specific operations. This design enhances maintainability, clarity, and scalability of the application's data layer.
