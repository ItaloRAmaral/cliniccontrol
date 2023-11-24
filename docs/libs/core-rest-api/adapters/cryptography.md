<br/>
<p align="center">
  <h1 align="center"> - Cryptography Module -</h3>

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

### Overview

The Cryptography Module in the ClinicControl application is dedicated to handling encryption-related functionalities. It centralizes the logic for encrypting data, ensuring a secure and consistent approach across the application. This module primarily provides an implementation for token encryption using JWT (JSON Web Tokens).

#### CryptographyModule

- Configuration: Defines the module's providers and exports.
- Providers: Specifies JwtEncrypter as the implementation for the Encrypter interface.
- Exports: Makes the Encrypter interface available to other modules, allowing them to use the encryption functionality without being tightly coupled to a specific implementation.

#### JwtEncrypter

- **Nature:** An injectable class implementing the Encrypter interface.
- **Dependencies:** Relies on NestJS's JwtService for handling JWT operations.
- **Method:**
  - **encrypt(payload: Record<string, unknown>):Promise< string>:** Accepts a payload and returns a promise that resolves to an encrypted JWT string. It utilizes JwtService.signAsync() to asynchronously sign the payload.

### Usage and Examples

#### Encrypter Interface:

Used throughout the application wherever encryption is needed. By relying on the interface, the application remains flexible, allowing for easy changes or upgrades to the encryption method in the future.

#### JwtEncrypter Implementation:

Specific implementation of the Encrypter interface, using JWT for encryption.

Usage:

```ts
// Inject the Encrypter interface
constructor(private encrypter: Encrypter) {}

// Encrypt a payload
const token = await this.encrypter.encrypt({ id: 1, role: 'psychologist' });
```

The Cryptography Module's design follows the principle of dependency inversion, promoting loose coupling and high cohesion. By abstracting the encryption logic behind an interface and providing a JWT-based implementation, it ensures that encryption within the ClinicControl application is secure, maintainable, and adaptable to future changes or enhancements in encryption methodologies.
