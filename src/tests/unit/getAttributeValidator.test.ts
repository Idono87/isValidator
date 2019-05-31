import { expect } from 'chai';
import { AttributeValidator } from '../../attributes/attributes';
import {
    GetAttributeValidator,
    RegisterAttribute,
    RegisterValidator,
} from '../../isValidator';
import { Validator } from '../../validators';

describe('GetAttributeValidator', function() {
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
    const attributeNameOne: string = 'testAttributeOne';
    const attributeNameTwo: string = 'testAttributeTwo';
    const argumentValidator: Validator = (value: any) => {
        if (!value) {
            return 'Failed Validation.';
        }
    };
    RegisterAttribute(
        attributeNameOne,
        validatorName,
        argumentValidator,
        attributeValidator,
    );
    RegisterAttribute(attributeNameTwo, validatorName, argumentValidator);

    it(`Expect attribute validator "${attributeNameOne}" to pass validation.`, function() {
        expect(
            GetAttributeValidator(attributeNameOne, validatorName)!(
                'pass',
                'pass',
            ),
        ).to.be.undefined;
    });

    it(`Expect attribute "${attributeNameTwo}" to pass argument validation`, function() {
        expect(
            GetAttributeValidator(attributeNameTwo, validatorName)!(
                'pass',
                true,
            ),
        ).to.be.undefined;
    });

    it(`Expect attribute "${attributeNameTwo}" to fail argument validation.`, function() {
        expect(
            GetAttributeValidator(attributeNameTwo, validatorName)!(
                'fail',
                false,
            ),
        ).to.not.be.undefined;
    });

    it(`Expect to return 'undefined'.`, function() {
        expect(GetAttributeValidator('does not exist', validatorName)).to.be
            .undefined;
    });
});
