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
 * Attributes specifically used in combination with the [[array]] validator.
 */

import { ErrorHandler } from '../errorHandler';
import { Func, getTypeValidator } from '../utils';
import { isArray, isDataType, isType, ValidationResponse } from '../validators';
import { AttributeValidator, IAttributes } from './attributes';

/**
 * Union type used for validating array element types
 */
export type DataType = string | Func;

/**
 * DataType array used to validate array element types.
 */
export type TypeArray = DataType[];

/**
 * Interface typings for all the available default array attributes. See specific attribute validator for more information.
 */
export interface IArrayAttributes extends IAttributes {
    isLengthOf?: number;
    isNotLengthOf?: number;
    isMinLength?: number;
    isMaxLength?: number;
    isOfTypes?: TypeArray;
    isNotOfTypes?: TypeArray;
    isOfType?: DataType;
    isNotOfType?: DataType;
    isStrictOfTypes?: TypeArray;
    hasValues?: any[];
    doesNotHaveValues?: any[];
    isEqualTo?: any[];
    isStrictEqualTo?: any[];
}

/**
 * Validates that the array is of length n
 *
 * @param value Array to validate
 * @param validationValue validation length
 * @returns string if validation fails | undefined
 */
export const isLengthOf: AttributeValidator = (
    value: any[],
    validationValue: number,
): ValidationResponse => {
    if (value.length !== validationValue) {
        return `The array is not equal the length "${validationValue}".`;
    }
};

/**
 * Validates that the array is not of length n
 *
 * @param value Array to validate
 * @param validationValue validation length
 * @returns string if validation fails | void
 */
export const isNotLengthOf: AttributeValidator = (
    value: any[],
    validationValue: number,
): ValidationResponse => {
    if (value.length === validationValue) {
        return `The array is not equal the length "${validationValue}".`;
    }
};

/**
 * Validates that the array is of least length n
 *
 * @param value Array to validate
 * @param validationValue minimum validation length
 * @returns string if validation fails | void
 */
export const isMinLength: AttributeValidator = (
    value: any[],
    validationValue: number,
): ValidationResponse => {
    if (value.length < validationValue) {
        return `The array is not larger or equal to "${validationValue}".`;
    }
};

/**
 * Validates that the array is of max length n
 *
 * @param value Array to validate
 * @param validationValue Maximum validation length
 * @returns string if validation fails | void
 */
export const isMaxLength: AttributeValidator = (
    value: any[],
    validationValue: number,
): ValidationResponse => {
    if (value.length > validationValue) {
        return `The array is not less than or equal to "${validationValue}".`;
    }
};

/**
 * Validates that the array is of the given types
 *
 * @param value Array to validate
 * @param validationValue list of types
 * @returns string | ErrorReport | void
 */
export const isOfTypes: AttributeValidator = (
    value: any[],
    validationValue: TypeArray,
): ValidationResponse => {
    const errorHandler = new ErrorHandler();

    value.forEach((element, index) => {
        let isValid: ValidationResponse;

        validationValue.find((type) => {
            isValid = compareTypes(element, type);

            return isValid ? false : true;
        });

        if (isValid) {
            errorHandler.reportError(
                `${index}`,
                'Element is not of given types.',
            );
        }
    });

    return errorHandler.getReport();
};

/**
 * Validates that the array isn't of the given types
 *
 * @param value Array to validate
 * @param validationValue list of types
 * @returns string | ErrorReport | void
 */
export const isNotOfTypes: AttributeValidator = (
    value: any[],
    validationValue: TypeArray,
): ValidationResponse => {
    const errorHandler = new ErrorHandler();

    value.forEach((element, index) => {
        let isValid: ValidationResponse;

        validationValue.find((type) => {
            isValid = compareTypes(element, type);

            return isValid ? false : true;
        });

        if (!isValid) {
            errorHandler.reportError(`${index}`, `Element is of given types.`);
        }
    });

    return errorHandler.getReport();
};

/**
 * Validates that the array is of the given type.
 *
 * @param value Array to validate
 * @param validationValue single type to validate
 * @returns string | ErrorReport | void
 */
export const isOfType: AttributeValidator = (
    value: any[],
    validationValue: DataType,
): ValidationResponse => {
    const errorHandler: ErrorHandler = new ErrorHandler();

    value.forEach((element, index) => {
        const isValid: ValidationResponse = compareTypes(
            element,
            validationValue,
        );

        if (isValid) {
            errorHandler.reportError(`${index}`, isValid);
        }
    });

    return errorHandler.getReport();
};

/**
 * Validates that the array is strictly not the given type.
 *
 * @param value Array to validate
 * @param validationValue single type to validate
 * @returns string | ErrorReport | void
 */
export const isNotOfType: AttributeValidator = (
    value: any[],
    validationValue: DataType,
): ValidationResponse => {
    const errorHandler: ErrorHandler = new ErrorHandler();

    const typeName: string =
        typeof validationValue === 'string'
            ? validationValue
            : validationValue.name;

    value.forEach((element, index) => {
        const isNotValid: ValidationResponse = compareTypes(
            element,
            validationValue,
        );

        if (!isNotValid) {
            errorHandler.reportError(
                `${index}`,
                `Element is of type '${typeName}'`,
            );
        }
    });

    return errorHandler.getReport();
};

