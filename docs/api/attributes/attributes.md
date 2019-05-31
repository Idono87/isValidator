<h1>API Documentation - Array Attributes</h1>

- [Types](#types)
  - [AttributeValidator](#attributevalidator)
- [Interfaces](#interfaces)
  - [IAttributes](#iattributes)


# Types


## AttributeValidator

* ```(value: any, validationValue: any) => ValidationResponse``` 

Function signature for all attribute validators.

* __value__ 

  The value to validate.

* __validationValue__ 
  
  Argument(s) to validate against.



# Interfaces


## IAttributes

Default Attributes interface. Extend this when creating a new interface that describes the available attributes for a new validator.