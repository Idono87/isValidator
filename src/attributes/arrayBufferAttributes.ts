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
 * Interface typings for all the available array buffer attributes. See specific attribute validator for more information.
 */
export interface IArrayBufferAttributes extends IAttributes {
    isEqualTo?: ArrayBuffer;
}

/**
 * Compares equality between the validated ArrayBuffer and the given ArrayBuffer attribute argument.
 *
 * @param value ArrayBuffer to compare
 * @param validationValue ArrayBuffer to compare to.
 * @returns string if validation fails | undefined
 */
export const isEqualTo: AttributeValidator = (
    value: ArrayBuffer,
    validationValue: ArrayBuffer,
): ValidationResponse => {
    const errMessage: string = 'Buffers are not equal.';
    if (value.byteLength !== validationValue.byteLength) {
        return errMessage;
    }

    const byteLength: number = value.byteLength;
    const bufferView: Uint8Array = new Uint8Array(value);
    const compareBufferView: Uint8Array = new Uint8Array(validationValue);

    for (let i = 0; i < byteLength; i++) {
        if (bufferView[i] !== compareBufferView[i]) {
            return errMessage;
        }
    }
};
