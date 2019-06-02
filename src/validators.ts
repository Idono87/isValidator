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
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

/**
 * Built in default validators. All validators return a string when validation fails otherwise undefined.
 */

import { IArrayBufferAttributes } from './attributes/arrayBufferAttributes';
import { IAttributes } from './attributes/attributes';
import { INestedObjectAttributes } from './attributes/nestedObjectAttributes';
import { ITypeAttributes } from './attributes/typeAttributes';
import { ErrorReport } from './errorHandler';
import { IConstraintOptions, Validate } from './isValidator';

/**
 * Typing for validation responses.
 */
export type ValidationResponse = string | ErrorReport | void;

/**
 * Validator function signature.
 */
export type Validator = (
    value: any,
    key?: string,
    attributes?: IAttributes,
    options?: IConstraintOptions,
) => ValidationResponse;

/**
 * Validates if the given value is a string.
 *
 * @param value - The value to validate.
 * @param key
 * @param attributes
 * @returns A string if validation fails otherwise undefined.
 */
export const isString: Validator = (
    value: any,
    key?: string,
    attributes?: IAttributes,
    options?: IConstraintOptions,
): ValidationResponse => {
    if (!(typeof value === 'string' || value instanceof String)) {
        return 'Value is not a string.';
    }
};

/**
 * Validates if the given value is a number
 *
 * @param value - The value to validate.
 * @param key
 * @param attributes
 * @returns A string if validation fails otherwise undefined.
 */
export const isNumber: Validator = (
    value: any,
    key?: string,
    attributes?: IAttributes,
    options?: IConstraintOptions,
): ValidationResponse => {
    if (!(typeof value === 'number' || isFinite(value))) {
        return 'Value is not a number.';
    }
};

/**
 * Validates if the given value is an array
 *
 * @param value - The value to validate.
 * @param key
 * @param attributes
 * @returns A string if validation fails otherwise undefined.
 */
export const isArray: Validator = (
    value: any,
    key?: string,
    attributes?: IAttributes,
    options?: IConstraintOptions,
): ValidationResponse => {
    if (!(value && typeof value === 'object' && value.constructor === Array)) {
        return 'Value is not an Array.';
    }
};

/**
 * Validates if the given value is a function
 *
 * @param value - The value to validate.
 * @param key
 * @param attributes
 * @returns A string if validation fails otherwise undefined.
 */
export const isFunction: Validator = (
    value: any,
    key?: string,
    attributes?: IAttributes,
    options?: IConstraintOptions,
): ValidationResponse => {
    if (typeof value !== 'function') {
        return 'Value is not a function.';
    }
};

/**
 * Validates if the given value is an object
 *
 * @param value - The value to validate.
 * @param key
 * @param attributest
 * @returns A string if validation fails otherwise undefined.
 */
export const isObject: Validator = (
    value: any,
    key?: string,
    attributes?: IAttributes,
    options?: IConstraintOptions,
): ValidationResponse => {
    if (!(value && typeof value === 'object' && value.constructor === Object)) {
        return 'Value is not an object.';
    }
};

/**
 * Validates if the given value is null
 *
 * @param value - The value to validate.
 * @param key
 * @param attributes
 * @param object
 * @returns A string if validation fails otherwise undefined.
 */
export const isNull: Validator = (
    value: any,
    key?: string,
    attributes?: IAttributes,
    options?: IConstraintOptions,
): ValidationResponse => {
    if (value !== null) {
        return 'Value is not null.';
    }
};

/**
 * Validates if the given value is undefined
 *
 * @param value - The value to validate.
 * @param key
 * @param attributes
 * @returns A string if validation fails otherwise undefined.
 */
export const isUndefined: Validator = (
    value: any,
    key?: string,
    attributes?: IAttributes,
    options?: IConstraintOptions,
): ValidationResponse => {
    if (typeof value !== 'undefined') {
        return 'Value is not undefined.';
    }
};

/**
 * Validates if the given value is a boolean
 *
 * @param value - The value to validate.
 * @param key
 * @param attributes
 * @returns A string if validation fails otherwise undefined.
 */
export const isBoolean: Validator = (
    value: any,
    key?: string,
    attributes?: IAttributes,
    options?: IConstraintOptions,
): ValidationResponse => {
    if (typeof value !== 'boolean') {
        return 'Value is not a boolean.';
    }
};

/**
 * Validates if the given value is a regular expression
 *
 * @param value - The value to validate.
 * @param key
 * @param attributes
 * @returns A string if validation fails otherwise undefined.
 */
export const isRegExp: Validator = (
    value: any,
    key?: string,
    attributes?: IAttributes,
    options?: IConstraintOptions,
): ValidationResponse => {
    if (!(value && typeof value === 'object' && value.constructor === RegExp)) {
        return 'Value is not a regular expression.';
    }
};

