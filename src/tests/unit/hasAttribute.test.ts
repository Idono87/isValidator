import { expect } from 'chai';
import { AttributeValidator } from '../../attributes/attributes';
import {
    HasAttribute,
    RegisterAttribute,
    RegisterValidator,
} from '../../isValidator';
import { Validator } from '../../validators';

describe('HasAttribute', function() {
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

    const attributeName: string = 'testAttributeOne';

    const argumentValidator: Validator = (value: any) => {
        if (!value) {
            return 'Failed Validation.';
        }
    };

    RegisterAttribute(
        attributeName,
        validatorName,
        argumentValidator,
        attributeValidator,
    );

    it('Expect attribute to exist', function() {
        expect(HasAttribute(attributeName, validatorName)).to.be.true;
    });

    it('Expect attribute to not exist', function() {
        expect(HasAttribute('does not exist', validatorName)).to.be.false;
    });
});
