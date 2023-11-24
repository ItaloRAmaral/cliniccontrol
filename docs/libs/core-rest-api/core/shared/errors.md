<br/>

<p align="center">
  <h1 align="center"> - Shared Errors -</h3>
  A Deep Dive into the Shared Error Handling Mechanisms in the Clinic Control Project: Streamlining Error Responses Across the Application
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

## 📋 Table of Contents

- [🚫 ValidationException](#validationException)
- [🌐 GlobalAppHttpException](#globalAppHttpException)
- [💬 Error-messages](#error-messages)

---

<h2 id="validationException">🚫 ValidationException</h2>

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

<h2 id="globalAppHttpException">🌐 GlobalAppHttpException</h2>

#### Introduction

The **_GlobalAppHttpException_** is designed to handle various types of exceptions in a unified manner. It extends the functionality of the native JavaScript Error handling by integrating custom logic for different types of errors, such as Prisma exceptions, validation exceptions, and HTTP exceptions.

#### Class Signature

```ts
export class GlobalAppHttpException {
  constructor(error: unknown, message?: string, status?: HttpStatus);

  bubbleUpHttpException(error: unknown, message?: string, status?: HttpStatus): void;
  bubbleUpValidationException(
    error: unknown,
    message?: string,
    status?: HttpStatus
  ): void;
  bubbleUpPrismaException(error: unknown): void;
}
```

#### Constructor Parameters

- **error:** The error object to be handled. This could be of any type, including custom exceptions.
- **message (optional):** A custom message to accompany the exception. If not provided, a default or inherited message will be used.
- **status (optional):** An optional HTTP status code that can be passed to customize the response status.

#### Methods

- **bubbleUpHttpException:** Handles instances of HttpException. It logs a warning with the message and rethrows the exception with an optional custom message and status.
- **bubbleUpValidationException:** Specifically handles instances of ValidationException. It logs the validation errors along with a warning and throws an HttpException with the validation details and a custom or default message.
- **bubbleUpPrismaException:** Catches errors specific to Prisma client operations. It processes the Prisma error message and code, and throws an HttpException with an appropriate message and status code based on the error details.

#### Usage

The **_GlobalAppHttpException_** is typically used in a catch block where various types of errors might be thrown. Depending on the type of the caught error, it appropriately processes and rethrows it as an HttpException, making it easier to manage different error types in a uniform way.

#### Example

```ts
import { GlobalAppHttpException } from './path-to-exception';

try {
  // some code that throws an exception
} catch (error) {
  // handle the exception
  throw new GlobalAppHttpException(error);
}
```

This approach streamlines the error handling process in the application, allowing for consistent and clear responses to different error scenarios.

---

<h2 id="error-messages">💬 Error-messages</h2>

#### Introduction

The **_error-messages_** plays a crucial role in maintaining a consistent and standardized approach to error messaging across different modules. This file contains predefined sets of error messages for various entities like psychologists, clinics, patients, and appointments. By centralizing these messages, we ensure uniformity and clarity in our application's responses to various error scenarios.

### Utilizing the Error Messages

These error messages are designed to be used throughout the application, especially in areas where data validation and business logic checks are performed. Implementing these standardized messages ensures that the application responds to errors in a consistent manner, enhancing the user experience and easing debugging processes.

#### Example

```ts
if (duplicateEmailFound) {
  throw new Error(PSYCHOLOGIST_ERROR_MESSAGES['CONFLICTING_EMAIL']);
}
```

---
