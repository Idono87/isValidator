import { expect } from 'chai';

import TypeError from '../../errors/typeError';
import {
    IConstraintOptions,
    IConstraints,
    RegisterDefaultAttribute,
    RegisterDefaultValidator,
} from '../../isValidator';
import ObjectValidator from '../../objectValidator';
import { Validator } from '../../validators';

describe('ObjectValidator', function() {
    const attributeValidatorNameList: string[] = [
        'testAttributeOne',
        'testAttributeTwo',
        'testAttributeThree',
        'testAttributeFour',
    ];

    const attributeNameList: string[] = [
        'testAttributeFive',
        'testAttributeSix',
    ];

    const validatorNameList: string[] = [
        'testValidatorOne',
        'testValidatorTwo',
        'testValidatorThree',
        'testValidatorFour',
    ];

    const objectPassing = {
        propertyOne: false,
        propertyTwo: false,
        propertyThree: false,
        propertyFour: false,
    };

    const objectFailing = {
        propertyOne: true,
        propertyTwo: true,
        propertyThree: true,
        propertyFour: true,
    };

    const defaultOptions: IConstraintOptions = {
        strict: false,
    };

    before('Register Custom Validator and Attributes', function() {
        const validator: Validator = (value: boolean) => {
            if (value) {
                return 'failed';
            }
        };

        const attributeValidator = (value: any, validationValue: boolean) => {
            if (validationValue) {
                return 'failed';
            }
        };

        for (const validatorName of validatorNameList) {
            RegisterDefaultValidator(validatorName, validator, true);
            for (const attributeName of attributeValidatorNameList) {
                RegisterDefaultAttribute(
                    attributeName,
                    validatorName,
                    validator,
                    attributeValidator,
                );
            }

            for (const attributeName of attributeNameList) {
                RegisterDefaultAttribute(
                    attributeName,
                    validatorName,
                    validator,
                );
            }
        }
    });

    it('Expect non object validation value to throw a TypeError', function() {
        expect(() => {
            ObjectValidator.validate('not an object.' as any, {}, {});
        }).to.throw(TypeError);
    });

    describe('Strict IConstraintOption Validation', function() {
        const options: IConstraintOptions = {
            strict: true,
        };

        it('Expect to pass with strict validation', function() {
            const constraints: IConstraints = {
                propertyOne: {},
                propertyTwo: {},
                propertyThree: {},
                propertyFour: {},
            };

            expect(
                ObjectValidator.validate(objectPassing, constraints, options),
            ).to.be.undefined;
        });

        it('Expect to pass without with strict validation and no constraints', function() {
            expect(
                ObjectValidator.validate(objectPassing, {}, { strict: false }),
            ).to.be.undefined;
        });

        it('Expect to fail with strict validation where properties are expected', function() {
            const constraints: IConstraints = {
                propertyOne: {},
                propertyTwo: {},
                propertyThree: {},
                propertyFour: {},
            };

            const toTest = ObjectValidator.validate({}, constraints, options);

            for (const key in constraints) {
                if (constraints.hasOwnProperty(key)) {
                    expect(toTest)
                        .to.have.property(key)
                        .and.be.a('string');
                }
            }
        });

        it('Expect to fail with strict validation where properties are rejected', function() {
            const toTest = ObjectValidator.validate(objectPassing, {}, options);

            for (const key in objectPassing) {
                if (objectPassing.hasOwnProperty(key)) {
                    expect(toTest)
                        .to.have.property(key)
                        .and.be.a('string');
                }
            }
        });
    });

    describe('Exclude IPropertyConstraint Option', function() {
        it('Expect to pass with all properties set to exclude', function() {
            const constraints: IConstraints = {
                propertyOne: { exclude: true },
                propertyTwo: { exclude: true },
                propertyThree: { exclude: true },
                propertyFour: { exclude: true },
            };

            expect(ObjectValidator.validate({}, constraints, { strict: true }))
                .to.be.undefined;
        });
    });

    describe('Expect IPropertyConstraint Option', function() {
        it('Expect to pass with all expected properties', function() {
            const constraints: IConstraints = {
                propertyOne: { expect: true },
                propertyTwo: { expect: true },
                propertyThree: { expect: true },
                propertyFour: { expect: true },
            };

            expect(
                ObjectValidator.validate(
                    objectPassing,
                    constraints,
                    defaultOptions,
                ),
            ).to.be.undefined;
        });

        it('Expect to pass with all expected properties set to false', function() {
            const constraints: IConstraints = {
                propertyOne: { expect: false },
                propertyTwo: { expect: false },
                propertyThree: { expect: false },
                propertyFour: { expect: false },
            };

            expect(
                ObjectValidator.validate(
                    objectPassing,
                    constraints,
                    defaultOptions,
                ),
            ).to.be.undefined;
        });

        it('Expect to fail with all expected properties', function() {
            const constraints: IConstraints = {
                propertyOne: { expect: true },
                propertyTwo: { expect: true },
                propertyThree: { expect: true },
                propertyFour: { expect: true },
            };

            const toTest = ObjectValidator.validate(
                {},
                constraints,
                defaultOptions,
            );

            for (const key in constraints) {
                if (constraints.hasOwnProperty(key)) {
                    expect(toTest)
                        .to.have.property(key)
                        .and.be.a('string');
                }
            }
        });
    });

    describe('Reject IPropertyConstraint Option', function() {
        it('Expect to fail with all properties set to reject', function() {
            const constraints: IConstraints = {
                propertyOne: { reject: true },
                propertyTwo: { reject: true },
                propertyThree: { reject: true },
                propertyFour: { reject: true },
            };

            const toTest = ObjectValidator.validate(
                objectPassing,
                constraints,
                defaultOptions,
            );

            for (const key in objectPassing) {
                if (objectPassing.hasOwnProperty(key)) {
                    expect(toTest)
                        .to.have.property(key)
                        .and.be.a('string');
                }
            }
        });

        it('Expect to pass with all properties set to reject', function() {
            const constraints: IConstraints = {
                propertyOne: { reject: true },
                propertyTwo: { reject: true },
                propertyThree: { reject: true },
                propertyFour: { reject: true },
            };

            expect(ObjectValidator.validate({}, constraints, defaultOptions)).to
                .be.undefined;
        });

        it('Expect to pass with all properties set to reject and false', function() {
            const constraints: IConstraints = {
                propertyOne: { reject: false },
                propertyTwo: { reject: false },
                propertyThree: { reject: false },
                propertyFour: { reject: false },
            };

            expect(
                ObjectValidator.validate(
                    objectPassing,
                    constraints,
                    defaultOptions,
                ),
            ).to.be.undefined;
        });
    });

    describe('Validate Property Value', function() {
        it('Expect property options to pass validation', function() {
            const constraints: IConstraints = {
                propertyOne: { exclude: false, expect: false, reject: false },
            };

            expect(
                ObjectValidator.validate(
                    objectPassing,
                    constraints,
                    defaultOptions,
                ),
            );
        });

        it('Expect property validators to pass validation', function() {
            const constraints: IConstraints = {
                propertyOne: {
                    [validatorNameList[0]]: {},
                    [validatorNameList[1]]: {},
                    [validatorNameList[2]]: {},
                    [validatorNameList[3]]: {},
                },
            };

            expect(
                ObjectValidator.validate(
                    objectPassing,
                    constraints,
                    defaultOptions,
                ),
            ).to.be.undefined;
        });

        it('Expect property validators to fail validation', function() {
            const constraints: IConstraints = {
                propertyOne: {
                    [validatorNameList[0]]: {},
                    [validatorNameList[1]]: {},
                    [validatorNameList[2]]: {},
                    [validatorNameList[3]]: {},
                },
            };

            const toTest = ObjectValidator.validate(
                objectFailing,
                constraints,
                defaultOptions,
            );

            for (const key in constraints.propertyOne) {
                if (constraints.propertyOne.hasOwnProperty(key)) {
                    expect(toTest)
                        .to.have.nested.property(`propertyOne.${key}`)
                        .and.be.a('string');
                }
            }
        });
    });

    describe('Validate Value Attribute', function() {
        it('Expect argument type attributes to pass validation', function() {
            const constraints: IConstraints = {
                propertyOne: {
                    [validatorNameList[0]]: {
                        [attributeNameList[0]]: true,
                        [attributeNameList[1]]: true,
                    },
                },
            };

            expect(
                ObjectValidator.validate(
                    objectPassing,
                    constraints,
                    defaultOptions,
                ),
            );
        });

        it('Expect attribute validators to pass', function() {
            const constraints: IConstraints = {
                propertyOne: {
                    [validatorNameList[0]]: {
                        [attributeValidatorNameList[0]]: false,
                        [attributeValidatorNameList[1]]: false,
                        [attributeValidatorNameList[2]]: false,
                        [attributeValidatorNameList[3]]: false,
                    },
                },
            };

            expect(
                ObjectValidator.validate(
                    objectPassing,
                    constraints,
                    defaultOptions,
                ),
            );
        });

        it('Expect attribute validators to fail', function() {
            const constraints: IConstraints = {
                propertyOne: {
                    [validatorNameList[0]]: {
                        [attributeValidatorNameList[0]]: true,
                        [attributeValidatorNameList[1]]: true,
                        [attributeValidatorNameList[2]]: true,
                        [attributeValidatorNameList[3]]: true,
                    },
                },
            };

            const toTest = ObjectValidator.validate(
                objectPassing,
                constraints,
                defaultOptions,
            );

            for (const key of attributeValidatorNameList) {
                expect(toTest)
                    .to.have.nested.property(
                        `propertyOne.${validatorNameList[0]}.${key}`,
                    )
                    .and.be.a('string');
            }
        });
    });
});
