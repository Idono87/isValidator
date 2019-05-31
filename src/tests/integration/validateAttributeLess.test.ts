import { expect } from 'chai';
import { Validate, IConstraints } from '../..';

describe('Validators integration tests', function() {
    const input = {
        nullTest: null,
        undefinedTest: undefined,
        booleanTest: true,
        regularExpressionTest: /abc/,
        errorTest: new Error('Test Error'),
        promiseTest: new Promise(() => {}),
    };

    const constraints: IConstraints = {
        nullTest: {
            isNull: {},
        },
        undefinedTest: {
            isUndefined: {},
        },
        booleanTest: {
            isBoolean: {},
        },
        regularExpressionTest: {
            isRegExp: {},
        },
        errorTest: {
            isError: {},
        },
        promiseTest: {
            isPromise: {},
        },
    };

    it('Expect to pass validation', function() {
        expect(Validate(input, constraints)).to.be.undefined;
    });
});
