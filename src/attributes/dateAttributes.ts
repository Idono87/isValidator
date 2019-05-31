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

import { isType, ValidationResponse } from '../validators';
import { AttributeValidator, IAttributes } from './attributes';

/**
 * Interface typings for all the available date attributes. See specific attribute validator for more information.
 */
export interface IDateAttributes extends IAttributes {
    isEqualTo?: Date;
    isNotEqualTo?: Date;
    isLessThan?: Date;
    isGreaterThan?: Date;
    isLessThanOrEqualTo?: Date;
    isGreaterThanOrEqualTo?: Date;
}

/**
 * Compares if the dates are equal to each other.
 *
 * @param value - Date - Date to compare
 * @param validationValue - Date - Date to compare to.
 */
export const isEqualTo: AttributeValidator = (
    value: Date,
    validationValue: Date,
): ValidationResponse => {
    if (value.getTime() !== validationValue.getTime()) {
        return 'Date is not equal to the validation date.';
    }
};

/**
 * Compares if the dates are not equal to each other.
 *
 * @param value - Date - Date to compare
 * @param validationValue - Date - Date to compare to.
 */
export const isNotEqualTo: AttributeValidator = (
    value: Date,
    validationValue: Date,
): ValidationResponse => {
    if (value.getTime() === validationValue.getTime()) {
        return 'Date is not equal to the validation date.';
    }
};

/**
 * Compares if the date is less than the comparison date.
 *
 * @param value - Date - Date to compare
 * @param validationValue - Date - Date to compare to.
 */
export const isLessThan: AttributeValidator = (
    value: Date,
    validationValue: Date,
): ValidationResponse => {
    if (value.getTime() >= validationValue.getTime()) {
        return 'Date is not less than the validation date.';
    }
};

/**
 * Validates if the given date is greater than the comparison date.
 *
 * @param value - Date - Date to compare
 * @param validationValue - Date - Date to compare to.
 */
export const isGreaterThan: AttributeValidator = (
    value: Date,
    validationValue: Date,
): ValidationResponse => {
    if (value.getTime() <= validationValue.getTime()) {
        return 'Date is not greater than the validation date.';
    }
};

/**
 * Validates if the given date is less or equal to the comparison date.
 *
 * @param value - Date - Date to compare
 * @param validationValue - Date - Date to compare to.
 */
export const isLessThanOrEqualTo: AttributeValidator = (
    value: Date,
    validationValue: Date,
): ValidationResponse => {
    if (value.getTime() > validationValue.getTime()) {
        return 'Date is not less than or equal to the validation date.';
    }
};

/**
 * Validates if the given date is greater or equal to the comparison date.
 *
 * @param value - Date - Date to compare
 * @param validationValue - Date - Date to compare to.
 */
export const isGreaterThanOrEqualTo: AttributeValidator = (
    value: Date,
    validationValue: Date,
): ValidationResponse => {
    if (value.getTime() < validationValue.getTime()) {
        return 'Date is not greater ot equal to the validation date.';
    }
};

/**
 * Validates if the passed in attributes are of type Date. Internal attribute validator.
 *
 * @param value
 * @param key
 * @param attributes
 */
export const isTypeDate = (
    value: any,
    key?: string,
    attributes?: IAttributes,
): ValidationResponse => {
    const isNotValid: ValidationResponse = isType(value, undefined, {
        type: Date,
    });

    if (isNotValid) {
        return 'Attribute value is expected to be of type Date';
    }
};
