<br/>

<p align="center">
  <h1 align="center"> - Shared Utils -</h3>

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

## 📚 Table of Contents

- [Replace](#Replace)

---

## Replace

In TypeScript, utility types can be powerful tools for code reusability and type manipulation. The Replace<T, R> utility type aims to substitute properties in type T with properties in type R.

#### Definition

```ts
type Replace<T, R> = Omit<T, keyof R> & R;
```

- **_T:_** The original type where we intend to replace properties.
- **_R:_** The type containing properties that should replace those in T.

#### Usage

The Replace<T, R> type is particularly useful when you want to override or replace specific properties of a type without creating an entirely new one.

This can be helpful for creating new types that are similar to existing ones but with some minor differences.

#### Example

```ts
interface Original {
  name: string;
  age: number;
  location: string;
}

type NewProperties = {
  age: string;
  occupation: string;
};

// Using Replace<T, R>
type Replaced = Replace<Original, NewProperties>;

// Equivalent to:
// type Replaced = {
//   name: string;
//   age: string;
//   location: string;
//   occupation: string;
// };
```
