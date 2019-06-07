import { expect } from 'chai';
import { IConstraintOptions, IConstraints, Validate } from '../..';

describe('ValidateNestedObject integration test', function() {
    const obj = {
        property: {
            nestedProperty: 'a string',
        },
    };

    const passing: IConstraints = {
        property: {
            validateNestedObject: {
                constraints: {
                    nestedProperty: {
                        isString: {},
                    },
                },
            },
        },
    };

    const failing: IConstraints = {
        property: {
            validateNestedObject: {
                constraints: {
                    nestedProperty: {
                        exclude: true,
                    },
                    failOnStrict: {},
                },
            },
        },
    };

    const options: IConstraintOptions = {
        strict: true,
    };

    it('Expect to pass validation', function() {
        expect(Validate(obj, passing, options)).to.be.undefined;
    });

    it('Expect to fail validation', function() {
        expect(Validate(obj, failing, options))
            .to.have.nested.property(
                'property.validateNestedObject.failOnStrict',
            )
            .and.be.a('string');
    });
});
