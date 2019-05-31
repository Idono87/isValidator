import { expect } from 'chai';
import { IAttributes } from '../../attributes/attributes';
import NamingCollisionError from '../../errors/namingCollisionError';
import TypeError from '../../errors/typeError';
import { GetValidator, RegisterDefaultValidator } from '../../isValidator';
import { ValidationResponse, Validator } from '../../validators';

describe('Register Default Validator Test', function() {
    const name = 'testValidator';
    const validator: Validator = function(
        value: any,
        key?: string,
        attributes?: IAttributes,
        object?: Object,
    ): ValidationResponse {
        value();
    };

    it('Expect validator registration to pass', function(done) {
        RegisterDefaultValidator(name, validator);

        const val = GetValidator(name);
        val!(done);
    });

    it('Expect NamingCollisionError for duplicate name to be thrown', function() {
        expect(function() {
            RegisterDefaultValidator(name, validator);
        }).to.throw(NamingCollisionError);
    });

    it('Expect non string name to throw TypeError', function() {
        expect(function() {
            RegisterDefaultValidator({} as any, validator);
        }).to.throw(TypeError);
    });

    it('Expect non function validator to throw TypeError', function() {
        expect(function() {
            RegisterDefaultValidator('name', <any>{});
        }).to.throw(TypeError);
    });
});
