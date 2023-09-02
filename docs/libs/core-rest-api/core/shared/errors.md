<br/>

<p align="center">
  <h1 align="center"> - Shared Errors -</h3>
  <p align="center">
  Uniform Errors Handling Across Core and Adapters
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

## 📚 Table of Contents

- [ValidationException](#ValidationException)

---

## ValidationException

#### Introduction

The **_ValidationException_** class is a custom exception designed to encapsulate validation errors that occur when object validation fails. It extends the native JavaScript Error class and is tailored for use with the class-validator library.

#### Class Signature

```ts
export class ValidationException extends Error {
  causes: Array<Pick<ValidationError, 'property' | 'value' | 'constraints'>>;

  constructor(errors: Array<ValidationError> | ValidationError, message?: string);
}
```

#### Constructor Parameters

- **errors:** This can be either a single ValidationError instance or an array of such instances. These objects provide details about what properties failed validation and how.

- **message (optional):** An optional message string that describes the validation exception. If not provided, a default message "Validation exception." will be used.

#### Properties

- **causes:** An array of objects, each containing details about the properties that failed validation. The object keys are property, value, and constraints.

#### Usage

To use this exception, you typically throw it within a try-catch block where validation occurs:

#### Example

```ts
import { IsNotEmpty, IsString, validate } from 'class-validator';
import { ValidationException } from './path-to-exception';

class User {
  @IsNotEmpty()
  @IsString()
  name: string;
}

const user = new User();
user.name = '';

try {
  const errors = await validate(user);
  if (errors.length > 0) {
    throw new ValidationException(errors, 'User validation failed');
  }
} catch (error) {
  if (error instanceof ValidationException) {
    console.log('Validation failed with message:', error.message);
    console.log('Validation causes:', error.causes);
  }
}
```

---
