<h1>Adding Validators</h1>

isValidator is easily extendible in just a few simple steps.

- [Defining Validator](#defining-validator)
- [Registering Validators](#registering-validators)
- [Extending Typings](#extending-typings)

# Defining Validator

To create a validator define a function of type [Validator][validator]. It should return a ```string``` or an ```ErrorStructure``` if the validation fails and ```void```if it succeeds.

```typescript
import {
    IAttributes,
    IConstraintOptions,
    ValidationResponse,
    Validator,
} from 'isValidator';

const customStringValidator: Validator = (
    value: any,
    key?: string,
    attributes?: IAttributes,
    options?: IConstraintOptions,
): ValidationResponse => {
    if (typeof value !== 'string') {
        return 'Value is not of type string';
    }
};
```

The validator has the following arguments.

* __value__ 

  The value to validate.

* __key__

  The name of property being validated.

* __attributes__

  All constraints attributes assigned to the validator.

* __options__

  Constraint options object for the entire validation process. Optional for all validators. 

# Registering Validators

Validator registration is easily done by calling [RegisterValidator][registervalidator]. Pass the function the name of the validator and the defined validation function.

```typescript
RegisterValidator('customStringValidator', customStringValidator);
```

# Extending Typings

When registering a new validator it is very important to extend existing typings with the new custom validator. This is easily done with [module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation). Simply declare the isValidator module and define the [IPropertyConstraints][ipropertyconstraints] interface with the new validator within it.

__Note:__ Every defined validator in IPropertyConstraints should be assigned the type [IAttribute][iattribute] or a derived interface. In fact it is even recommended to create a new interface following the naming scheme ```I<ValidatorName>Attribute``` and extends the [IAttribute][iattribute] interface.

```typescript

declare module 'isValidator' {
    interface IPropertyConstraints {
        customStringValidator: ICustomStringAttributes;
    }

    interface ICustomStringAttributes extends IAttributes {}
}

```




[iattribute]:../api/attributes/attributes.md#iattributes
[ipropertyconstraints]:../api/isvalidator.md#ipropertyconstraints
[registervalidator]:../api/isvalidator.md#registervaldiator
[validator]:../api/validators.md#validator