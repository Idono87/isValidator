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

    it(`Expect to return attribute validator.`, function() {
        expect(GetAttributeValidator(attributeNameOne, validatorName)).to.equal(
            attributeValidator,
        );
    });

    it(`Expect undefined for property attribute.`, function() {
        expect(GetAttributeValidator(attributeNameTwo, validatorName)).to.be
            .undefined;
    });

    it(`Expect undefined for non existing attribute.`, function() {
        expect(GetAttributeValidator('does not exist', validatorName)).to.be
            .undefined;
    });
});
