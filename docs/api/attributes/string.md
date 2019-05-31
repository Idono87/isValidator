<h1>API Documentation - String Attributes</h1>

- [Interfaces](#interfaces)
  - [IStringAttributes](#istringattributes)
- [Functions](#functions)
  - [isLengthOf](#islengthof)
  - [isNotLengthOf](#isnotlengthof)
  - [isMinLength](#isminlength)
  - [isMaxLength](#ismaxlength)
  - [isUpperCase](#isuppercase)
  - [isLowerCase](#islowercase)
  - [matchRegExp](#matchregexp)


# Interfaces


## IStringAttributes

* __```isLengthOf?:number```__
* __```isNotLengthOf?:number```__
* __```isMinLength?:number```__
* __```isMaxLength?:number```__
* __```isUpperCase?:undefined```__
* __```isLowerCase?:undefined```__
* __```matchRegExp?:RegExp```__

Interface typings for all the available default string attributes.


# Functions


## isLengthOf

Validates that the string is of length n.


## isNotLengthOf

Validates that the string is not of length n.


## isMinLength

Validates that the string length is larger or equal to n.


## isMaxLength

Validates that the string length is less or equal to n.


## isUpperCase

Validates the string as uppercase.


## isLowerCase

Validates the string as lowercase.


## matchRegExp

Validates that the string matches the regular expression.