import { expect } from 'chai';
import { AttributeValidator } from '../../attributes/attributes';
import AttributeRegistrationError from '../../errors/attributeRegistrationError';
import MissingValidatorReferenceError from '../../errors/missingValidatorReferenceError';
import NamingCollisionError from '../../errors/namingCollisionError';
import TypeError from '../../errors/typeError';
import {
    GetAttributeValidator,
    RegisterDefaultAttribute,
    RegisterDefaultValidator,
} from '../../isValidator';
import * as Validators from '../../validators';

type Validator = Validators.Validator;

describe('Register Default Attribute Test', function() {
    const validator: Validator = () => {};
    const validatorName = 'testValidator';
    RegisterDefaultValidator(validatorName, validator, true);

    const attributeValidator: AttributeValidator = (value: any) => {
        return value;
    };
    const attributeName: string = 'testAttribute';

    it('Expect to register default attribute', function() {
        RegisterDefaultAttribute(
            attributeName,
            validatorName,
            validator,
            attributeValidator,
            true,
        );

        const returnValue = 'TestValue';

        expect(
            GetAttributeValidator(attributeName, validatorName)!(
                returnValue,
                undefined,
            ),
        ).to.equal(returnValue);
    });

    it('Expect TypeError for non string attribute name', function() {
        expect(() => {
            RegisterDefaultAttribute(
                {} as string,
                validatorName,
                validator,
                attributeValidator,
            );
        }).to.throw(TypeError);
    });

    it('Expect TypeError for non string validator name', function() {
        expect(() => {
            RegisterDefaultAttribute(
                attributeName,
                {} as string,
                validator,
                attributeValidator,
            );
        }).to.throw(TypeError);
    });

    it('Expect TypeError for non function type argument validator', function() {
        expect(() => {
            RegisterDefaultAttribute(
                attributeName,
                validatorName,
                'not a function' as any,
                attributeValidator,
            );
        }).to.throw(TypeError);
    });

    it('Expect TypeError for non function type attribute validator', function() {
        expect(() => {
            RegisterDefaultAttribute(
                attributeName,
                validatorName,
                validator,
                'not a function' as any,
            );
        }).to.throw(TypeError);
    });

    it('Expect TypeError for non boolean default attribute', function() {
        expect(() => {
            RegisterDefaultAttribute(
                attributeName,
                validatorName,
                validator,
                attributeValidator,
                'not a boolean' as any,
            );
        }).to.throw(TypeError);
    });

    it('Expect MissingReferenceError for non existing validator.', function() {
        expect(() => {
            RegisterDefaultAttribute(
                attributeName,
                'does not exist',
                validator,
                attributeValidator,
                true,
            );
        }).to.throw(MissingValidatorReferenceError);
    });

    it('Expect NamingCollisionError for duplicate attribute.', function() {
        expect(() => {
            RegisterDefaultAttribute(
                attributeName,
                validatorName,
                validator,
                attributeValidator,
                true,
            );
        }).to.throw(NamingCollisionError);
    });

    it('Expect AttributeRegistrationError when trying to register attribute to defined validator(Not default).', function() {
        const validatorName: string = 'definedTestValidator';
        RegisterDefaultValidator(validatorName, validator, false);

        expect(() => {
            RegisterDefaultAttribute(
                attributeName,
                validatorName,
                validator,
                attributeValidator,
                true,
            );
        }).to.throw(AttributeRegistrationError);
    });
});
