// ISC License

// Copyright (c) 2019, Sorin Sandru <sorin.sandru@idono.net>

// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.

// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.W

import {
    AttributeValidator,
    IAttributeObject,
    IAttributes,
    IValidatorAttributes,
} from './attributes/attributes';
import { ErrorHandler, ErrorReport } from './errorHandler';
import AttributeRegistrationError from './errors/attributeRegistrationError';
import MissingValidatorReferenceError from './errors/missingValidatorReferenceError';
import NamingCollisionError from './errors/namingCollisionError';
import TypeError from './errors/typeError';
import * as Validators from './validators';
type Validator = Validators.Validator;
type ValidationResponse = Validators.ValidationResponse;

import { IArrayAttributes } from './attributes/arrayAttributes';
import { IArrayBufferAttributes } from './attributes/arrayBufferAttributes';
import { IBooleanAttributes } from './attributes/booleanAttributes';
import { IDateAttributes } from './attributes/dateAttributes';
import { IErrorAttributes } from './attributes/errorAttributes';
import { IFunctionAttributes } from './attributes/functionAttributes';
import { INestedObjectAttributes } from './attributes/nestedObjectAttributes';
import { INullAttributes } from './attributes/nullAttributes';
import { INumberAttributes } from './attributes/numberAttributes';
import { IObjectAttributes } from './attributes/objectAttributes';
import { IPromiseAttributes } from './attributes/promiseAttributes';
import { IRegexpAttributes } from './attributes/regexpAttributes';
import { IStringAttributes } from './attributes/stringAttributes';
import { ISymbolAttributes } from './attributes/symbolAttributes';
import { ITypeAttributes } from './attributes/typeAttributes';
import { IUndefinedAttributes } from './attributes/undefinedAttributes';
import { ValidationObject } from './validationObject';

/**
 * Interface for building constraints objects.
 */
export interface IConstraints {
    [property: string]: IPropertyConstraints;
}

/**
 * Interface for building constraint options
 */
export interface IConstraintOptions {
    strict?: boolean;
}

/**
 * Interface for constructing validation constraints.
 */
export interface IPropertyConstraints {
    exclude?: boolean;
    expect?: boolean;
    reject?: boolean;
    isArrayBuffer?: IArrayBufferAttributes;
    isString?: IStringAttributes;
    isNumber?: INumberAttributes;
    isArray?: IArrayAttributes;
    isFunction?: IFunctionAttributes;
    isObject?: IObjectAttributes;
    isNull?: INullAttributes;
    isUndefined?: IUndefinedAttributes;
    isBoolean?: IBooleanAttributes;
    isRegExp?: IRegexpAttributes;
    isError?: IErrorAttributes;
    isDate?: IDateAttributes;
    isSymbol?: ISymbolAttributes;
    isPromise?: IPromiseAttributes;
    isType?: ITypeAttributes;
    validateNestedObject?: INestedObjectAttributes;
}

/**
 * Internal interface for storing registered validators and attributes.
 */
interface IValidatorObject {
    attributes: IValidatorAttributes;
    defaultValidator: boolean;
    validator: Validator | undefined;
}

/**
 * Wrapped validation function.
 */
export type ValidationFunction = (
    value: any,
    key?: string,
    attributes?: IAttributes,
) => boolean;

/**
 * Wrapped attribute validator function.
 */
export type AttributeValidationFunction = (
    value: any,
    validationValue: any,
) => boolean;

/*
 * Holds all the custom user validators.
 */
export const RegisteredValidators: { [name: string]: IValidatorObject } = {};

/**
 * Returns the validator matching the given name. Or undefined if none was found.
 *
 * @param name Validator name
 */
export const GetValidator = (name: string): Validator | undefined => {
    if (name in RegisteredValidators) {
        return RegisteredValidators[name].validator;
    }
};

/**
 * Returns a wrapped representation of the called validator. The wrapped validator returns a boolean value
 * if the validation fails, instead of returning a string.
 *
 * @param name Validator name.
 */
export const GetWrappedValidator = (
    name: string,
): ValidationFunction | undefined => {
    if (Validators.isString(name)) {
        throw new TypeError(
            'Argument "name" is not of type string.',
            GetWrappedValidator,
        );
    }

    const validator: Validator | undefined = GetValidator(name);

    if (typeof validator !== 'undefined') {
        return (
            value: any,
            key?: string,
            attributes?: IAttributes,
        ): boolean => {
            if (validator(value, key, attributes)) {
                return false;
            }

            return true;
        };
    }
};

