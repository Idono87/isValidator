import { expect } from 'chai';

import TypeError from '../../errors/typeError';
import { IConstraints, ValidateConstraints } from '../../isValidator';

describe('ValidatConstraints', function() {
    it('Expect to pass constraints validation', function() {
        expect(ValidateConstraints({})).and.be.undefined;
    });

    it('Expect to fail constraints validation', function() {
        const constraints: IConstraints = {
            propertyToTest: {
                fakeConstraint: {},
            },
        };

        expect(ValidateConstraints(constraints))
            .to.have.nested.property('propertyToTest.fakeConstraint')
            .and.be.a('string');
    });

    it('Expect to fail constraints validation', function() {
        expect(() => {
            ValidateConstraints('not a constraint' as any);
        }).to.throw(TypeError);
    });
});
