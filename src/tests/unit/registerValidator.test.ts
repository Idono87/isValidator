import { expect } from 'chai';
import TypeError from '../../errors/typeError';
import NamingCollisionError from '../../errors/namingCollisionError';
import {
    RegisterValidator,
    GetWrappedValidator,
    RegisterDefaultValidator,
} from '../../isValidator';
import { Validator, ValidationResponse } from '../../validators';
import { IAttributes } from '../../attributes/attributes';

describe('Register Validator Test', function() {
    const name = 'testCustomValidator';
    const defaultName = 'testDefaultValidator';
    const validator: Validator = function(
        value: any,
        key?: string,
        attributes?: IAttributes,
    ): ValidationResponse {
        value();
    };

    it('Expect validator registration to pass', function(done) {
        RegisterValidator(name, validator);

        const val = GetWrappedValidator(name);
        val!(done);
    });

    it('Expect NamingCollisionError for duplicate name to be thrown', function() {
        expect(function() {
            RegisterValidator(name, validator);
        }).to.throw(NamingCollisionError);
    });

    it('Expect NamingCollisionError for duplicate name with default validator to be thrown', function() {
        RegisterDefaultValidator(defaultName, validator);

        expect(function() {
            RegisterValidator(defaultName, validator);
        }).to.throw(NamingCollisionError);
    });

    it('Expect non string name to throw TypeError', function() {
        expect(function() {
            RegisterValidator(<any>{}, validator);
        }).to.throw(TypeError);
    });

    it('Expect non function validator to throw TypeError', function() {
        expect(function() {
            RegisterValidator('name', <any>{});
        }).to.throw(TypeError);
    });
});
