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
 * Interface typings for all the available default symbol attributes. See specific attribute validator for more information.
 */
export interface ISymbolAttributes extends IAttributes {
    isEqualTo?: symbol;
    isNotEqualTo?: symbol;
    isGlobal?: undefined;
    isNotGlobal?: undefined;
}

/**
 * Compares the validation value with the attribute value for equality
 *
 * @param value - Symbol - Symbol to compare
 * @param validationValue - Symbol - Symbol to compare to.
 */
export const isEqualTo: AttributeValidator = (
    value: symbol,
    validationValue: symbol,
): ValidationResponse => {
    if (value !== validationValue) {
        return 'Symbols are not equal.';
    }
};

/**
 * Compares the validation value with the attribute value for inequality
 *
 * @param value - Symbol - Symbol to compare
 * @param validationValue - Symbol - Symbol to compare to.
 */
export const isNotEqualTo: AttributeValidator = (
    value: symbol,
    validationValue: symbol,
): ValidationResponse => {
    if (value === validationValue) {
        return 'Symbol are equal.';
    }
};

/**
 * Check if the symbol is a runtime wide (global) symbol.
 *
 * @param value - Symbol - Symbol to compare
 * @param validationValue - undefined - not used
 */
export const isGlobal: AttributeValidator = (
    value: symbol,
    validationValue: undefined,
): ValidationResponse => {
    const symbolKey: string | undefined = Symbol.keyFor(value);
    if (typeof symbolKey === 'string') {
        const globalSymbol: symbol = Symbol.for(symbolKey);
        if (value === globalSymbol) {
            return;
        }
    }

    return 'Not a global symbol.';
};

/**
 * Check if the symbol is not a runtime wide (global) symbol
 *
 * @param value - Symbol - Symbol to compare
 * @param validationValue - undefined - not used
 */
export const isNotGlobal: AttributeValidator = (
    value: symbol,
    validationValue: undefined,
): ValidationResponse => {
    const symbolKey: string | undefined = Symbol.keyFor(value);
    if (typeof symbolKey === 'string') {
        const globalSymbol: symbol = Symbol.for(symbolKey);
        if (value === globalSymbol) {
            return 'Symbol is global';
        }
    }
};
