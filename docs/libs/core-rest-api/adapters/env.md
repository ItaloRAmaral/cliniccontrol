<br/>
<p align="center">
  <h1 align="center"> - Env Module -</h3>
  Unveiling the Environment Setup for the Clinic Control Project: A Guide to Configuring and Managing Essential Environmental Variables

  <p align="center">
  <br/>
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

### Overview

The **_env module_** in our NestJs application is crucial for managing environment variables. It leverages zod, a TypeScript-first schema declaration and validation library, to ensure that the environment variables our application depends on are correctly defined and conform to expected formats and types. This module is essential for both the security and proper functioning of our application.

### Detailed Explanation: _envSchema_

The envSchema object is where we define the shape and rules for our environment variables.

Here's a breakdown of its structure:

##### Application Configuration

- NODE_ENV: Defines the environment in which the application is running. Defaults to 'development'.
- PORT: Specifies the port number on which the application will run. If not provided, it defaults to 3333.

##### Authentication

- JWT_PRIVATE_KEY: A non-empty string required for JWT authentication. It is the private key used for signing JWT tokens.
- JWT_PUBLIC_KEY: Similar to JWT_PRIVATE_KEY, this is a non-empty string representing the public key for verifying JWT tokens.

##### Database Configuration

- POSTGRES_USER: Username for PostgreSQL database connection. Must be a non-empty string.
- POSTGRES_PASSWORD: Password for the PostgreSQL user. It's a required string.
- POSTGRES_DB: The name of the PostgreSQL database to connect to. Cannot be empty.
- POSTGRES_HOST: The host address of the PostgreSQL database.
- POSTGRES_PORT: The port on which the PostgreSQL database is running. Defaults to 5432 if not specified.
- POSTGRES_SCHEMA: Specifies the database schema to be used. It is a required non-empty string.

Each of these variables is defined using zod methods that enforce specific types and validation rules (like **z.string().min(1)** for non-empty strings).

Optional variables are handled with .optional(), and defaults are set using .default(value).

### Env Type

`export type Env = z.infer<typeof envSchema>`

This line creates a TypeScript type Env based on our envSchema. This allows us to utilize TypeScript's static type checking on our environment variables, ensuring that we access and use these variables correctly throughout our application.

### Env Module

The EnvModule is a NestJS module that provides the Env type and the envSchema object to the rest of our application. It also provides a method for validating the environment variables against the schema.

### Env Service

The EnvService is a NestJS service that provides access to the validated environment variables. It also provides a method for retrieving a specific environment variable.

### Env Module Usage

The EnvModule is imported into the ApiModule, which makes the EnvService available to the rest of the application.

The EnvModule is imported into the ApiModule, which uses it to retrieve the application configuration variables.

The EnvService is also injected into the AuthModule, which uses it to retrieve the JWT configuration variables.
