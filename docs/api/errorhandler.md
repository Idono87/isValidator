<h1>API Documentation - Error Handler</h1>

- [Types](#types)
  - [ErrorReport](#errorreport)
- [Interfaces](#interfaces)
  - [IErrorStructure](#ierrorstructure)
- [ErrorHandler](#errorhandler)
  - [Properties](#properties)
    - [__hasErrors__](#haserrors)
  - [constructor](#constructor)
  - [Methods](#methods)
    - [__reportError__](#reporterror)
    - [__getReport__](#getreport)

# Types

## ErrorReport

* ```typescript
    Readonly<IErrorStructure> | undefined
  ```
Error report that returns a read only ErrorStructure with all the failed
validation reports or undefined if no errors have been reported

# Interfaces

## IErrorStructure 

* ```typescript
    [propertyName: string]: IErrorStructure | ErrorReport | string;
  ```

  A nested object similar to the constraints defined. Holds reported errors for failed validations.


# ErrorHandler

Organizes reported errors into a suitable structure.

## Properties

### __hasErrors__

Returns true or false if the errorHandler has any reported errors. Can not be assigned a value.

## constructor 

* ```typescript
    () => void
  ```

## Methods

### __reportError__

* ```typescript
    (propertyPath:string, message:string | ErrorReport) => void
  ```

Add an error into it's proper nested position.

### __getReport__

* ```typescript
    () => ErrorReport
  ```

  Returns a detailed map of reported validation errors. Notice! Once called the internal error structure will be frozen. Reporting new errors will throw an exception.