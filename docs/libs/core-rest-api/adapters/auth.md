<br/>
<p align="center">
  <h1 align="center"> - Authentication Module -</h3>

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

The Auth module in the ClinicControl application is a comprehensive solution for handling authentication using JSON Web Tokens (JWT). This module consists of several components that work together to secure routes, validate JWTs, and manage public and private access within the application.

### Components of the Auth Module

`public.ts`

- Defines the Public decorator and the IS_PUBLIC_KEY constant. The Public decorator is used to mark routes as public, meaning they do not require authentication.

`jwt.strategy.ts`

- Implements the JwtStrategy class, which extends Passport's Strategy. It defines how JWTs are extracted from requests and validates the payload using the tokenPayloadSchema defined with zod.
- TokenPayload type is inferred from tokenPayloadSchema, ensuring type safety for the JWT payload.
- The validate method is used to parse and validate the JWT payload according to the schema.

`jwt-auth.guard.ts`

- Extends NestJS's AuthGuard with a custom JwtAuthGuard. This guard is responsible for determining if a route is public (does not require authentication) or protected.
- Overrides the canActivate method to check if the route is marked as public using the Public decorator. If the route is not public, it invokes the standard JWT authentication.
- The handleRequest method is overridden to throw an UnauthorizedException if the JWT token is invalid or absent.

`auth.module.ts`

- The module imports and configures PassportModule and JwtModule for JWT authentication.
- JwtModule.registerAsync is configured with the application's private and public keys for signing and verifying JWTs, with options like algorithm and token expiration.
- The JwtStrategy and EnvService are provided as services, and JwtAuthGuard is set as the default guard for the application using APP_GUARD.

### How It Works

- **Route Protection:** By default, all routes are protected and require a valid JWT token. If a route needs to be publicly accessible, the Public decorator is used.
- **JWT Validation:** The JwtStrategy extracts the JWT from the authorization header and validates the payload. The EnvService provides the necessary configuration for JWT validation.
- **Access Control:** When a request is made to a protected route, the JwtAuthGuard checks for a valid JWT token. If the token is missing or invalid, it throws an UnauthorizedException.
- **Public Routes:** For routes marked as public, the JwtAuthGuard allows the request to proceed without JWT validation.

This module ensures a secure and flexible way to handle authentication across the ClinicControl application, providing a seamless integration of JWT-based authentication and route protection mechanisms.
