<h1>Usage - Validation</h1>

- [Validating Objects](#validating-objects)
- [Validate Value](#validate-value)
- [Validating Nested Objects](#validating-nested-objects)
- [Validating Constraints](#validating-constraints)
- [Error Reports](#error-reports)
- [Strict validation](#strict-validation)
- [Property Options](#property-options)

# Validating Objects

To validate an object create a constraints object implementing the [IConstraints][iconstraints] interface and then calling the [Validate][validate] function while passing the object to validate and constraints as arguments.

The constraints object has specific nested structure that follows a per level validation process.

* Properties to validate
    * Property validations & Property options
        * Attribute validations & Property validation arguments

The first level defines the property to validate. The second level defines the type of validations to perform on the property as well as special property options (such as [Exists, Reject, Exclude][special]). And the third level defines which attribute validations to perform as well as arguments to pass the property validator.

```typescript 
import { ErrorReport, IConstraints, Validate } from 'isValidator';

const person = {
    age: 28,
    email: 'john.andersson@isvalidator.com',
    name: 'John Andersson',
};

const constraints: IConstraints = {
    age: {
        isNumber: {
            isLargerThanOrEqualTo: 18,
        },
    },
    email: {
        isString: {
            matchRegExp: /.{1,200}@{1,200}\..{1,3}/,
        },
    },
    name: {
        isString: {},
    },
};

const result: ErrorReport = Validate(person, constraints);

if (typeof result !== 'undefined') {
    //Log errors
}
```

As seen in the example above a constraints object is built to validate the person object. It is passed into the validate function and the validate function returns an [ErrorReport][errorreport]. 

The first level of the constraints object defines the properties 'age', 'email' and 'name'. This tells the validator what properties to validate. Note that it is important to assign the property an object, even if it's an empty object, the validation will otherwise fail and return an error.

The second level of the constraints defines a 'isNumber' property for  'age' and a 'isString' property for 'email' and 'name'. Which also need an object assigned to them. 

The third level has the attribute validator 'isLargerThanOrEqualTo' assigned to the 'age.isNumber' nested object and 'matchRegExp' for the 'email.isString' nest object. 

Attribute definitions are always endpoints as such the values assigned to them act as arguments. In this case '18' is assigned as the minimum age and the email has to match regular expression.

Once the [Validate][validate] function has been called it returns an [ErrorReport][errorreport] that is undefined if the validation passes or a nested object mirroring a union between the validated object and constraints object when the validation fails. [Further explanation can been seen below](#error-report).


# Validate Value

Validating single values is equally straight forward as validating objects. Define a constraints object implementing the [IPropertyConstraints][ipropconstraints] interface. Then pass the value and constraints to the [ValidateValue][validatevalue] function and check the return value for any reported errors.

__Note:__ The [IPropertyConstraints][ipropconstraints] interface is object interface type assigned for each property for [IConstraints][iconstraints]

```typescript
import { ErrorReport, IPropertyConstraints, ValidateValue } from 'isValidator';

const value = 'is this a string?';

const constraints: IPropertyConstraints = {
    isString: {
        isMinLength: 1;
    }
};

const result: ErrorReport = ValidateValue(value, constraints);

if (typeof result !== 'undefined') {
    //Log errors
}
```

# Validating Nested Objects

isValidator has the capability of validating nested objects with the special validator [validateNestedObject][nested].

```typescript
import { ErrorReport, IConstraints, Validate } from 'isValidator';

const person = {
    age: 28,
    email: 'john.andersson@isvalidator.com',
    name: {
        first: 'John',
        last: 'Andersson',
    },
};

const nameConstraints: IConstraints = {
    first: {
        isString: {},
    },
    last: {
        isString: {},
    },
};

const constraints: IConstraints = {
    age: {
        isNumber: {
            isLargerThanOrEqualTo: 18,
        },
    },
    email: {
        isString: {
            matchRegExp: /.{1,200}@{1,200}\..{1,3}/,
        },
    },
    name: {
        validateNestedObject: {
            constraints: nameConstraints,
        },
    },
};

const result: ErrorReport = Validate(person, constraints);

if (typeof result !== 'undefined') {
    //Log errors
}

```

As shown in the example. Define a second constraints object implementing the [IConstraints][iconstraints] interface and assign it to the 'constraints' attribute for validateNestedObject. 


# Validating Constraints

Testing and validating constraints can be done separately from the validation process. Simply call the [ValidateConstraints][valconst] functions and inspect the return value for any errors. 

```typescript
import { ErrorReport, IConstraints, ValidateConstraints } from 'isValidator';

const constraints: IConstraints = {
    age: {
        isNumber: {
            isLargerThanOrEqualTo: 18,
        },
    },
    email: {
        isString: {
            matchRegExp: /.{1,200}@{1,200}\..{1,3}/,
        },
    },
    name: {
        isString: {},
    },
};

const result: ErrorReport = ValidateConstraints(constraints);

if (typeof result !== 'undefined') {
    //Log errors
}
```

Property constraints passed into ```ValidateValue``` can also be validate with the [ValidatePropertyConstraints][valpropconst] function. 

```typescript
import { ErrorReport, IConstraints, ValidateConstraints } from 'isValidator';

const constraints: IPropertyConstraints = {
    isNumber: {
        isLargerThanOrEqualTo: 18,
    },
};

const result: ErrorReport = ValidatePropertyConstraints(constraints);

if (typeof result !== 'undefined') {
    //Log errors
}
```

# Error Reports
[Validate][validate] and [ValidateValue][validatevalue] both return an [ErrorReport][errorreport] either when constraints validation fails or the object/value validation fails. The error report is a union type of ```undefined | ErrorStructure```. The error structure is a nested object containing reported errors and mirrors a combine structure of the object/value being validated and the constraints object.

```typescript
import { ErrorReport, IConstraints, Validate } from 'isValidator';

const person = {
    age: 17,
    email: 'john.andersson@isvalidator.com',
    name: 25,
};

const constraints: IConstraints = {
    age: {
        isNumber: {
            isLargerThanOrEqualTo: 18,
        },
    },
    email: {
        isString: {
            matchRegExp: /.{1,200}@{1,200}\..{1,3}/,
        },
    },
    name: {
        isString: {},
    },
};

const result: ErrorReport = Validate(person, constraints);

if (typeof result !== 'undefined') {
    //Log errors
}
```

The example above will fail at two points. The age attribute being below 18 and the name not being a string. Thus generating the following error structure.

```
{
    age: {
        isNumber: {
            isLargerThanOrEqualTo: 'The number "17" is not larger than or equal to "18"';
        }
    },
    name: {
        isString: 'Value is not a string.',
    }
}
```

# Strict validation

Object validation can be strictly enforced to follow the defined constraints. This can be done by passing an object implementing the [IConstraintOptions][iconstoptions] interface with the strict property set to true. E.g. all properties in the validated object has to mirror the top level property definitions in the constraints object. Any missing or extra properties in the validated object will return an error.

```typescript
import { ErrorReport, IConstraintOptions, IConstraints, Validate } from 'isValidator';

const person = {
    age: 17,
    name: 'John Andersson',
};

const constraints: IConstraints = {
    email: {
        isString: {
            matchRegExp: /.{1,200}@{1,200}\..{1,3}/,
        },
    },
    name: {
        isString: {},
    },
};

const options: IConstraintOptions = {
    strict: true,
}

const result: ErrorReport = Validate(person, constraints, options);

if (typeof result !== 'undefined') {
    //Log errors
}
```

The above example will fail the validation and return the following error report. Since 'age' is not defined within the constraints it returns a reject error. While 'email' is defined within the constrains and thus will return an expect error. As shown below.

```
{
    age: {
        reject: 'Property has been rejected.'
    },
    email: {
        expect: 'Property expected but does not exist.',
    },
}
```

# Property Options

Property options are special constraint options that are more akin to property validators than value validators. They can be defined in an object that implements the [IPropertyConstraints][ipropconstraints] interface.

```typescript
const constraints: IConstraints = {
    age: {
        reject: true,
    }
    email: {
        expect: true,
        isString: {},
    },
    name: {
        expect: true,
        isString: {},
    },
};

```

The example above shows the ```expect``` option, which expects the parent object to contain both the 'email' and 'name' properties. And the ```reject``` option, which rejects the property 'age' in the parent object if it exists.

There is also the ```exclude``` option which excludes the assigned property from strict validation.



[errorreport]: ../api/errorhandler.md#error-reports
[iconstraints]:../api/isvalidator.md#iconstraints
[iconstoptions]:../api/isvalidator.md#iconstraintoptions
[ipropconstraints]:../api/isvalidator.md#ipropertyconstraints
[nested]:../api/validators.md#validatenestedobject
[special]:../api/isvalidator.md#special-property-constraints
[validate]:../api/isvalidator.md#validate
[validatevalue]:../api/isvalidator.md#validatevalue
[valconst]: ../api/isvalidator.md#validateconstraints
[valpropconst]: ../api/isvalidator.md#validateconstraints
