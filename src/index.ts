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
    RegisterDefaultAttribute,
    RegisterDefaultValidator,
} from './isValidator';
import * as Validators from './validators';

import * as ArrayAttributes from './attributes/arrayAttributes';
import * as ArrayBufferAttributes from './attributes/arrayBufferAttributes';
import * as BooleanAttributes from './attributes/booleanAttributes';
import * as DateAttributes from './attributes/dateAttributes';
import * as ErrorAttributes from './attributes/errorAttributes';
import * as FunctionAttributes from './attributes/functionAttributes';
import * as NestedObjectAttributes from './attributes/nestedObjectAttributes';
import * as NullAttributes from './attributes/nullAttributes';
import * as NumberAttributes from './attributes/numberAttributes';
import * as ObjectAttributes from './attributes/objectAttributes';
import * as PromiseAttributes from './attributes/promiseAttributes';
import * as RegexpAttributes from './attributes/regexpAttributes';
import * as StringAttributes from './attributes/stringAttributes';
import * as SymbolAttributes from './attributes/symbolAttributes';
import * as TypeAttributes from './attributes/typeAttributes';
import * as UndefinedAttributes from './attributes/undefinedAttributes';

// Register all default validators.
RegisterDefaultValidator('exclude', undefined, true);
RegisterDefaultValidator('expect', undefined, true);
RegisterDefaultValidator('reject', undefined, true);
RegisterDefaultValidator('isString', Validators.isString, true);
RegisterDefaultValidator('isNumber', Validators.isNumber, true);
RegisterDefaultValidator('isArray', Validators.isArray, true);
RegisterDefaultValidator('isArrayBuffer', Validators.isArrayBuffer, true);
RegisterDefaultValidator('isFunction', Validators.isFunction, true);
RegisterDefaultValidator('isObject', Validators.isObject, true);
RegisterDefaultValidator('isNull', Validators.isNull, true);
RegisterDefaultValidator('isUndefined', Validators.isUndefined, true);
RegisterDefaultValidator('isBoolean', Validators.isBoolean, true);
RegisterDefaultValidator('isRegExp', Validators.isRegExp, true);
RegisterDefaultValidator('isError', Validators.isError, true);
RegisterDefaultValidator('isDate', Validators.isDate, true);
RegisterDefaultValidator('isSymbol', Validators.isSymbol, true);
RegisterDefaultValidator('isPromise', Validators.isPromise, true);
RegisterDefaultValidator('isType', Validators.isType, true);
RegisterDefaultValidator(
    'validateNestedObject',
    Validators.validateNestedObject,
    true,
);

// Register ArrayAttributes
RegisterDefaultAttribute(
    'isLengthOf',
    'isArray',
    Validators.isNumber,
    ArrayAttributes.isLengthOf,
    true,
);
RegisterDefaultAttribute(
    'isNotLengthOf',
    'isArray',
    Validators.isNumber,
    ArrayAttributes.isNotLengthOf,
    true,
);
RegisterDefaultAttribute(
    'isMinLength',
    'isArray',
    Validators.isNumber,
    ArrayAttributes.isMinLength,
    true,
);
RegisterDefaultAttribute(
    'isMaxLength',
    'isArray',
    Validators.isNumber,
    ArrayAttributes.isMaxLength,
    true,
);
RegisterDefaultAttribute(
    'isOfTypes',
    'isArray',
    ArrayAttributes.arrayTypeValueValidator,
    ArrayAttributes.isOfTypes,
    true,
);
RegisterDefaultAttribute(
    'isNotOfTypes',
    'isArray',
    ArrayAttributes.arrayTypeValueValidator,
    ArrayAttributes.isNotOfTypes,
    true,
);
RegisterDefaultAttribute(
    'isOfType',
    'isArray',
    Validators.isDataType,
    ArrayAttributes.isOfType,
    true,
);
RegisterDefaultAttribute(
    'isNotOfType',
    'isArray',
    Validators.isDataType,
    ArrayAttributes.isNotOfType,
    true,
);
RegisterDefaultAttribute(
    'isStrictOfTypes',
    'isArray',
    ArrayAttributes.arrayTypeValueValidator,
    ArrayAttributes.isStrictOfTypes,
    true,
);
RegisterDefaultAttribute(
    'hasValues',
    'isArray',
    Validators.isArray,
    ArrayAttributes.hasValues,
    true,
);
RegisterDefaultAttribute(
    'doesNotHaveValues',
    'isArray',
    Validators.isArray,
    ArrayAttributes.doesNotHaveValues,
    true,
);
RegisterDefaultAttribute(
    'isEqualTo',
    'isArray',
    Validators.isArray,
    ArrayAttributes.isEqualTo,
);
RegisterDefaultAttribute(
    'isStrictEqualTo',
    'isArray',
    Validators.isArray,
    ArrayAttributes.isStrictEqualTo,
    true,
);

