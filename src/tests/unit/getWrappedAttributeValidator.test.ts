import { expect } from 'chai';
import { AttributeValidator } from '../../attributes/attributes';
import {
    GetWrappedAttributeValidator,
    RegisterAttribute,
    RegisterValidator,
} from '../../isValidator';
import { Validator } from '../../validators';
import TypeError from '../../errors/typeError';

describe('GetWrappedAttributeValidator', function() {
    const validator: Validator = () => {};
    const validatorName: string = 'testValidator';
    RegisterValidator(validatorName, validator);

    const attributeValidator: AttributeValidator = (
        value: any,
        argument: any,
    ) => {
        if (value !== argument) {
            return 'Failed Validation';
        }
    };
    const attributeName: string = 'testAttribute';
    const argumentValidator: Validator = (value: any) => {
        if (typeof value !== 'string') {
            return 'Argument not a string';
        }
    };
    RegisterAttribute(
        attributeName,
        validatorName,
        argumentValidator,
        attributeValidator,
    );

    it(`Expect validator to validate to false`, function() {
        expect(
            GetWrappedAttributeValidator(attributeName, validatorName)!(
                'fail',
                'pass',
            ),
        ).to.be.false;
    });

    it(`Expect validator to validate to true.`, function() {
        expect(
            GetWrappedAttributeValidator(attributeName, validatorName)!(
                'pass',
                'pass',
            ),
        ).to.be.true;
    });

    it(`Expect to return 'undefined'.`, function() {
        expect(GetWrappedAttributeValidator('does not exist', validatorName)).to
            .be.undefined;
    });

    it(`Expect TypeError from non-string attribute name.`, function() {
        expect(() => {
            GetWrappedAttributeValidator({} as any, validatorName);
        }).to.throw(TypeError);
    });

    it(`Expect TypeError from non-string validator name.`, function() {
        expect(() => {
            GetWrappedAttributeValidator(attributeName, {} as any);
        }).to.throw(TypeError);
    });

    it('Expect TypeError for failing argument validation.', function() {
        expect(() => {
            GetWrappedAttributeValidator(attributeName, validatorName)!(
                'fail',
                {},
            );
        }).to.throw(TypeError);
    });
});
