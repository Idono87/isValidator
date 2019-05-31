import { expect } from 'chai';

import {
    RegisterValidator,
    RegisterAttribute,
    GetWrappedAttributeValidator as GetAttributeValidator,
    RemoveAttribute,
} from '../../isValidator';
import { Validator } from '../../validators';
import { AttributeValidator } from '../../attributes/attributes';
import TypeError from '../../errors/typeError';

describe('RemoveAttribute', function() {
    it('Expect attribute to be removed', function() {
        const validatorName = 'testRemoveAttribute';
        const validator: Validator = () => {};
        RegisterValidator(validatorName, validator);

        const attributeName = 'testRemoveAttribute';
        const attributeValidator: AttributeValidator = () => {};
        RegisterAttribute(
            attributeName,
            validatorName,
            validator,
            attributeValidator,
        );

        RemoveAttribute(attributeName, validatorName);

        expect(GetAttributeValidator(attributeName, validatorName)).to.be
            .undefined;
    });

    it('Expect non string attribute name to throw a TypeError', function() {
        expect(function() {
            RemoveAttribute(<string>{}, 'name');
        }).to.throw(TypeError);
    });

    it('Expect non string validator name to throw a TypeError', function() {
        expect(function() {
            RemoveAttribute('name', <string>{});
        }).to.throw(TypeError);
    });
});
