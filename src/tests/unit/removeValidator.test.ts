import { expect } from 'chai';

import {
    RemoveValidator,
    GetWrappedValidator as GetValidator,
    RegisterValidator,
} from '../../isValidator';
import { Validator } from '../../validators';
import TypeError from '../../errors/typeError';

describe('Remove Validator', function() {
    it('Expect validator to be removed', function() {
        const name = 'testRemoveValidator';
        const validator: Validator = function() {};

        RegisterValidator(name, validator);
        RemoveValidator(name);

        expect(GetValidator(name)).to.undefined;
    });

    it('Expect non string name to throw a TypeError', function() {
        expect(function() {
            RemoveValidator(<string>{});
        }).to.throw(TypeError);
    });
});
