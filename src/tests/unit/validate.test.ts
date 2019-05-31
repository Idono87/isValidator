import { expect } from 'chai';
import { AttributeValidator } from '../../attributes/attributes';
import { ErrorReport } from '../../errorHandler';
import TypeError from '../../errors/typeError';
import {
    IConstraintOptions,
    IConstraints,
    IPropertyConstraints,
    RegisterAttribute,
    RegisterValidator,
    Validate,
    ValidateValue,
} from '../../isValidator';
import { Validator } from '../../validators';

describe('Validate', function() {
    const validator: Validator = (value: boolean) => {
        if (!value) {
            return 'Failed validation';
        }
    };
    const validatorName: string = 'testValidator';
    RegisterValidator(validatorName, validator);

    const attributeValidator: AttributeValidator = (
        value: any,
        argumentValue: boolean,
    ) => {
        if (!argumentValue) {
            return 'Failed Attribute Validation';
        }
    };
    const argumentValidator: Validator = (value: boolean) => {
        if (typeof value !== 'boolean') {
            return 'Failed validation';
        }
    };
    const attributeValidatorName: string = 'testAttributeValidator';
    RegisterAttribute(
        attributeValidatorName,
        validatorName,
        argumentValidator,
        attributeValidator,
    );

    const attributeName: string = 'testAttribute';
    RegisterAttribute(attributeName, validatorName, argumentValidator);

    describe('Argument Tests', function() {
        const object: any = {};
        const constraints: IConstraints = {};
        const options: IConstraintOptions = {};

        it('Expect all arguments to pass.', function() {
            expect(Validate(object, constraints, options)).to.be.undefined;
        });

        it(`Expect TypeError for argument 'objectToValidate'.`, function() {
            expect(function() {
                Validate('not an object' as any, constraints, options);
            }).to.throw(TypeError);
        });

        it(`Expect TypeError for argument 'constraints'.`, function() {
            expect(function() {
                Validate(object, 'not an object' as any, options);
            }).to.throw(TypeError);
        });

        it(`Expect TypeError for argument 'options'.`, function() {
            expect(function() {
                Validate(object, constraints, 'not an object' as any);
            }).to.throw(TypeError);
        });
    });

    describe('ValidateObject Tests', function() {
        const object = {
            testProperty1: 'a string',
            testProperty2: 'a string',
        };

        it('Expect to pass with all properties.', function() {
            const constraints: IConstraints = {
                testProperty1: {},
                testProperty2: {},
            };

            expect(Validate(object, constraints)).to.be.undefined;
        });

        it('Expect property constraints to fail.', function() {
            const constraints: IConstraints = {
                testProperty1: '' as any,
                testProperty2: '' as any,
            };
            const toTest = Validate(object, constraints);

            Object.keys(constraints).forEach((key) => {
                expect(toTest)
                    .to.have.property(key)
                    .and.be.a('string');
            });
        });

        describe('Strict Option', function() {
            const options: IConstraintOptions = { strict: true };
            it('Expect Strict Validation to pass', function() {
                const constraints: IConstraints = {
                    testProperty1: {},
                    testProperty2: {},
                };
                Validate(object, constraints, options);
            });

            it('Expect Strict validation to give rejection error', function() {
                const constraints: IConstraints = {
                    testProperty1: {},
                };

                const toTest: void | ErrorReport = Validate(
                    object,
                    constraints,
                    options,
                );

                expect(toTest)
                    .to.have.nested.property('testProperty2.reject')
                    .and.be.a('string');
            });

            it('Expect Strict validation to give expect errors', function() {
                const constraints: IConstraints = {
                    testProperty1: {},
                    testProperty2: {},
                };

                const toTest: void | ErrorReport = Validate(
                    {},
                    constraints,
                    options,
                );

                Object.keys(constraints).forEach((key) => {
                    expect(toTest)
                        .to.have.nested.property(`${key}.expect`)
                        .and.be.a('string');
                });
            });

            it('Expect strict value to fail when not boolean', function() {
                expect(function() {
                    Validate({}, {}, { strict: 'not a boolean' as any });
                }).to.throw(TypeError);
            });
        });

        describe('Property Options', function() {
            const object = {
                testProperty: 'a string',
            };

            describe('Expect property option', function() {
                const constraints: IConstraints = {
                    testProperty: { expect: true },
                };

                it('Expect to pass', function() {
                    const toTest = Validate(object, constraints);

                    expect(toTest).to.be.undefined;
                });

                it(`Expect 'expect' error.`, function() {
                    const toTest = Validate({}, constraints);

                    Object.keys(constraints).forEach((key) => {
                        expect(toTest)
                            .to.have.nested.property(`${key}.expect`)
                            .and.be.a('string');
                    });
                });
            });

            describe('Reject property option', function() {
                const constraints: IConstraints = {
                    testProperty: { reject: true },
                };

                it('Expect to pass', function() {
                    const toTest = Validate({}, constraints);

                    expect(toTest).to.be.undefined;
                });

                it(`Expect 'reject' error.`, function() {
                    const toTest = Validate(object, constraints);

                    Object.keys(constraints).forEach((key) => {
                        expect(toTest)
                            .to.have.nested.property(`${key}.reject`)
                            .and.be.a('string');
                    });
                });
            });

            describe('Exclude property option', function() {
                const constraints: IConstraints = {
                    testProperty: { exclude: true },
                };

                const options: IConstraintOptions = {
                    strict: true,
                };

                it('Expect to pass with empty object', function() {
                    const toTest = Validate({}, constraints, options);

                    expect(toTest).to.be.undefined;
                });

                it('Expect to pass with all properties', function() {
                    const toTest = Validate(object, constraints, options);

                    expect(toTest).to.be.undefined;
                });
            });
        });
    });

    describe('ValidateProperty Tests', function() {
        const constraints: IConstraints = {
            testProperty1: { [validatorName]: {} },
            testProperty2: { [validatorName]: {} },
        };

        it('Expect to pass all validation tests', function() {
            const object = {
                testProperty1: true,
                testProperty2: true,
            };

            expect(Validate(object, constraints)).to.be.undefined;
        });

        it('Expect to fail all validation tests', function() {
            const object = {
                testProperty1: false,
                testProperty2: false,
            };

            const toTest: void | ErrorReport = Validate(object, constraints);

            Object.keys(constraints).forEach((key) => {
                expect(toTest)
                    .to.have.nested.property(`${key}.${validatorName}`)
                    .and.be.a('string');
            });
        });

        it('Expect to fail with non existing validator.', function() {
            const object = {
                testProperty1: true,
                testProperty2: true,
            };

            expect(
                Validate(object, {
                    testProperty1: { notAValidator: {} } as any,
                }),
            )
                .to.have.nested.property('testProperty1.notAValidator')
                .and.be.a('string');
        });
    });

    describe('ValidateAttributes Tests', function() {
        const object = {
            testProperty: true,
        };

        it('Expect to pass', function() {
            const constraints: IConstraints = {
                testProperty: {
                    [validatorName]: {
                        [attributeValidatorName]: true,
                    },
                },
            };

            expect(Validate(object, constraints)).to.be.undefined;
        });

        it('Expect to pass with argument attribute', function() {
            const constraints: IConstraints = {
                testProperty: {
                    [validatorName]: {
                        [attributeName]: true,
                    },
                },
            };

            expect(Validate(object, constraints)).to.be.undefined;
        });

        it('Expect to fail', function() {
            const constraints: IConstraints = {
                testProperty: {
                    [validatorName]: {
                        [attributeValidatorName]: false,
                    },
                },
            };

            expect(Validate(object, constraints))
                .to.have.nested.property(
                    `testProperty.${validatorName}.${attributeValidatorName}`,
                )
                .and.be.a('string');
        });

        it('Expect validator attributes to fail and return error when not an object', function() {
            const constraints: IConstraints = {
                testProperty: {
                    [validatorName]: '' as any,
                },
            };

            expect(Validate(object, constraints))
                .to.have.nested.property(`testProperty.${validatorName}`)
                .and.be.a('string');
        });

        it('Expect error for nonexisting attribute.', function() {
            const constraints: IConstraints = {
                testProperty: {
                    [validatorName]: {
                        doesNotExist: 5,
                    } as IConstraints,
                },
            };

            expect(Validate(object, constraints))
                .to.have.nested.property(
                    `testProperty.${validatorName}.doesNotExist`,
                )
                .and.be.a('string');
        });

        it('Expect attribute value to fail when not of correct type.', function() {
            const constraints: IConstraints = {
                testProperty: {
                    [validatorName]: {
                        [attributeValidatorName]: '',
                    },
                },
            };

            expect(Validate(object, constraints))
                .to.have.nested.property(
                    `testProperty.${validatorName}.${attributeValidatorName}.TypeError`,
                )
                .and.be.a('string');
        });
    });
});

describe('Validate Value', function() {
    const validator: Validator = (value: boolean) => {
        if (!value) {
            return 'Failed validation';
        }
    };
    const validatorName: string = 'testValueValidator';
    RegisterValidator(validatorName, validator);

    const constraints: IPropertyConstraints = {
        [validatorName]: {},
    };

    it('Expect to pass', function() {
        expect(ValidateValue(true, constraints)).to.be.undefined;
    });

    it('Expect to fail', function() {
        expect(ValidateValue(false, constraints))
            .to.have.nested.property(`value.${validatorName}`)
            .and.be.a('string');
    });

    it('Expect TypeError for constraints that is not an object', function() {
        expect(() => {
            ValidateValue('a string', 'not an object' as any);
        }).to.throw(TypeError);
    });

    it('Expect TypeError for options that is not an object.', function() {
        expect(() => {
            ValidateValue('a string', constraints, 'not an object' as any);
        }).to.throw(TypeError);
    });
});
