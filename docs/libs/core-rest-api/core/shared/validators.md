<br/>

<p align="center">
  <h1 align="center"> - Shared Validators -</h3>

  <p align="center">
    Your Guide to Centralized Validation Logic
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

- [applicationValidateOrReject](#applicationValidateOrReject)

---

## applicationValidateOrReject

The function **_applicationValidateOrReject_** is a utility function designed to encapsulate object validation logic using the class-validator library to validate properties against a series of decorators and constraints. This is particularly useful for maintaining data integrity and enforcing business rules in your application.

It takes an object and an optional custom validation message as parameters and either resolves successfully if the object is valid or throws a [ValidationException](./errors.md#validationexception) if it is not.

#### Function Signature

```ts
export const applicationValidateOrReject = async (
  object: object,
  message?: string
): Promise<void>;
```

#### Parameters

- **object:** The object to be validated. This should be an instance of a class decorated with validation decorators from the class-validator library.
- **message (optional):** A custom message string that will be included in the ValidationException if the validation fails.

#### Usage

You can use this function to perform validation checks in a more organized and reusable manner across your application. It's especially useful when you want to ensure that various parts of your system conform to expected formats and constraints before proceeding with any operations.

#### Example

```ts
import { IsString, IsNotEmpty } from 'class-validator';
import { applicationValidateOrReject } from './path-to-utility-function';

class User {
  @IsString()
  @IsNotEmpty()
  name: string;
}

const user = new User();
user.name = ''; // Invalid value

async function validateUser() {
  try {
    await applicationValidateOrReject(user, 'User validation failed');
    console.log('User is valid');
  } catch (error) {
    if (error instanceof ValidationException) {
      console.log('Validation failed with message:', error.message);
      console.log('Validation causes:', error.causes);
    }
  }
}

validateUser();
```

In this example, the function applicationValidateOrReject will throw a ValidationException since the user.name is an empty string, which violates the @IsNotEmpty() constraint.

---
