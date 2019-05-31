import { expect } from 'chai';
import { GetValidator, RegisterValidator } from '../../isValidator';
import { ValidationResponse, Validator } from '../../validators';

describe('GetValidator', function() {
    const validator: Validator = (value: any): ValidationResponse => {
        if (value) {
            return 'Failed validation';
        }
    };
    const validatorName = 'TestValidator';

    RegisterValidator(validatorName, validator);

    it(`Expect to return the validator "${validatorName}".`, function() {
        expect(GetValidator(validatorName)).to.equal(validator);
    });

    it(`Expect to return an "undefined".`, function() {
        expect(GetValidator('DoesNotExist')).to.be.undefined;
    });
});
