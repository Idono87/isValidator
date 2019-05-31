<h1>Adding Validators</h1>

Adding attributes to a validator follows the same process as adding a validator. 

- [Defining AttributeValidators](#defining-attributevalidators)
- [Registering AttributeValidators](#registering-attributevalidators)
- [Extending Typings](#extending-typings)
- [Attributes as Validator Arguments](#attributes-as-validator-arguments)

# Defining AttributeValidators

Creating an attribute validator is done by defining the [AttributeValidator][attributevalidator] function signature. The function returns a ```string``` or an ```ErrorStructure``` if the validation fails and ```void```if it succeeds.

```typescript
import {
    AttributeValidator,
    RegisterAttribute,
    ValidationResponse,
    Validators,
} from 'isValidator';

const compareStrings: AttributeValidator = (
    value: any,
    validationValue: any,
): ValidationResponse => {
    if (value !== validationValue) {
        return 'Strings do not match';
    }
};
```

The attribute validator takes the following arguments. 

* __value__ 

  The value to validate.

* __validationValue__ 
  
  Argument(s) to validate against.



# Registering AttributeValidators

Attribute registration is easily done by calling [RegisterAttribute][registerattribute]. Pass the name of the attribute, the name of the validator to attach the attribute to, a validator function to validate argument passed to the attribute as a validation value and the newly defined attribute validator.

```typescript
RegisterAttribute(
    'compareStrings',
    'customStringValidator',
    Validators.isString,
    compareStrings,
);
```

__Note:__ The argument validator used should always be a function of type [Validator][validator]. If no value is passed then it's recommended to use the [isUndefined][isundefined] validation function.

# Extending Typings

Attributes also need their typings extended for the exact same reasons as Validators. Simply by [augmenting the module](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation) the attribute can be defined and merged into the existing constraints.

__Note:__ The type of the attribute should be the intended argument type passed in for 'validationValue'

```typescript
declare module 'isValidator' {
    // Custom attributes interface created for customStringValidator 
    // in the adding validators section.
    interface ICustomStringAttributes extends IAttributes {
        compareStrings:string
    }
}

```


# Attributes as Validator Arguments

Attributes can also be used as arguments for validators. This can be done by not assigning an attribute validator (last argument) to the [RegisterAttribute][registerattribute] function. Internally if there is no attribute validator attached to the registered attribute, then the validation process will only validate the passed in attribute argument. Since all defined attribute constraints for the validator are passed in as an argument, they can easily be accessed in the validator. 

__Note:__ There is no need to validate any attributes in the validator since all attribute arguments are validated before the validator function is called.

```typescript
RegisterAttribute(
    'customArgument',
    'customStringValidator',
    Validators.isString,
);

declare module 'isValidator' {
    // Custom attributes interface created for customStringValidator 
    // in the adding validators section.
    interface ICustomStringAttributes extends IAttributes {
        customArgument:string
    }
}
```


[attributevalidator]:../api/attributes/attributes.md#attributevalidator
[ipropertyconstraints]:../api/isvalidator.md#ipropertyconstraints
[registervalidator]:../api/isvalidator.md#registervaldiator
[validator]:../api/validators.md#validator