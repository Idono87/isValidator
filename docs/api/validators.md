<h1>API Documentation - Validators</h1>

- [Types](#Types)
  - [ValidationResponse](#ValidationResponse)
  - [Validator](#Validator)
- [Functions](#Functions)
  - [isArray](#isArray)
  - [isArrayBuffer](#isArrayBuffer)
  - [isBoolean](#isBoolean)
  - [isDate](#isDate)
  - [isError](#isError)
  - [isFunction](#isFunction)
  - [isNull](#isNull)
  - [isNumber](#isNumber)
  - [isObject](#isObject)
  - [isPromise](#isPromise)
  - [isRegExp](#isRegExp)
  - [isString](#isString)
  - [isSymbol](#isSymbol)
  - [isType](#isType)
  - [isUndefined](#isUndefined)
  - [validateNestedObject](#validateNestedObject)


# Types


## ValidationResponse

* ```typescript 
    string | ErrorReport | void
  ```

Return type for all ```Validator``` functions


## Validator

* ```typescript 
    (
        value: any,
        key?: string,
        attributes?: IAttributes,
        options?: IConstraintOptions,
    ) => ValidationResponse;
  ```

Validator function signature. All validators must implement this function signature.

* __value__ 

  The value to validate.

* __key__

  The name of property being validated.  Optional when the validator is used with the ```GetValidator``` function.

* __attributes__

  All constraints attributes assigned to the validator. When used with ```GetValidator``` make sure to pass in the necessary attributes for specific validators likes ```isType``` and ```validateNestedValidator```

* __options__

  Constraint options object for the entire validation process. Optional for all validators.   


# Functions


## isArray

Validates that the passed in value is an Array. 

## isArrayBuffer

Validates if the given value is an array buffer

## isBoolean

Validates that the passed in value is a boolean.


## isDate

Validates that the passed in value is a Date object.


## isError

Validates that the passed in value is an Error object.


## isFunction

Validates that the passed in value is a Function.


## isNull

Validates that the passed in value is null.


## isNumber

Validates that the passed in value is a number.


## isObject

Validates that the passed in value is an object.


## isPromise

Validates that the passed in value is a promise.


## isRegExp

Validates that the passed in value is a regular expression.


## isString

Validates that the passed in value is a string.


## isSymbol

Validates that the passed in value is a Symbol.


## isType

Validates that the passed in value is of given type.

Using isType is fairly straight forward. When defining the attribute constraints for the validator. Defined the property ```type``` and assign a constructor function to the newly defined property.

```typescript
    const constraints:IConstraints = {
        propertyToTest: {
            isType: {
                type: CustomConstructorFunction
            }
        }
    }
```


## isUndefined

Validates that the passed in value is undefined.


## validateNestedObject

Validates the passed in object.

To validate a nested object a constraint object implementing ```IConstraints``` needs to be passed through to the validator. To do this define the property constraints in validateNestedObjects attribute constraints and assign it the constraint object for the nested object.

```typescript
    const nestedObjectConstraints:IConstraints = {
        nestedProperty: {
            isString: {}
        }
    }

    const constraints:IConstraints {
        propertyWithNestedObject: {
            validateNestedObject: {
                constraints: nestedObjectConstraints,
            }
        }
    }
```

---