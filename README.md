<h1 class="header">isValidator</h1>

Complete, extensible and simple validator.

![npm version](https://img.shields.io/npm/v/isValidator.svg?style=flat-square)
![Codecov branch](https://img.shields.io/codecov/c/github/Idono87/isValidator/production.svg?style=flat-square)
![CircleCI branch](https://img.shields.io/circleci/project/github/Idono87/isValidator/production.svg?style=flat-square)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![npm type definitions](https://img.shields.io/npm/types/isValidator.svg?style=flat-square)
![GitHub](https://img.shields.io/github/license/idono87/isValidator.svg?style=flat-square)

isValidator is a complete validation library for [Node.js](https://nodejs.org). It's built from the ground up around three core pillars.

### - Ease of use
To easily defined constraints, validate and debug validation failures. 

### - User extensibility
The ability to extend the library with custom validation functionality beyond the default validation capabilities.

### - Strongly Typed
Since the library is written in TypeScript a big emphasis has been put on strongly typing the library and the validation process to catch any errors before running the application. 

__Note: All examples are written in typescript.__

```typescript
import { IConstraints, Validate } from 'isValidator'

//Object to validated.
const person = {
    name: 'Joe',
    age: 30,
}

//Validation Constraints 
const personConstraints:IConstraints = {
    name: {
        isString: {}
    },
    age: {
        isNumber: {
            isLargerThanOrEqualTo: 18
        }
    }
}

//If the validation fails an error report is generated. 
const err: ErrorReport = Validate(person, personConstraints);

if(err) {
    //Log errors.
}
```


# Installation
The module is available through [NPM](https://www.npmjs.com/) and currently supports [Node.js](https://nodejs.org) 10.0.0 or higher. (Previous versions are yet to be tested).

To install use the command

```
$ npm install isValidator
```

# Documentation 

In depth documentation can be found at [https://idono87.github.io/isValidator/](https://idono87.github.io/isValidator/)


# Future implementations

* Asynchronous Validation
* Extending Reporters
* Browser Support


# Creator

Author of isValidator is [Sorin Sandru](https://github.com/Idono87)

# License

[ISC](LICENSE)