// Register ArrayBufferAttributes
RegisterDefaultAttribute(
    'isEqualTo',
    'isArrayBuffer',
    Validators.isArrayBuffer,
    ArrayBufferAttributes.isEqualTo,
    true,
);

// Register DateAttributes
RegisterDefaultAttribute(
    'isEqualTo',
    'isDate',
    DateAttributes.isTypeDate,
    DateAttributes.isEqualTo,
    true,
);
RegisterDefaultAttribute(
    'isNotEqualTo',
    'isDate',
    DateAttributes.isTypeDate,
    DateAttributes.isNotEqualTo,
    true,
);
RegisterDefaultAttribute(
    'isLessThan',
    'isDate',
    DateAttributes.isTypeDate,
    DateAttributes.isLessThan,
    true,
);
RegisterDefaultAttribute(
    'isGreaterThan',
    'isDate',
    DateAttributes.isTypeDate,
    DateAttributes.isGreaterThan,
    true,
);
RegisterDefaultAttribute(
    'isLessThanOrEqualTo',
    'isDate',
    DateAttributes.isTypeDate,
    DateAttributes.isLessThanOrEqualTo,
    true,
);
RegisterDefaultAttribute(
    'isGreaterThanOrEqualTo',
    'isDate',
    DateAttributes.isTypeDate,
    DateAttributes.isGreaterThanOrEqualTo,
    true,
);

// Register FunctionAttributes
RegisterDefaultAttribute(
    'isLength',
    'isFunction',
    Validators.isNumber,
    FunctionAttributes.isLength,
    true,
);

// Register NumberAttributes
RegisterDefaultAttribute(
    'isEqualTo',
    'isNumber',
    Validators.isNumber,
    NumberAttributes.isEqualTo,
    true,
);
RegisterDefaultAttribute(
    'isNotEqualTo',
    'isNumber',
    Validators.isNumber,
    NumberAttributes.isNotEqualTo,
    true,
);
RegisterDefaultAttribute(
    'isLessThan',
    'isNumber',
    Validators.isNumber,
    NumberAttributes.isLessThan,
    true,
);
RegisterDefaultAttribute(
    'isLargerThan',
    'isNumber',
    Validators.isNumber,
    NumberAttributes.isLargerThan,
    true,
);
RegisterDefaultAttribute(
    'isLessThanOrEqualTo',
    'isNumber',
    Validators.isNumber,
    NumberAttributes.isLessThanOrEqualTo,
    true,
);
RegisterDefaultAttribute(
    'isLargerThanOrEqualTo',
    'isNumber',
    Validators.isNumber,
    NumberAttributes.isLargerThanOrEqualTo,
    true,
);

// Register ObjectAttributes
RegisterDefaultAttribute(
    'isEmpty',
    'isObject',
    Validators.isUndefined,
    ObjectAttributes.isEmpty,
    true,
);
RegisterDefaultAttribute(
    'isNotEmpty',
    'isObject',
    Validators.isUndefined,
    ObjectAttributes.isNotEmpty,
    true,
);

