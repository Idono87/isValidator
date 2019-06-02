import {
    isBoolean,
    isFunction,
    isNull,
    isNumber,
    isObject,
    isString,
    isSymbol,
    isUndefined,
    ValidationResponse,
    Validator,
} from './validators';

// Function type
export type Func = (...args: any) => any;

/**
 *
 * Calls the correct validator for all types.
 *
 * @param value
 * @param type
 */
export const getTypeValidator = (
    value: any,
    type: string,
): ValidationResponse => {
    let validator: Validator;
    switch (type) {
        case 'string':
            validator = isString;
            break;
        case 'boolean':
            validator = isBoolean;
            break;
        case 'number':
            validator = isNumber;
            break;
        case 'null':
            validator = isNull;
            break;
        case 'undefined':
            validator = isUndefined;
            break;
        case 'symbol':
            validator = isSymbol;
            break;
        case 'object':
            validator = isObject;
            break;
        case 'function':
            validator = isFunction;
            break;
    }
    return validator!(value);
};
