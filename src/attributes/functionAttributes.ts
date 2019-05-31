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

import { Func } from '../utils';
import { ValidationResponse } from '../validators';
import { AttributeValidator, IAttributes } from './attributes';

/**
 * Interface typings for all the available default function attributes. See specific attribute validator for more information.
 */
export interface IFunctionAttributes extends IAttributes {
    isLength?: number;
}

/**
 * Compares the number of arguments of the function to the supplied attribute validation value.
 *
 * @param value - Function - function to test length of.
 * @param validationValue - number - number to compare to.
 */
export const isLength: AttributeValidator = (
    value: Func,
    validationValue: number,
): ValidationResponse => {
    if (value.length !== validationValue) {
        return 'Function length does not match supplied attribute validation value.';
    }
};
