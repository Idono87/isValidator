import { expect } from 'chai';

import ConstraintOptions from '../../constraintOptions';
import TypeError from '../../errors/typeError';
import { IConstraintOptions } from '../../isValidator';

describe('ConstraintOptions', function() {
    it('Expect default IConstraintsOptions object to be created', function() {
        const toTest: IConstraintOptions = ConstraintOptions.createConstraintOptions();
        expect(toTest).to.have.property('strict').and.be.false;
    });

    it('Expect default IConstraintsOptions object to be created when passing empty object.', function() {
        const toTest: IConstraintOptions = ConstraintOptions.createConstraintOptions(
            {},
        );
        expect(toTest).to.have.property('strict').and.be.false;
    });

    it('Expect user defined IConstraintOptions to be created', function() {
        const options: IConstraintOptions = {
            strict: true,
        };

        const toTest: IConstraintOptions = ConstraintOptions.createConstraintOptions(
            options,
        );

        expect(toTest).to.have.property('strict').and.be.true;
    });

    it('Expect a type error for non options object.', function() {
        const options: IConstraintOptions = 'not an object' as any;

        expect(() => {
            ConstraintOptions.createConstraintOptions(options);
        }).to.throw(TypeError);
    });

    it('Expect a type error for constraint option', function() {
        const options: IConstraintOptions = {
            strict: 5 as any,
        };

        expect(() => {
            ConstraintOptions.createConstraintOptions(options);
        }).to.throw(TypeError);
    });
});
