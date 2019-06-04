import { expect } from 'chai';

import ConstraintsValidator from '../../constraintsValidator';
import {
    IConstraints,
    RegisterAttribute,
    RegisterDefaultAttribute,
    RegisterDefaultValidator,
} from '../../isValidator';
import { Validator } from '../../validators';

describe('ConstraintsValidator', function() {
    const attributeNameList: string[] = [
        'testAttributeOne',
        'testAttributeTwo',
        'testAttributeThree',
        'testAttributeThreeFour',
    ];
    const validatorNameList: string[] = [
        'testValidatorOne',
        'testValidatorTwo',
        'testValidatorThree',
        'testValidatorFour',
    ];

    before('Register Custom Validator and Attributes', function() {
        const validator: Validator = (value: boolean) => {
            if (value) {
                return 'failed';
            }
        };

        for (const validatorName of validatorNameList) {
            RegisterDefaultValidator(validatorName, validator, true);
            for (const attributeName of attributeNameList) {
                RegisterDefaultAttribute(
                    attributeName,
                    validatorName,
                    validator,
                );
            }
        }
    });

    describe('IConstraints Tests', function() {
        it('Expect to pass validation with an empty object', function() {
            const constraints: IConstraints = {};

            expect(ConstraintsValidator.validate(constraints)).to.be.undefined;
        });

        it('Expect to pass validation with property values of empty objects.', function() {
            const constraints: IConstraints = {
                propOne: {},
                propTwo: {},
                propThree: {},
                propFour: {},
            };

            expect(ConstraintsValidator.validate(constraints)).to.be.undefined;
        });

        it('Expect to fail when property values are not objects', function() {
            const constraints: IConstraints = {
                propOne: 1 as any,
                propTwo: 'a string' as any,
                propThree: [] as any,
                propFour: undefined as any,
            };

            const toTest = ConstraintsValidator.validate(constraints);

            for (const key in constraints) {
                if (constraints.hasOwnProperty(key)) {
                    expect(toTest)
                        .to.be.property(key)
                        .and.be.a('string');
                }
            }
        });
    });

    describe('IPropertyConstraints Tests', function() {
        it('Expect to pass with constraint values set as an object', function() {
            const constraints: IConstraints = {
                prop: {
                    [validatorNameList[0]]: {},
                    [validatorNameList[1]]: {},
                    [validatorNameList[2]]: {},
                    [validatorNameList[3]]: {},
                },
            };

            expect(ConstraintsValidator.validate(constraints)).to.be.undefined;
        });

        it('Expect to fail with non object constraints values', function() {
            const constraints: IConstraints = {
                prop: {
                    [validatorNameList[0]]: 5 as any,
                    [validatorNameList[1]]: 'a string' as any,
                    [validatorNameList[2]]: [] as any,
                    [validatorNameList[3]]: undefined as any,
                },
            };

            const toTest = ConstraintsValidator.validate(constraints);

            for (const key in constraints.prop) {
                if (constraints.prop.hasOwnProperty(key)) {
                    expect(toTest).to.be.nested.property(`prop.${key}`);
                }
            }
        });

        it('Expect to fail with non existing constraints', function() {
            const constraints: any = {
                prop: {
                    fakeValidatorOne: {},
                    fakeValidatorTwo: {},
                    fakeValidatorThree: {},
                    fakeValidatorFour: {},
                },
            };

            const toTest = ConstraintsValidator.validate(constraints);

            for (const key in constraints.prop) {
                if (constraints.prop.hasOwnProperty(key)) {
                    expect(toTest).to.be.nested.property(`prop.${key}`);
                }
            }
        });

        it('Expect to pass with boolean special property constraints', function() {
            const constraints: IConstraints = {
                prop: {
                    exclude: true,
                    expect: true,
                    reject: true,
                },
            };

            expect(ConstraintsValidator.validate(constraints)).to.be.undefined;
        });

        it('Expect to fail with non boolean special property constraints ', function() {
            const constraints: IConstraints = {
                prop: {
                    exclude: [] as any,
                    expect: 4 as any,
                    reject: 'a string' as any,
                },
            };

            const toTest = ConstraintsValidator.validate(constraints);

            for (const key in constraints.prop) {
                if (constraints.prop.hasOwnProperty(key)) {
                    expect(toTest)
                        .to.be.nested.property(`prop.${key}`)
                        .and.be.a('string');
                }
            }
        });
    });

    describe('IAttribute Tests', function() {
        it('Expect to fail with non existing attributes', function() {
            const constraints: IConstraints = {
                prop: {
                    [validatorNameList[0]]: {
                        fakeAttributeOne: undefined,
                        fakeAttributeTwo: undefined,
                        fakeAttributeThree: undefined,
                        fakeAttributeFour: undefined,
                    },
                },
            };

            const toTest = ConstraintsValidator.validate(constraints);

            for (const key in constraints.prop[validatorNameList[0]] as any) {
                if (
                    constraints.prop[validatorNameList[0]]!.hasOwnProperty(key)
                ) {
                    expect(toTest)
                        .to.be.nested.property(
                            `prop.${validatorNameList[0]}.${key}`,
                        )
                        .and.be.a('string');
                }
            }
        });

        it('Expect to pass all argument validations', function() {
            const constraints: IConstraints = {
                prop: {
                    [validatorNameList[0]]: {
                        [attributeNameList[0]]: false,
                        [attributeNameList[1]]: false,
                        [attributeNameList[2]]: false,
                        [attributeNameList[3]]: false,
                    },
                },
            };

            expect(ConstraintsValidator.validate(constraints)).to.be.undefined;
        });

        it('Expect to fail all argument validations', function() {
            const constraints: IConstraints = {
                prop: {
                    [validatorNameList[0]]: {
                        [attributeNameList[0]]: true,
                        [attributeNameList[1]]: true,
                        [attributeNameList[2]]: true,
                        [attributeNameList[3]]: true,
                    },
                },
            };

            const toTest = ConstraintsValidator.validate(constraints);

            for (const key in constraints.prop[validatorNameList[0]] as any) {
                if (
                    constraints.prop[validatorNameList[0]]!.hasOwnProperty(key)
                ) {
                    expect(toTest)
                        .to.be.nested.property(
                            `prop.${validatorNameList[0]}.${key}`,
                        )
                        .and.be.a('string');
                }
            }
        });
    });
});
