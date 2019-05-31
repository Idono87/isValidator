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

import {
    isBoolean,
    isNumber,
    isRegExp,
    ValidationResponse,
} from '../validators';
import {
    AttributeValidator,
    IAttributes,
    IValidatorAttributes,
} from './attributes';

/**
 * Interface typings for all the available default string attributes. See specific attribute validator for more information.
 */
export interface IStringAttributes extends IAttributes {
    isLengthOf?: number;
    isNotLengthOf?: number;
    isMinLength?: number;
    isMaxLength?: number;
    isUpperCase?: undefined;
    isLowerCase?: undefined;
    matchRegExp?: RegExp;
}

/**
 * Validates that the string is of length n.
 *
 * @param value - string - string to validate
 * @param validationValue - number - validation length
 * @returns string if validation fails | void
 */
export const isLengthOf: AttributeValidator = (
    value: string,
    validationValue: number,
): ValidationResponse => {
    if (value.length !== validationValue) {
        return `The string "${value}" is not equal the length "${validationValue}".`;
    }
};

/**
 * Validates that the string is not of length n.
 *
 * @param value - string - string to validate
 * @param validationValue - number - validation length
 * @returns string if validation fails | void
 */
export const isNotLengthOf: AttributeValidator = (
    value: string,
    validationValue: number,
): ValidationResponse => {
    if (value.length === validationValue) {
        return `The string "${value}" is not equal the length "${validationValue}".`;
    }
};

/**
 * Validates that the string length is larger or equal to n
 *
 * @param value - string - string to validate
 * @param validationValue - number - min length
 * @returns string if validation fails | void
 */
export const isMinLength: AttributeValidator = (
    value: string,
    validationValue: number,
): ValidationResponse => {
    if (value.length < validationValue) {
        return `The string "${value}" is not larger or equal to "${validationValue}".`;
    }
};

/**
 * Validates that the string length is less or equal to n
 *
 * @param value - string - string to validate
 * @param validationValue - number - max length
 * @returns string if validation fails | void
 */
export const isMaxLength: AttributeValidator = (
    value: string,
    validationValue: number,
): ValidationResponse => {
    if (value.length > validationValue) {
        return `The string "${value}" is not less or equal to "${validationValue}".`;
    }
};

/**
 * Validates the string as uppercase
 *
 * @param value - string - string to validate
 * @param validationValue - undefined - not used
 */
export const isUpperCase: AttributeValidator = (
    value: string,
    validationValue: undefined,
): ValidationResponse => {
    if (value.localeCompare(value.toLocaleUpperCase()) !== 0) {
        return 'String is not all uppercase.';
    }
};

/**
 * Validates the string as lowercase
 *
 * @param value - string - string to validate
 * @param validationValue - undefined - not used
 */
export const isLowerCase: AttributeValidator = (
    value: string,
    validationValue: undefined,
): ValidationResponse => {
    if (value.localeCompare(value.toLocaleLowerCase()) !== 0) {
        return 'String is not all lowercase.';
    }
};

/**
 * Validates that the string matches the regular expression.
 *
 * @param value - string - string to validate
 * @param validationValue - RegExp - Regular expression to test against.
 */
export const matchRegExp: AttributeValidator = (
    value: string,
    validationValue: RegExp,
): ValidationResponse => {
    if (!validationValue.test(value)) {
        return 'No match was found.';
    }
};
