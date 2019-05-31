import { expect } from 'chai';
import { GetWrappedValidator, RegisterValidator } from '../../isValidator';
import { ValidationResponse, Validator } from '../../validators';
import TypeError from '../../errors/typeError';

describe('GetWrappedValidator', function() {
    const validator: Validator = (value: any): ValidationResponse => {
        if (!value) {
            return 'Failed validation';
        }
    };
    const validatorName = 'TestValidator';

    RegisterValidator(validatorName, validator);

    it(`Expect wrapped validator "${validatorName}" to return true.`, function() {
        expect(GetWrappedValidator(validatorName)!(true)).to.be.true;
    });

    it(`Expect wrapped validator "${validatorName}" to return false.`, function() {
        expect(GetWrappedValidator(validatorName)!(false)).to.be.false;
    });

    it(`Expect to return an "undefined".`, function() {
        expect(GetWrappedValidator('DoesNotExist')).to.be.undefined;
    });

    it('Passing non string attribute name throws a TypeError', function() {
        expect(() => {
            GetWrappedValidator({} as any);
        }).to.throw(TypeError);
    });
});