export const GetAttributeValidator = (
    attributeName: string,
    validatorName: string,
): AttributeValidator | undefined => {
    let attributeDescription: IAttributeObject | undefined;
    if (
        validatorName in RegisteredValidators &&
        attributeName in RegisteredValidators[validatorName].attributes
    ) {
        attributeDescription =
            RegisteredValidators[validatorName].attributes[attributeName];
    }

    if (typeof attributeDescription !== 'undefined') {
        return (value: any, validationValue: any): ValidationResponse => {
            const response: ValidationResponse = attributeDescription!.attributeArgumentValidator(
                validationValue,
            );

            if (
                typeof attributeDescription!.attributeValidator !==
                    'undefined' &&
                typeof response === 'undefined'
            ) {
                return attributeDescription!.attributeValidator!(
                    value,
                    validationValue,
                );
            } else if (typeof response !== 'undefined') {
                const errorHandler: ErrorHandler = new ErrorHandler();
                errorHandler.reportError('TypeError', response);

                return errorHandler.getReport();
            }
        };
    }
};

/**
 * Returns a wrapped attribute validator.
 *
 * @param attributeName
 * @param validatorName
 */
export const GetWrappedAttributeValidator = (
    attributeName: string,
    validatorName: string,
): AttributeValidationFunction | undefined => {
    if (Validators.isString(attributeName)) {
        throw new TypeError(
            'Argument "attributeName" is not of type string.',
            GetWrappedAttributeValidator,
        );
    }

    if (Validators.isString(validatorName)) {
        throw new TypeError(
            'Argument "validatorName" is not of type string.',
            GetWrappedAttributeValidator,
        );
    }

    const attributeValidator:
        | AttributeValidator
        | undefined = GetAttributeValidator(attributeName, validatorName);

    if (typeof attributeValidator !== 'undefined') {
        return (value: any, validationValue: any): boolean => {
            const response: ValidationResponse = attributeValidator(
                value,
                validationValue,
            );

            if (typeof response === 'string') {
                return false;
            } else if (typeof response === 'object') {
                throw new TypeError(response.TypeError! as string);
            }

            return true;
        };
    }
};

/**
 * Internal function that registers a default validator.
 *
 * @param name Name of the validator
 * @param validator Validator function.
 */
export const RegisterDefaultValidator = (
    name: string,
    validator: Validator | undefined,
    defaultValidator: boolean = false,
): void => {
    if (Validators.isString(name)) {
        throw new TypeError(
            'Default validator name is not of type string.',
            RegisterDefaultValidator,
        );
    }

    if (
        typeof Validators.isFunction(validator) !== 'undefined' &&
        typeof Validators.isUndefined(validator) !== 'undefined'
    ) {
        throw new TypeError(
            'Default validator is not of type function or undefined',
            RegisterDefaultValidator,
        );
    }

    if (name in RegisteredValidators) {
        throw new NamingCollisionError(
            'Validator already exists',
            RegisterDefaultValidator,
        );
    }

    const attributes = {};
    const validatorObject: IValidatorObject = {
        attributes,
        defaultValidator,
        validator,
    };

    RegisteredValidators[name] = validatorObject;
};

/**
 *
 * Register a default attribute to given validator.
 *
 * @param attributeName Attribute name to register.
 * @param validatorName Validator to register attribute to
 * @param attributeArgumentValidator Validator to type check attribute argument with
 * @param attributeValidator Attribute Validator to test the given property attribute with.
 */
export const RegisterDefaultAttribute = (
    attributeName: string,
    validatorName: string,
    attributeArgumentValidator: Validator,
    attributeValidator?: AttributeValidator,
    defaultAttribute: boolean = false,
): void => {
    if (Validators.isString(attributeName)) {
        throw new TypeError(
            'Attribute name is not of type string.',
            RegisterDefaultAttribute,
        );
    }

    if (Validators.isString(validatorName)) {
        throw new TypeError(
            'Validator name is not of type string.',
            RegisterDefaultAttribute,
        );
    }

    if (Validators.isFunction(attributeArgumentValidator)) {
        throw new TypeError(
            'Validator is not a function.',
            RegisterDefaultAttribute,
        );
    }

    if (
        typeof attributeValidator !== 'undefined' &&
        Validators.isFunction(attributeValidator)
    ) {
        throw new TypeError(
            'Attribute Validator is not a function or undefined',
            RegisterDefaultAttribute,
        );
    }

    if (typeof defaultAttribute !== 'boolean') {
        throw new TypeError(
            'Argument "defaultAttribute" is not a boolean.',
            RegisterDefaultAttribute,
        );
    }

    if (!(validatorName in RegisteredValidators)) {
        throw new MissingValidatorReferenceError(
            `Trying to register an attribute to a non existing validator "${validatorName}"`,
            RegisterDefaultAttribute,
        );
    }

    const validationObject: IValidatorObject =
        RegisteredValidators[validatorName];

    if (attributeName in validationObject.attributes) {
        throw new NamingCollisionError(
            `Attribute "${attributeName}" already exists for the default validator "${validatorName}".`,
            RegisterDefaultAttribute,
        );
    }

    if (!validationObject.defaultValidator && defaultAttribute) {
        throw new AttributeRegistrationError(
            `Default attribute can not be added to the defined validator "${validatorName}".`,
        );
    }

    const attribute: IAttributeObject = {
        attributeArgumentValidator,
        attributeValidator,
        defaultAttribute,
    };

    validationObject.attributes[attributeName] = attribute;
};