/**
 * Validates if the given value is an error
 *
 * @param value - The value to validate.
 * @param key
 * @param attributes
 * @returns A string if validation fails otherwise undefined.
 */
export const isError: Validator = (
    value: any,
    key?: string,
    attributes?: IAttributes,
    options?: IConstraintOptions,
): ValidationResponse => {
    if (!(value instanceof Error && typeof value.message !== 'undefined')) {
        return 'Value is not an error.';
    }
};

/**
 * Validates if the given value is a date
 *
 * @param value - The value to validate.
 * @param key
 * @param attributes
 * @returns A string if validation fails otherwise undefined.
 */
export const isDate: Validator = (
    value: any,
    key?: string,
    attributes?: IAttributes,
    options?: IConstraintOptions,
): ValidationResponse => {
    if (!(value instanceof Date)) {
        return 'Value is not a Date.';
    }
};

/**
 * Validates if the given value is a symbol
 *
 * @param value - The value to validate.
 * @param key
 * @param attributes
 * @returns A string if validation fails otherwise undefined.
 */
export const isSymbol: Validator = (
    value: any,
    key?: string,
    attributes?: IAttributes,
    options?: IConstraintOptions,
): ValidationResponse => {
    if (typeof value !== 'symbol') {
        return 'Value is not a symbol.';
    }
};

/**
 * Validates if the given value is a promise
 *
 * @param value - The value to validate.
 * @param key
 * @param attributes
 * @returns A string if validation fails otherwise undefined.
 */
export const isPromise: Validator = (
    value: any,
    key?: string,
    attributes?: IAttributes,
    options?: IConstraintOptions,
): ValidationResponse => {
    if (!(value && value instanceof Promise)) {
        return 'Values is not a promise.';
    }
};

/**
 * Validates if the given value is of type other than primitive values.
 *
 * An object has to be passed in with the property 'type' and it's value set as a Constructor
 *
 * ```typescript
 * isType(new Date(), undefined, {type: Date});
 * ```
 *
 * @param value - The value to validate.
 * @param key
 * @param attributes { type: Function } - Expects the attribute "type" to have a function value
 * @returns A string if validation fails otherwise undefined.
 */
export const isType: Validator = (
    value: any,
    key?: string,
    attributes?: ITypeAttributes,
    options?: IConstraintOptions,
): ValidationResponse => {
    if (
        // Is Type Defined?
        typeof attributes !== 'undefined' &&
        'type' in attributes &&
        typeof attributes.type === 'function'
    ) {
        if (!(value instanceof attributes.type!)) {
            return `Value is not a type of "${attributes.type!.name}".`;
        }
    } else {
        return 'Type attribute has not been set.';
    }
};

/**
 * Validates if the given value is a DataType. Either a primitive data type or a Constructor
 *
 * @param value - The value to validate.
 * @param key
 * @param attributes
 * @returns A string if validation fails otherwise undefined.
 */
export const isDataType: Validator = (
    value: any,
    key?: string,
    attributes?: IAttributes,
    options?: IConstraintOptions,
): ValidationResponse => {
    const isPrimitive: boolean =
        typeof value === 'string' &&
        (value === 'string' ||
            value === 'boolean' ||
            value === 'null' ||
            value === 'undefined' ||
            value === 'number' ||
            value === 'symbol' ||
            value === 'object');

    const isConstructor: boolean = !isFunction(value);

    if (!isPrimitive && !isConstructor) {
        return 'Value is not a data type';
    }
};

/**
 * Validates a nested object.
 *
 * @param value Object to validate
 * @param key
 * @param attributes Should contain the constraints attribute set to a ConstraintsObject
 * @param options options during validation.
 */
export const validateNestedObject: Validator = (
    value: any,
    key?: string,
    attributes?: INestedObjectAttributes,
    options?: IConstraintOptions,
): ValidationResponse => {
    if (isObject(value)) {
        return 'Value is not an object.';
    }

    if (isObject(attributes!.constraints)) {
        return 'Constraints is not of type object.';
    }

    return Validate(value, attributes!.constraints!, options);
};

/**
 * Validates if the given value is an array buffer
 *
 * @param value - The value to validate.
 * @param key
 * @param attributes
 * @param options
 */
export const isArrayBuffer: Validator = (
    value: any,
    key?: string,
    attributes?: IArrayBufferAttributes,
    options?: IConstraintOptions,
): ValidationResponse => {
    const isTypeAttributes = {
        type: ArrayBuffer,
    };

    if (isType(value, key, isTypeAttributes, options)) {
        return 'Value is not an ArrayBuffer.';
    }
};
