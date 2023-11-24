<br/>
<p align="center">
  <h1 align="center"> - Controllers Documentation -</h3>

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

## 📋 Table of Contents

- [🎨 Decorators](#decorators)
  - [👤 Current User](#current-user)
- [🛡️ Guards](#guards)
  - [🔑 Api Key Guard](#api-key-guard)

---

<h2 id="decorators"> 🎨 Decorators</h2>
<h3 id="current-user">👤 Current User</h3>

The **CurrentUser** decorator is a custom method-level parameter decorator in the ClinicControl application, designed to simplify the process of accessing the current authenticated user's details within controller methods. This decorator enhances readability and maintainability by abstracting away the boilerplate code associated with extracting user information from request objects.

#### Implementation Details

**Decorator Nature:** CurrentUser is a parameter decorator, not a class decorator. It's implemented using NestJS's createParamDecorator function, which is specifically designed for creating custom parameter decorators.

##### Parameters:

- **The first parameter** is typically the name of the parameter you want to inject. In this case, it's replaced with an underscore (\_) because we're not injecting a specific parameter.
- **The second parameter** is the ExecutionContext, which provides various details about the current request handling process.

##### Request Access:

- **context.switchToHttp().getRequest():** This line of code switches the execution context to the HTTP-specific context, allowing access to the incoming request object. The getRequest() method retrieves the actual request object.

##### Return Value:

The decorator returns request.user cast to the TokenPayload type. This is the payload of the JWT token used for authentication, containing user-specific details.

#### Usage

The CurrentUser decorator can be used in any controller method where you need access to the current authenticated user's details. By simply adding `@CurrentUser()` before a method parameter, you can directly access the user's information, as extracted from the JWT payload.

```ts
@Controller('some-route')
export class SomeController {
  @Get()
  async someMethod(@CurrentUser() user: TokenPayload) {
    // Here, 'user' contains the current authenticated user's details
    // ... your logic goes here
  }
}
```

In the example above, `@CurrentUser()` is used to inject the authenticated user's details into the user parameter of the someMethod method.

This decorator is an essential part of the ClinicControl application, streamlining the process of accessing authenticated user information in a clean and intuitive manner.

---

<h2 id="guards">🛡️ Guards</h2>

<h3 id="api-key-guard">🔑 Api Key Guard</h3>

The **ApiKeyGuard** is a custom guard in the ClinicControl application, designed to implement API key-based authentication. This guard ensures that incoming requests have a valid API key in their headers, providing an additional layer of security.

#### Guard Implementation

**Guard Type:** ApiKeyGuard implements the CanActivate interface from NestJS, which is used for creating guards that control access to routes based on certain conditions.

**canActivate Method:**

- **Purpose:** This is the core method of the guard, responsible for checking the presence and validity of the API key in the request headers.
- **Execution Context:** It uses the ExecutionContext to access the incoming request object.
- **API Key Validation:**
  - The method retrieves the api-key header from the request.
  - If the header is missing or if the API key does not match the expected value stored in process.env['API_KEY'], it throws an **_UnauthorizedException_**, preventing access to the route.

**Logging:** Logs are used to provide feedback about the API key validation process, which is helpful for debugging and monitoring.

#### Usage

The ApiKeyGuard can be used globally or on specific routes to protect them with API key authentication. To apply it, you can use the @UseGuards decorator on your controllers or routes.

```ts
@Controller('protected-route')
@UseGuards(ApiKeyGuard)
export class ProtectedController {
  @Get()
  async someProtectedMethod() {
    // This method is now protected by the ApiKeyGuard
    // ...
  }
}
```

In the example, the `ApiKeyGuard` is applied to the `ProtectedController`, ensuring that all routes within this controller require a valid API key in the request header.

This guard is a crucial component of the ClinicControl application's security infrastructure, providing a straightforward yet effective mechanism for API key-based authentication and access control.

---
