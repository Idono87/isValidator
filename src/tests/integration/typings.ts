import { IConstraintOptions, IConstraints } from '../..';

const constraints: IConstraints = {
    testProperty: {
        exclude: true,
        expect: true,
        isArray: {
            doesNotHaveValues: [1, 2, 3],
            hasValues: [1, 2, 3],
            isEqualTo: [1, 2, 3],
            isLengthOf: 5,
            isMaxLength: 5,
            isMinLength: 5,
            isNotLengthOf: 5,
            isNotOfType: Date,
            isNotOfTypes: ['string', Date],
            isOfType: 'string',
            isOfTypes: ['string', Date],
            isStrictEqualTo: [1, 2, 3],
            isStrictOfTypes: ['string', Date],
        },
        isBoolean: {},
        isDate: {
            isEqualTo: new Date(),
            isGreaterThan: new Date(),
            isGreaterThanOrEqualTo: new Date(),
            isLessThan: new Date(),
            isLessThanOrEqualTo: new Date(),
            isNotEqualTo: new Date(),
        },
        isError: {},
        isFunction: {
            isLength: 5,
        },
        isNull: {},
        isNumber: {
            isEqualTo: 5,
            isLargerThan: 5,
            isLargerThanOrEqualTo: 5,
            isLessThan: 5,
            isLessThanOrEqualTo: 5,
            isNotEqualTo: 5,
        },
        isObject: {
            isEmpty: undefined,
            isNotEmpty: undefined,
        },
        isPromise: {},
        isRegExp: {},
        isString: {
            isLengthOf: 5,
            isLowerCase: undefined,
            isMaxLength: 5,
            isMinLength: 5,
            isNotLengthOf: 5,
            isUpperCase: undefined,
            matchRegExp: /abc/,
        },
        isSymbol: {
            isEqualTo: Symbol(),
            isGlobal: undefined,
            isNotEqualTo: Symbol(),
            isNotGlobal: undefined,
        },
        isType: {
            type: Date,
        },
        isUndefined: {},
        reject: true,
        validateNestedObject: {
            constraints: {
                property: {
                    isString: {},
                },
            },
        },
    },
};

const constraintOptions: IConstraintOptions = {
    strict: false,
};