/**
 * Validates that the array element types are exactly ordered as in the validation input.
 *
 * @param value Array to validate
 * @param validationValue List of types
 * @returns string | ErrorReport | void
 */
export const isStrictOfTypes: AttributeValidator = (
    value: any[],
    validationValue: TypeArray,
): ValidationResponse => {
    const errorHandler: ErrorHandler = new ErrorHandler();

    validationValue.forEach((type, index) => {
        const isValid: ValidationResponse = compareTypes(value[index], type);

        if (typeof isValid !== 'undefined') {
            errorHandler.reportError(`${index}`, isValid);
        }
    });

    value.slice(validationValue.length).forEach((element, index) => {
        errorHandler.reportError(
            `${index + validationValue.length}`,
            'No type defined',
        );
    });

    return errorHandler.getReport();
};

/**
 * Validates that the array contains given values.
 *
 * @param value Array to validate
 * @param validationValue List of values
 * @returns string | ErrorReport | void
 */
export const hasValues: AttributeValidator = (
    value: any[],
    validationValue: any[],
): ValidationResponse => {
    const errorHandler: ErrorHandler = new ErrorHandler();
    validationValue.forEach((toFind, index) => {
        const exists: boolean = value.some((element) => {
            return element === toFind;
        });

        if (!exists) {
            errorHandler.reportError(
                `${index}`,
                'Value does not exist in the given Array',
            );
        }
    });

    return errorHandler.getReport();
};

/**
 * Validates that the array does not contain give values
 *
 * @param value Array to validate
 * @param validationValue List of values
 * @returns string | ErrorReport | void
 */
export const doesNotHaveValues: AttributeValidator = (
    value: any[],
    validationValue: any[],
): ValidationResponse => {
    const errorHandler: ErrorHandler = new ErrorHandler();
    validationValue.forEach((toFind, index) => {
        const exists: boolean = value.some((element) => {
            return element === toFind;
        });

        if (exists) {
            errorHandler.reportError(
                `${index}`,
                'Value should not exist in the array.',
            );
        }
    });

    return errorHandler.getReport();
};

/**
 * Out of order array validation between the given array and the array to validate
 *
 * @param value Array to validate
 * @param validationValue List of values
 * @returns string | ErrorReport | void
 */
export const isEqualTo: AttributeValidator = (
    value: any[],
    validationValue: any[],
): ValidationResponse => {
    const valuesCopy = Array.from(value);
    const validationValuesCopy = Array.from(validationValue);
    const errorHandler: ErrorHandler = new ErrorHandler();

    if (valuesCopy.length === validationValuesCopy.length) {
        valuesCopy.forEach((element, elementIndex) => {
            const matchingValidationIndex = validationValuesCopy.findIndex(
                (validationElement) => {
                    return element === validationElement;
                },
            );

            if (matchingValidationIndex > -1) {
                validationValuesCopy.splice(matchingValidationIndex, 1);
            } else {
                errorHandler.reportError(
                    `${elementIndex}`,
                    'Value does not equal any given validation value',
                );
            }
        });
    } else {
        return 'Input Array does not match Validation Array size';
    }

    return errorHandler.getReport();
};

/**
 * In order comparison between the given array and the array to validate.
 *
 * @param value Array to validate
 * @param validationValue list of values
 * @returns string | ErrorReport | void
 */
export const isStrictEqualTo: AttributeValidator = (
    value: any[],
    validationValue: any[],
): ValidationResponse => {
    const errorHandler: ErrorHandler = new ErrorHandler();

    if (value.length === validationValue.length) {
        value.forEach((element, index) => {
            if (element !== validationValue[index]) {
                errorHandler.reportError(
                    `${index}`,
                    `Value does not equal given validation value`,
                );
            }
        });
    } else {
        return 'Input Array does not match Validation Array size';
    }

    return errorHandler.getReport();
};

/**
 *
 * Returns if the types match
 *
 * @param value
 * @param type
 */
const compareTypes = (value: any, type: string | Func): ValidationResponse => {
    return typeof type !== 'string'
        ? isType(value, undefined, { type })
        : getTypeValidator(value, type);
};

/**
 * Attribute Argument validator that ensures that an array containing types is passed as an argument.
 *
 * @param value
 * @param key
 * @param attributes
 */
export const arrayTypeValueValidator = (
    value: any[],
    key?: string,
    attributes?: IAttributes,
): ValidationResponse => {
    let isNotType: ValidationResponse = isArray(value);

    if (isNotType) {
        return isNotType;
    }

    const errorHandler: ErrorHandler = new ErrorHandler();

    value.forEach((element, index) => {
        isNotType = isDataType(element);

        if (isNotType) {
            errorHandler.reportError(`${index}`, isNotType);
        }
    });

    return errorHandler.getReport();
};
