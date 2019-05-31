<h1>API Documentation - Array Attributes</h1>

- [Types](#types)
  - [DataType](#datatype)
  - [TypeArray](#typearray)
- [Interfaces](#interfaces)
  - [IArrayAttributes](#iarrayattributes)
- [Functions](#functions)
  - [isLengthOf](#islengthof)
  - [isNotLengthOf](#isnotlengthof)
  - [isMinLength](#isminlength)
  - [isMaxLength](#ismaxlength)
  - [isOfTypes](#isoftypes)
  - [isNotOfTypes](#isnotoftypes)
  - [isOfType](#isoftype)
  - [isNotOfType](#isnotoftype)
  - [isStrictOfTypes](#isstrictoftypes)
  - [hasValues](#hasvalues)
  - [doesNotHaveValues](#doesnothavevalues)
  - [isEqualTo](#isequalto)
  - [isStrictEqualTo](#isstrictequalto)


# Types


## DataType
* ```typescript
    string | Function
  ```
Union type used for validating array element types


## TypeArray 
* ```typescript
    DataType[]
  ```

DataType array used to validate array element types.


# Interfaces


## IArrayAttributes

* __```isLengthOf?:number```__
* __```isNotLengthOf?:number```__
* __```isMinLength?:number```__
* __```isMaxLength?:number```__
* __```isOfTypes?:TypeArray```__
* __```isNotOfTypes?:TypeArray```__
* __```isOfType?:DataType```__
* __```isNotOfType?:DataType```__
* __```isStrictOfTypes?:TypeArray```__
* __```hasValues?:any[]```__
* __```doesNotHaveValues?:any[]```__
* __```isEqualTo?:any[]```__
* __```isStrictEqualTo?:any[]```__

Interface typings for all default array attributes.


# Functions


## isLengthOf

Validates that the array is of length n


## isNotLengthOf

Validates that the array is not of length n


## isMinLength

Validates that the array is of least length n


## isMaxLength

Validates that the array is of max length n


## isOfTypes

Validates that the array is of the given types


## isNotOfTypes

Validates that the array isn't of the given types


## isOfType

Validates that the array is of the given type.


## isNotOfType

Validates that the array is strictly not the given type.


## isStrictOfTypes

Validates that the array element types are exactly ordered as in the validation input.


## hasValues

Validates that the array contains given values.


## doesNotHaveValues

Validates that the array does not contain give values


## isEqualTo

Out of order array validation between the given array and the array to validate


## isStrictEqualTo

In order comparison between the given array and the array to validate.