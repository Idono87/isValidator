import { expect } from 'chai';

import TypeError from '../../errors/typeError';
import {
    IPropertyConstraints,
    ValidatePropertyConstraints,
} from '../../isValidator';

describe('ValidatPropertyConstraints', function() {
    it('Expect to pass constraints validation', function() {
        expect(ValidatePropertyConstraints({})).and.be.undefined;
    });

    it('Expect to fail constraints validation', function() {
        const constraints: IPropertyConstraints = {
            fakeConstraint: {},
        };

        expect(ValidatePropertyConstraints(constraints))
            .to.have.property('fakeConstraint')
            .and.be.a('string');
    });

    it('Expect to fail constraints validation', function() {
        expect(() => {
            ValidatePropertyConstraints('not a constraint' as any);
        }).to.throw(TypeError);
    });
});