/**
 *
 * Register a new validation function.
 *
 * @param name Validator name
 * @param validator Validator function
 */
export const RegisterValidator = (name: string, validator: Validator): void => {
    try {
        RegisterDefaultValidator(name, validator);
    } catch (err) {
        throw new err.constructor(err.message, RegisterValidator);
    }
};

/**
 * Removes defined validator and its attributes.
 *
 * @param validatorName Validator Name
 */
export const RemoveValidator = (validatorName: string): void => {
    if (Validators.isString(validatorName)) {
        throw new TypeError(
            'Validator name is not of type string',
            RegisterValidator,
        );
    }

    if (
        validatorName in RegisteredValidators &&
        !RegisteredValidators[validatorName].defaultValidator
    ) {
        delete RegisteredValidators[validatorName];
    }
};

/**
 * Registers an attribute to a validator.
 *
 * @param attributeName
 * @param validatorName
 * @param attributeArgumentValidator
 * @param attributeValidator
 */
export const RegisterAttribute = (
    attributeName: string,
    validatorName: string,
    attributeArgumentValidator: Validator,
    attributeValidator?: AttributeValidator,
): void => {
    try {
        RegisterDefaultAttribute(
            attributeName,
            validatorName,
            attributeArgumentValidator,
            attributeValidator,
        );
    } catch (err) {
        throw new err.constructor(err.message, RegisterAttribute);
    }
};

/**
 *
 * Remove a defined validator.
 *
 * @param attributeName
 * @param validatorName
 */
export const RemoveAttribute = (
    attributeName: string,
    validatorName: string,
): void => {
    if (Validators.isString(attributeName)) {
        throw new TypeError(
            'Attribute name is not of type string.',
            RemoveAttribute,
        );
    }

    if (Validators.isString(validatorName)) {
        throw new TypeError(
            'Validator name is not of type string.',
            RemoveAttribute,
        );
    }

    if (
        validatorName in RegisteredValidators &&
        attributeName in RegisteredValidators[validatorName].attributes &&
        !RegisteredValidators[validatorName].attributes[attributeName]
            .defaultAttribute
    ) {
        delete RegisteredValidators[validatorName].attributes[validatorName];
    }
};

/**
 * Validates a single value.
 *
 * @param valueToValidate Value to validate
 * @param constraints Constraints to validate against.
 * @returns An ErrorReport if validation fails otherwise undefined.
 */
export const ValidateValue = (
    valueToValidate: any,
    constraints: IPropertyConstraints,
    options?: IConstraintOptions,
): ErrorReport => {
    if (Validators.isObject(constraints)) {
        throw new TypeError(
            'Validation constraints is not an Object.',
            ValidateValue,
        );
    }

    const objToValidate = {
        value: valueToValidate,
    };

    const objConstraints: IConstraints = {
        value: constraints,
    };

    try {
        return Validate(objToValidate, objConstraints, options);
    } catch (err) {
        throw new err.constructor(err.message, ValidateValue);
    }
};

/**
 * Validates the provided Object.
 *
 * @param objectToValidate Object to validate
 * @param constrainObject  Validation constraints for the entire object or just one value.
 * @param options Validation options.
 * @returns Returns an ErrorReport if validation fails otherwise undefined.
 */
export const Validate = (
    objectToValidate: object,
    constraints: IConstraints,
    options?: IConstraintOptions,
): ErrorReport => {
    try {
        const validateObject: ValidationObject = new ValidationObject(
            objectToValidate,
            constraints,
            options,
        );

        return validateObject.Validate();
    } catch (err) {
        throw new err.constructor(err.message, Validate);
    }
};
