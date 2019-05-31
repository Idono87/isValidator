<h1>API Documentation - isValidator</h1>

- [Re-Exports](#re-exports)
  - [Validators](#validators)
  - [IAttributes](#iattributes)
  - [ErrorHandler](#errorhandler)
- [Interfaces](#interfaces)
  - [IConstraints](#iconstraints)
  - [IConstraintOptions](#iconstraintoptions)
    - [Options](#options)
  - [IPropertyConstraints](#ipropertyconstraints)
    - [Special Property Constraints](#special-property-constraints)
- [Functions](#functions)
  - [GetAttributeValidator](#getattributevalidator)
  - [GetValidator](#getvalidator)
  - [GetWrappedAttributeValidator](#getwrappedattributevalidator)
  - [GetWrappedValidator](#getwrappedvalidator)
  - [RegisterAttribute](#registerattribute)
  - [RegisterValidator](#registervalidator)
  - [RemoveAttribute](#removeattribute)
  - [RemoveValidator](#removevalidator)
  - [Validate](#validate)
  - [ValidateValue](#validatevalue)


# Re-Exports

Re-Exports that are are necessary for extension purposes.


## Validators 

A collection of all default validators. See [Validators](validators) for more specific documentation for each validator. 


## IAttributes

All attributes are categorized for each validator and an interface derived of IAttributes is exported to use for extension purposes. They can be retrieved through their respective interface names.

* [IAttributes](attributes/attributes#iattributes)
* [IArrayAttributes](attributes/array#iarrayattributes) 
* [IBooleanAttributes](attributes/boolean#ibooleanattributes)
* [IDateAttributes](attributes/date#idateattributes)
* [IErrorAttributes](attributes/error#ierrorattributes) 
* [IFunctionAttributes](attributes/function#ifunctionattributes) 
* [INestedObjectAttributes](attributes/nestedobject#inestedobjectattributes) 
* [IFunctionAttributes](attributes/null#inullattributes) 
* [INumberAttributes](attributes/number#inumberattributes)
* [IObjectAttributes](attributes/object#iobjectattributes)
* [IPromiseAttributes](attributes/promise#ispromiseattributes)
* [IRegexpAttributes](attributes/regexp#iregexpattributes)
* [IStringAttributes](attributes/string#istringattributes)
* [ISymbolAttributes](attributes/symbol#isymbolattributes)
* [ITypeAttributes](attributes/type#itypeattributes)
* [IUndefinedAttributes](attributes/undefined#iundefinedattributes)


## ErrorHandler

A class that holds reported errors and builds the final output for consumption either by the user or as a return value for validator. See [ErrorHandler](errorhandler) more specific documentation.


# Interfaces


## IConstraints

* ```[propertyName: string]: IPropertyConstraints```

Validation constraints interface that can be assigned objects implementing ```IPropertyConstraints``` interfaces.


## IConstraintOptions

* ```strict?:boolean``` - Defaults to ```false```
  
Interface used to implement an options object.

### Options

* __strict__
  
  Strictly compares property existence against the defined constraints. Any property that does not match the defined constraints will return an error. 
  
  E.g. Any property that exist within the validated object but not defined in the constraints will return an error. And any property not in the validated object but is defined in the constraints will also return an error.


## IPropertyConstraints

* __```exclude?:boolean```__ - Defaults to ```false```
* __```expect?:boolean```__ - Defaults to ```false```
* __```reject?:boolean```__ - Defaults to ```false```
* __```isString?:IStringAttributes```__
* __```isNumber?:INumberAttributes```__
* __```isArray?:IArrayAttributes```__
* __```isFunction?:IFunctionAttributes```__
* __```isObject?:IObjectAttributes```__
* __```isNull?:INullAttributes```__
* __```isUndefined?:IUndefinedAttributes```__
* __```isBoolean?:IBooleanAttributes```__
* __```isRegExp?:IRegExpAttributes```__
* __```isError?:IErrorAttributes```__
* __```isDate?:IDateAttributes```__
* __```isSymbol?:ISymbolAttributes```__
* __```isPromise?:IPromiseAttributes```__
* __```isType?:ITypeAttributes```__
* __```validateNestedObject?:INestedObjectAttributes```__


Property constraints interface used for describing property validation within ```IConstraints```. See [validators](validators) section for specific specific validator functionality.

### Special Property Constraints

__Exclude__, __expect__ and __reject__ are special property constraints that work differently from the other property constraints. 

* __exclude__
  
  Excludes the property from the strict validation process. (When the IConstraintOptions.strict flag is true.)

* __expect__ 
  
  Expect the property to exist within the validated object.

* __reject__
  
  Automatically fails the property if it exists within the validated property.


# Functions


## GetAttributeValidator

* ```typescript
    (attributeName:string, validatorName:string) => AttributeValidator | undefined
  ```
Retrieves the given attribute validator associated with the given validator.


## GetValidator

* ```typescript
    (name:string) => Validator | undefined
  ```
Retrieves the given validator.


## GetWrappedAttributeValidator

* ```typescript
    (attributeName:string, validatorName:string) => AttributeValidationFunction | undefined
  ```
Retrieves a wrapped attribute validator associated with the given validator.


## GetWrappedValidator

* ```typescript
    (name:string) => ValidationFunction | undefined
  ```
Retrieves a wrapped representation of the given validator.


## RegisterAttribute

* ```typescript
    (attributeName: string, validatorName: string, attributeArgumentValidator: Validator, attributeValidator?: AttributeValidator) => void
  ```
Registers a new attribute to the given validator with the given attribute name. 

A ```Validator``` has to be passed in with the ```attributeArgumentValidator``` to validate the attribute constraint argument during runtime. If no argument is expected then it's recommended to pass in the ```isUndefined``` validator.

Optional ```AttributeValidator``` can be attached to the attribute. If no ```AttributeValidator```is attached, then the attribute is treated as an argument type attribute that passes data to the parent validator.


## RegisterValidator 
* ```typescript
    (name:string, validator:Validator) => void
  ```

Registers a new ```Validator``` with the given name. 


## RemoveAttribute

* ```typescript
    (attributeName: string, validatorName:string) => void
  ```

  Removes the given attribute from the given validator. Default attributes can not be removed. Any attempts will fail silently. 


## RemoveValidator

* ```typescript
    (validatorName:string) => void
  ```

  Removes the given validator and all attributes. Default validators can not be removed. Any attempts will fail silently.


## Validate 

* ```typescript
    (objectToValidate:object, constraints:IConstraints, options?:IConstraintOptions) => ErrorReport
  ```

  Validates the object with the given constraints and returns an ```ErrorReport```


## ValidateValue 

* ```typescript
    (valueToValidate:object, constraints:IPropertyConstraints, options?:IConstraintOptions) => ErrorReport
  ```

Validates the given value with the given constraints and returns an ```ErrorReport```
