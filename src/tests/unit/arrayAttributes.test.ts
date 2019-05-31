import { expect } from 'chai';
import * as ArrayAttributes from '../../attributes/arrayAttributes';
import { ValidationResponse } from '../../validators';


describe('ArrayAttributes', function() {
    describe('isLengthOf', function() {
        it('Expect length to be equal', function() {
            expect(ArrayAttributes.isLengthOf([1, 2, 3, 4, 5], 5)).to.be
                .undefined;
        });

        it('Expect length to be unequal', function() {
            expect(ArrayAttributes.isLengthOf([1, 2, 3, 4, 5], 4)).to.be.a(
                'string',
            );
        });
    });

    describe('isNotLengthOf', function() {
        it('Expect length to not be equal', function() {
            expect(ArrayAttributes.isNotLengthOf([1, 2, 3, 4, 5], 3)).to.be
                .undefined;
        });

        it('Expect length to be unequal', function() {
            expect(ArrayAttributes.isNotLengthOf([1, 2, 3, 4, 5], 5)).to.be.a(
                'string',
            );
        });
    });

      
    describe('isMinLength', function() {
        it('Expect min length to be equal or greater than value', function() {
            expect(
                ArrayAttributes.isMinLength([1, 2, 3, 4, 5], 5),
                'Expected Equal to 5',
            ).to.be.undefined;

            expect(
                ArrayAttributes.isMinLength([1, 2, 3, 4, 5], 4),
                'Expected to be greater than 4',
            ).to.be.undefined;
        });

        it('Expect min length to not be equal or greater than value', function() {
            expect(ArrayAttributes.isMinLength([1, 2, 3, 4, 5], 6)).to.be.a(
                'string',
            );
        });
    });

    describe('isMaxLength', function() {
        it('Expect max length to be equal or less than value', function() {
            expect(
                ArrayAttributes.isMaxLength([1, 2, 3, 4, 5], 5),
                'Expected Equal to 5',
            ).to.be.undefined;

            expect(
                ArrayAttributes.isMaxLength([1, 2, 3, 4, 5], 6),
                'Expected to be less than 6',
            ).to.be.undefined;
        });

        it('Expect max length to not be equal or less than value', function() {
            expect(ArrayAttributes.isMaxLength([1, 2, 3, 4, 5], 4)).to.be.a(
                'string',
            );
        });
    });

    describe('isOfTypes', function() {
        const input: any[] = ['a string', 5, new Date()];
        const types: (string | Function)[] = [Date, 'string', 'number'];

        it('Expect to pass with all matching types', function() {
            expect(ArrayAttributes.isOfTypes(input, types)).to.be.undefined;
        });

        it('Expect to fail with all types', function() {
            const toTest: ValidationResponse = ArrayAttributes.isOfTypes(
                input,
                ['symbol', null, 'undefined'],
            );

            for (let i = 0; i < input.length; i++) {
                expect(toTest)
                    .to.have.property(`${i}`)
                    .and.be.a('string');
            }
        });

        it('Expect to fail with 2 types', function() {
            const toTest: ValidationResponse = ArrayAttributes.isOfTypes(
                input,
                ['boolean', 'object', 'string'],
            );

            for (let i = 0; i < input.length; i++) {
                if (i === 0) {
                    expect(toTest).to.not.have.property(`${i}`);
                } else {
                    expect(toTest)
                        .to.have.property(`${i}`)
                        .and.be.a('string');
                }
            }
        });
    });

    describe('isNotOfTypes', function() {
        const input: any[] = [function() {}, {}, undefined];
        const types: (string | Function)[] = [Date, 'string', 'number'];

        it('Expect to pass with no matching types', function() {
            expect(ArrayAttributes.isNotOfTypes(input, types)).to.be.undefined;
        });

        it('Expect to fail with all types', function() {
            const toTest: ValidationResponse = ArrayAttributes.isNotOfTypes(
                input,
                ['function', 'object', 'undefined'],
            );

            for (let i = 0; i < input.length; i++) {
                expect(toTest)
                    .to.have.property(`${i}`)
                    .and.be.a('string');
            }
        });

        it('Expect to fail with 2 types', function() {
            const toTest: ValidationResponse = ArrayAttributes.isNotOfTypes(
                input,
                ['boolean', 'object', 'undefined'],
            );

            for (let i = 0; i < input.length; i++) {
                if (i === 0) {
                    expect(toTest).to.not.have.property(`${i}`);
                } else {
                    expect(toTest)
                        .to.have.property(`${i}`)
                        .and.be.a('string');
                }
            }
        });
    });

    describe('isOfType', function() {
        const input: string[] = [
            'a string',
            'a string',
            'a string',
            'a string',
        ];

        const inputDate: Date[] = [new Date(), new Date(), new Date()];

        it('Expect array typecheck to pass', function() {
            expect(ArrayAttributes.isOfType(input, 'string')).to.be.undefined;
        });

        it('Expect array typecheck to pass with custom type.', function() {
            expect(ArrayAttributes.isOfType(inputDate, Date)).to.be.undefined;
        });

        it('Expect array not to pass', function() {
            const toValidate: ValidationResponse = ArrayAttributes.isOfType(
                input,
                'number',
            );

            for (let i = 0; i < input.length; i++) {
                expect(toValidate)
                    .to.have.property(`${i}`)
                    .and.be.a('string');
            }
        });
    });

    describe('isNotOfType', function() {
        const input: string[] = [
            'a string',
            'a string',
            'a string',
            'a string',
        ];

        const inputDate: Date[] = [new Date(), new Date(), new Date()];

        it('Expect array to not be of type (primitive)', function() {
            expect(ArrayAttributes.isNotOfType(input, 'number')).to.be
                .undefined;
        });

        it('Expect array to be of type (Object)', function() {
            expect(ArrayAttributes.isNotOfType(inputDate, Promise)).to.be
                .undefined;
        });

        it('Expect array to not pass', function() {
            const toValidate: ValidationResponse = ArrayAttributes.isNotOfType(
                input,
                'string',
            );

            for (let i = 0; i < input.length; i++) {
                expect(toValidate)
                    .to.have.property(`${i}`)
                    .and.be.a('string');
            }
        });
    });

    describe('isStrictOfTypes', function() {
        class TestType {}

        it('Expect to match all types', function() {
            expect(
                ArrayAttributes.isStrictOfTypes(
                    ['a string', 3, new TestType()],
                    ['string', 'number', TestType],
                ),
            ).to.be.undefined;
        });

        it('Expect to fail one type test', function() {
            const toTest: ValidationResponse = ArrayAttributes.isStrictOfTypes(
                ['a string', 3, new TestType()],
                ['string', 'number', 'null'],
            );

            for (let i = 0; i < 3; i++) {
                if (i === 2) {
                    expect(toTest)
                        .to.have.nested.property(`${i}`)
                        .and.be.a('string');
                } else {
                    expect(toTest).to.not.have.nested.property(`${i}`);
                }
            }
        });

        it('Expect to fail all types', function() {
            const toTest: ValidationResponse = ArrayAttributes.isStrictOfTypes(
                ['a string', 3, new TestType()],
                ['number', 'string', 'null'],
            );

            for (let i = 0; i < 3; i++) {
                expect(toTest)
                    .to.have.nested.property(`${i}`)
                    .and.be.a('string');
            }
        });

        it('Expect to fail remaining elements', function() {
            const toTest: ValidationResponse = ArrayAttributes.isStrictOfTypes(
                [3, 'a string', null, 'overflow', 'overflow'],
                ['number', 'string', 'null'],
            );

            for (let i = 3; i < 5; i++) {
                expect(toTest)
                    .to.have.nested.property(`${i}`)
                    .and.be.a('string');
            }
        });
    });

    describe('hasValues', function() {
        const date: Date = new Date();
        const input: any[] = ['a string', 5, date];

        it('Expect to find all values', function() {
            expect(ArrayAttributes.hasValues(input, input)).to.be.undefined;
        });

        it('Expect to find no values', function() {
            const toTest: ValidationResponse = ArrayAttributes.hasValues(
                input,
                ['does not exist', 8],
            );
            for (let i = 0; i < 2; i++) {
                expect(toTest)
                    .to.have.property(`${i}`)
                    .and.be.a('string');
            }
        });
    });

    describe('doesNotHaveValues', function() {
        const date: Date = new Date();
        const input: any[] = ['a string', 5, date];

        it('Expect to not find any of the values', function() {
            expect(
                ArrayAttributes.doesNotHaveValues(input, [
                    2,
                    'another string',
                    new Date(),
                ]),
            ).to.be.undefined;
        });

        it('Expect to find all values and fail', function() {
            const toTest: ValidationResponse = ArrayAttributes.doesNotHaveValues(
                input,
                input,
            );
            for (let i = 0; i < 2; i++) {
                expect(toTest)
                    .to.have.property(`${i}`)
                    .and.be.a('string');
            }
        });
    });

    describe('isEqualTo', function() {
        const date: Date = new Date();
        const input: any[] = ['a string', 3, date];
        const compare: any[] = [3, date, 'a string'];

        it('Expect to match all values', function() {
            expect(ArrayAttributes.isEqualTo(input, compare)).to.be.undefined;
        });

        it('Expect to get size missmatch string error', function() {
            expect(ArrayAttributes.isEqualTo(input, [date, 3])).to.be.a(
                'string',
            );
        });

        it('Expect to fail with all elements', function() {
            const toValidate: ValidationResponse = ArrayAttributes.isEqualTo(
                input,
                [null, null, null],
            );

            for (let i = 0; i < 3; i++) {
                expect(toValidate)
                    .to.have.property(`${i}`)
                    .and.be.a('string');
            }
        });

        it('Expect to fail only one element', function() {
            const toValidate: ValidationResponse = ArrayAttributes.isEqualTo(
                input,
                ['a string', 3, null],
            );

            for (let i = 0; i < 3; i++) {
                if (i === 2) {
                    expect(toValidate)
                        .to.have.property(`${i}`)
                        .and.be.a('string');
                } else {
                    expect(toValidate).to.not.have.property(`${i}`);
                }
            }
        });
    });

    describe('isStrictEqualTo', function() {
        const date: Date = new Date();
        const input = ['a string', 8, date];

        it('Expect to pass', function() {
            expect(ArrayAttributes.isStrictEqualTo(input, input)).to.be
                .undefined;
        });

        it('Expect to fail with uneven array length', function() {
            expect(ArrayAttributes.isStrictEqualTo(input, [])).to.be.a(
                'string',
            );
        });

        it('Expect to fail with all comparisons', function() {
            const toTest: ValidationResponse = ArrayAttributes.isStrictEqualTo(
                input,
                [date, 'a string', 8],
            );

            for (let i = 0; i < 3; i++) {
                expect(toTest)
                    .to.have.property(`${i}`)
                    .and.be.a('string');
            }
        });

        it('Expect to fail with only one comparison', function() {
            const toTest: ValidationResponse = ArrayAttributes.isStrictEqualTo(
                input,
                ['a string', 8, null],
            );

            for (let i = 0; i < 3; i++) {
                if (i > 1) {
                    expect(toTest)
                        .to.have.property(`${i}`)
                        .and.be.a('string');
                } else {
                    expect(toTest).to.not.have.property(`${i}`);
                }
            }
        });
    });

    describe('arrayTypeValueValidator', function() {
        it('Expect type validation to pass', function() {
            const typeArray = ['string', 'number', Date];

            expect(ArrayAttributes.arrayTypeValueValidator(typeArray)).to.be
                .undefined;
        });

        it('Expect type validation to fail', function() {
            const typeArray = ['not a string', 5, new Date()];

            const toTest = ArrayAttributes.arrayTypeValueValidator(typeArray);

            for (let i = 0; i < 3; i++) {
                expect(toTest)
                    .to.have.property(`${i}`)
                    .and.be.a('string');
            }
        });

        it('Expect validation to fail when value is not array', function() {
            expect(ArrayAttributes.arrayTypeValueValidator({} as any)).to.be.a(

                'string',
            );
        });
    });
});
