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

import { ValidationResponse, Validator } from '../validators';

/**
 * Function signature for all attribute validators.
 */
export type AttributeValidator = (
    value: any,
    validationValue: any,
) => ValidationResponse;

/**
 * Attribute description used to describe an attribute type and optionally a attribute validator.
 * Used in conjunction with registering a new validator or an individual attribute.
 */
export interface IAttributeObject {
    attributeArgumentValidator: Validator;
    attributeValidator?: AttributeValidator;
    defaultAttribute: boolean;
}

/**
 * List of attributes to append into a validator description object.
 */
export interface IValidatorAttributes {
    [attribute: string]: IAttributeObject;
}

/**
 * Default Attributes interface. Extend this when creating a new interface that describes the available
 * attributes for a new validator.
 */
export interface IAttributes {}
