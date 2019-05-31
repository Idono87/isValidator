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
 * Interface typings for all the available default object attributes. See specific attribute validator for more information.
 */
export interface IObjectAttributes extends IAttributes {
    isEmpty?: undefined;
    isNotEmpty?: undefined;
}

/**
 *
 * Checks that the object is empty.
 *
 * @param value - Object - Object to validate
 * @param validationValue - boolean - True if the object should be empty, False if the object should be populated.
 */
export const isEmpty: AttributeValidator = (
    value: object,
    validationValue: boolean,
): ValidationResponse => {
    const enumerablePropertiesCount: number = Object.keys(value).length;

    if (enumerablePropertiesCount > 0) {
        return 'Object is not expected to be empty.';
    }
};

/**
 * Checks that the object is not empty.
 *
 * @param value - Object - Object to validate
 * @param validationValue - boolean - True if the object should be empty, False if the object should be populated.
 */
export const isNotEmpty: AttributeValidator = (
    value: object,
    validationValue: boolean,
): ValidationResponse => {
    const enumerablePropertiesCount: number = Object.keys(value).length;

    if (enumerablePropertiesCount < 1) {
        return 'Object is not expected to be empty.';
    }
};
