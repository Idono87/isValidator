import { expect } from 'chai';
import { IConstraintOptions, IConstraints } from '../../isValidator';
import * as Validators from '../../validators';

describe('Validator Tests', function() {
    describe('isString', function() {
        it('Expect primitive string to pass', function() {
            expect(Validators.isString('Primitive String', 'customKey', {})).to
                .be.undefined;
        });

        it('Expect object String to pass', function() {
            expect(
                Validators.isString(
                    new String('Object String'),
                    'customKey',
                    {},
                ),
            ).to.be.undefined;
        });

        it('Expect non string value to generate a string return type', function() {
            expect(Validators.isString({}, 'customKey', {})).to.be.a('string');
        });
    });

    describe('isNumber', function() {
        it('Expect primitive number to pass', function() {
            expect(Validators.isNumber(2000, 'customKey', {})).to.be.undefined;
        });

        it('Expect primitive string number to pass', function() {
            expect(Validators.isNumber('2000', 'customKey', {})).to.be
                .undefined;
        });

        it('Expect infinite number to fail', function() {
            expect(
                Validators.isNumber(Number.POSITIVE_INFINITY, 'customKey', {}),
            ).to.be.undefined;
        });

        it('Expect a non number to fail', function() {
            expect(Validators.isNumber({}, 'customKey', {})).to.be.a('string');
        });
    });

    describe('isArray', function() {
        it('Expect array to pass', function() {
            expect(Validators.isArray([], 'customKey', {})).to.be.undefined;
        });

        it('Expect object to fail', function() {
            expect(Validators.isArray({}, 'customKey', {})).to.be.a('string');
        });

        it('Expect no value to fail', function() {
            let undefinedInput: undefined;
            expect(Validators.isArray(undefinedInput, 'customKey', {})).to.be.a(
                'string',
            );
        });
    });

    describe('isFunction', function() {
        it('Expect to pass with function parameter', function() {
            expect(Validators.isFunction(function() {}, 'customKey', {})).to.be
                .undefined;
        });

        it('Expect function to fail', function() {
            expect(Validators.isFunction({}, 'customKey', {})).to.be.a(
                'string',
            );
        });
    });

    describe('isObject', function() {
        it('Expect to pass with object parameters', function() {
            expect(Validators.isObject({}, 'customKey', {})).to.be.undefined;
        });

        it('Expect to fail with array parameter', function() {
            expect(Validators.isObject(new Array(), 'customKey', {})).to.be.a(
                'string',
            );
        });
    });

    describe('isNull', function() {
        it('Expect to pass with null parameter', function() {
            expect(Validators.isNull(null, 'customKey', {})).to.be.undefined;
        });

        it('Expect to fail with set parameter', function() {
            expect(Validators.isNull('something', 'customKey', {})).to.be.a(
                'string',
            );
        });
    });

    describe('isUndefined', function() {
        it('Expect to pass with undefined argument', function() {
            let nothing: undefined;
            expect(Validators.isUndefined(nothing, 'customKey', {})).to.be
                .undefined;
        });

        it('Expect to fail with set parameter', function() {
            expect(
                Validators.isUndefined('something', 'customKey', {}),
            ).to.be.a('string');
        });
    });

    describe('isBoolean', function() {
        it('Expect to pass with boolean arugment', function() {
            expect(Validators.isBoolean(true, 'customKey', {})).to.be.undefined;
        });

        it('Expect to fail with nonboolean argument', function() {
            expect(
                Validators.isBoolean('not boolean', 'customKey', {}),
            ).to.be.a('string');
        });
    });

    describe('isRegExp', function() {
        it('Expect to pass with RegExp argument', function() {
            expect(Validators.isRegExp(/abcd/, 'customKey', {})).to.be
                .undefined;
        });

        it('Expect to fail with nonRegExp argument', function() {
            expect(
                Validators.isRegExp('Not a RegExp', 'customKey', {}),
            ).to.be.a('string');
        });
    });

    describe('isError', function() {
        it('Expect to pass with Error Argument', function() {
            expect(Validators.isError(new Error('Message'), 'customKey', {})).to
                .be.undefined;
        });

        it('Expect to pass with TypeError Argument', function() {
            expect(
                Validators.isError(new TypeError('Message'), 'customKey', {}),
            ).to.be.undefined;
        });

        it('Expect to fail with non Error Argument', function() {
            expect(Validators.isError('not an error', 'customKey', {})).to.be.a(
                'string',
            );
        });
    });

    describe('isDate', function() {
        it('Expect to pass with Date argument', function() {
            expect(Validators.isDate(new Date(), 'customKey', {})).to.be
                .undefined;
        });

        it('Expect to fail with non Date argument', function() {
            expect(Validators.isDate('not a date', 'customKey', {})).to.be.a(
                'string',
            );
        });
    });

    describe('isSymbol', function() {
        it('Expect to pass with Symbol argument', function() {
            expect(Validators.isSymbol(Symbol(), 'customKey', {})).to.be
                .undefined;
        });

        it('Expect to fail with non symbol argument', function() {
            expect(
                Validators.isSymbol('not a symbol', 'customKey', {}),
            ).to.be.a('string');
        });
    });

    describe('isPromise', function() {
        it('Expect to pass with promise argument', function() {
            expect(Validators.isPromise(new Promise(() => {}), 'customKey', {}))
                .to.be.undefined;
        });

        it('Expect to fail with non promise argument', function() {
            expect(
                Validators.isPromise('not a promise', 'customKey', {}),
            ).to.be.a('string');
        });
    });

    describe('isType', function() {
        class TestType {}
        class DerivedTestType extends TestType {}

        it('Expect type to match.', function() {
            expect(
                Validators.isType(new TestType(), 'no name', {
                    type: TestType,
                }),
            ).to.be.undefined;
        });

        it('Expect type to match base type.', function() {
            expect(
                Validators.isType(new DerivedTestType(), 'no name', {
                    type: TestType,
                }),
            ).to.be.undefined;
        });

        it('Expect base type to not match derived type', function() {
            expect(
                Validators.isType(new TestType(), 'no name', {
                    type: DerivedTestType,
                }),
            ).to.be.a('string');
        });

        it('Expect missing type', function() {
            expect(Validators.isType(new TestType())).to.be.a('string');
        });
    });

    describe('isDataType', function() {
        it('Expect to pass with all primitive data type', function() {
            expect(
                Validators.isDataType('string'),
                'Expecting to pass with "string" primitive type',
            ).to.be.undefined;

            expect(
                Validators.isDataType('boolean'),
                'Expecting to pass with "boolean" primitive type',
            ).to.be.undefined;

            expect(
                Validators.isDataType('null'),
                'Expecting to pass with "null" primitive type',
            ).to.be.undefined;

            expect(
                Validators.isDataType('undefined'),
                'Expecting to pass with "undefined" primitive type',
            ).to.be.undefined;

            expect(
                Validators.isDataType('number'),
                'Expecting to pass with "number" primitive type',
            ).to.be.undefined;

            expect(
                Validators.isDataType('symbol'),
                'Expecting to pass with "symbol" primitive type',
            ).to.be.undefined;

            expect(
                Validators.isDataType('object'),
                'Expecting to pass with "object" primitive type',
            ).to.be.undefined;

            expect(
                Validators.isDataType(function() {}),
                'Expecting to pass with "function" type',
            ).to.be.undefined;
        });

        it('Expect to fail with non data type', function() {
            expect(Validators.isDataType({})).to.be.a('string');
        });
    });

    describe('isArrayBuffer', function() {
        it('Expect to pass with an arraybuffer value', function() {
            const arrayBuffer = new ArrayBuffer(20);
            expect(Validators.isArrayBuffer(arrayBuffer)).to.be.undefined;
        });

        it('Expect to fail with a non arraybuffer value', function() {
            const notAnArrayBuffer = new Array(20);

            expect(Validators.isArrayBuffer(notAnArrayBuffer)).to.be.a(
                'string',
            );
        });
    });

    // NestedObject Validator is done in a separate test file
});
