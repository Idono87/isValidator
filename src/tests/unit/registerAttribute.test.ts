import { expect } from 'chai';
import { AttributeValidator } from '../../attributes/attributes';
import MissingValidatorReferenceError from '../../errors/missingValidatorReferenceError';
import { RegisterAttribute } from '../../isValidator';
import * as Validators from '../../validators';

type Validator = Validators.Validator;

describe('Register Attribute Test', function() {
    const attributeValidator: AttributeValidator = () => {};
    const validator: Validator = () => {};

    it('Expect MissingValidatorReferenceError for missing validator', function() {
        expect(() => {
            RegisterAttribute(
                'testAttribute',
                'testValidator',
                validator,
                attributeValidator,
            );
        }).to.throw(MissingValidatorReferenceError);
    });
});