// Register StringAttributes
RegisterDefaultAttribute(
    'isLengthOf',
    'isString',
    Validators.isNumber,
    StringAttributes.isLengthOf,
    true,
);
RegisterDefaultAttribute(
    'isNotLengthOf',
    'isString',
    Validators.isNumber,
    StringAttributes.isNotLengthOf,
    true,
);
RegisterDefaultAttribute(
    'isMinLength',
    'isString',
    Validators.isNumber,
    StringAttributes.isMinLength,
    true,
);
RegisterDefaultAttribute(
    'isMaxLength',
    'isString',
    Validators.isNumber,
    StringAttributes.isMaxLength,
    true,
);
RegisterDefaultAttribute(
    'isUpperCase',
    'isString',
    Validators.isUndefined,
    StringAttributes.isUpperCase,
    true,
);
RegisterDefaultAttribute(
    'isLowerCase',
    'isString',
    Validators.isUndefined,
    StringAttributes.isLowerCase,
    true,
);
RegisterDefaultAttribute(
    'matchRegExp',
    'isString',
    Validators.isRegExp,
    StringAttributes.matchRegExp,
    true,
);

// Register SymbolAttributes
RegisterDefaultAttribute(
    'isEqualTo',
    'isSymbol',
    Validators.isSymbol,
    SymbolAttributes.isEqualTo,
    true,
);
RegisterDefaultAttribute(
    'isNotEqualTo',
    'isSymbol',
    Validators.isSymbol,
    SymbolAttributes.isNotEqualTo,
    true,
);
RegisterDefaultAttribute(
    'isGlobal',
    'isSymbol',
    Validators.isUndefined,
    SymbolAttributes.isGlobal,
    true,
);
RegisterDefaultAttribute(
    'isNotGlobal',
    'isSymbol',
    Validators.isUndefined,
    SymbolAttributes.isNotGlobal,
    true,
);

// Register TypeAttributes
RegisterDefaultAttribute(
    'type',
    'isType',
    Validators.isFunction,
    undefined,
    true,
);

// Register NestedObjectAttributes
RegisterDefaultAttribute(
    'constraints',
    'validateNestedObject',
    Validators.isObject,
    undefined,
    true,
);

export * from './errorHandler';
export {
    IConstraints,
    IConstraintOptions,
    IPropertyConstraints,
    GetAttributeValidator,
    GetValidator,
    GetWrappedAttributeValidator,
    GetWrappedValidator,
    RegisterAttribute,
    RegisterValidator,
    RemoveAttribute,
    RemoveValidator,
    Validate,
    ValidateValue,
} from './isValidator';

export { IAttributes, AttributeValidator } from './attributes/attributes';
export { IArrayAttributes } from './attributes/arrayAttributes';
export { IArrayBufferAttributes } from './attributes/arrayBufferAttributes';
export { IBooleanAttributes } from './attributes/booleanAttributes';
export { IDateAttributes } from './attributes/dateAttributes';
export { IErrorAttributes } from './attributes/errorAttributes';
export { IFunctionAttributes } from './attributes/functionAttributes';
export { INestedObjectAttributes } from './attributes/nestedObjectAttributes';
export { INullAttributes } from './attributes/nullAttributes';
export { INumberAttributes } from './attributes/numberAttributes';
export { IObjectAttributes } from './attributes/objectAttributes';
export { IPromiseAttributes } from './attributes/promiseAttributes';
export { IRegexpAttributes } from './attributes/regexpAttributes';
export { IStringAttributes } from './attributes/stringAttributes';
export { ISymbolAttributes } from './attributes/symbolAttributes';
export { ITypeAttributes } from './attributes/typeAttributes';
export { IUndefinedAttributes } from './attributes/undefinedAttributes';

export { Validators };
