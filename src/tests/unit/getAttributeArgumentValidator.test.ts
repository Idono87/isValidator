import { expect } from 'chai';
import { AttributeValidator } from '../../attributes/attributes';
import {
    GetAttributeArgumentValidator,
    RegisterAttribute,
    RegisterValidator,
} from '../../isValidator';
import { Validator } from '../../validators';

describe('GetAttributeArgumentValidator', function() {
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

    it(`Expect to return attribute argument validator.`, function() {
        expect(
            GetAttributeArgumentValidator(attributeNameOne, validatorName),
        ).to.equal(argumentValidator);
    });

    it(`Expect undefined for non existing attribute.`, function() {
        expect(GetAttributeArgumentValidator('does not exist', validatorName))
            .to.be.undefined;
    });
});
