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

import { ValidationResponse } from '../validators';
import { AttributeValidator, IAttributes } from './attributes';

/**
 * Interface typings for all the available default number attributes. See specific attribute validator for more information.
 */
export interface INumberAttributes extends IAttributes {
    isEqualTo?: number;
    isNotEqualTo?: number;
    isLessThan?: number;
    isLargerThan?: number;
    isLessThanOrEqualTo?: number;
    isLargerThanOrEqualTo?: number;
}

/**
 * Validates that the value equals the validation value.
 *
 * @param value - number - Number to validate
 * @param validationValue - number - number to compare to.
 */
export const isEqualTo: AttributeValidator = (
    value: number,
    validationValue: number,
): ValidationResponse => {
    if (value !== validationValue) {
        return `The number "${value}" does not equal "${validationValue}".`;
    }
};

/**
 * Validates that the value equals the validation value.
 *
 * @param value - number - Number to validate
 * @param validationValue - number - number to compare to.
 */
export const isNotEqualTo: AttributeValidator = (
    value: number,
    validationValue: number,
): ValidationResponse => {
    if (value === validationValue) {
        return `The number "${value}" does equal "${validationValue}".`;
    }
};

/**
 * Validates that the value is less than the validation value
 *
 * @param value - number - number to validate
 * @param validationValue - number - number to compare to.
 */
export const isLessThan: AttributeValidator = (
    value: number,
    validationValue: number,
): ValidationResponse => {
    if (value >= validationValue) {
        return `The number "${value}" is not less than "${validationValue}".`;
    }
};
/**
 * Validates that the value is larger than the validation value
 *
 * @param value - number - number to validate
 * @param validationValue - number - number to compare to.
 */
export const isLargerThan: AttributeValidator = (
    value: number,
    validationValue: number,
): ValidationResponse => {
    if (value <= validationValue) {
        return `The number "${value}" is not larger than "${validationValue}".`;
    }
};
/**
 * Validates that the value is less than or equal to  the validation value
 *
 * @param value - number - number to validate
 * @param validationValue - number - number to compare to.
 */
export const isLessThanOrEqualTo: AttributeValidator = (
    value: number,
    validationValue: number,
): ValidationResponse => {
    if (value > validationValue) {
        return `The number "${value}" is not less than or equal to "${validationValue}".`;
    }
};
/**
 * Validates that the value is larger than or equal to the validation value
 *
 * @param value - number - number to validate
 * @param validationValue - number - number to compare to.
 */
export const isLargerThanOrEqualTo: AttributeValidator = (
    value: number,
    validationValue: number,
): ValidationResponse => {
    if (value < validationValue) {
        return `The number "${value}" is not larger than or equal to "${validationValue}".`;
    }
};
