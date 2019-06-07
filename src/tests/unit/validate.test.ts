import { expect } from 'chai';

import TypeError from '../../errors/typeError';
import { IConstraints, Validate, ValidateValue } from '../../isValidator';

describe('Validation Functions', function() {
    describe('Validate', function() {
        it('Expect to pass', function() {
            expect(Validate({}, {}, {})).to.be.undefined;
        });

        it('Expect TypeError thrown from non object options.', function() {
            expect(() => {
                Validate({}, {}, 'not an object' as any);
            }).to.throw(TypeError);
        });

        it('Expect TypeError thrown from non object constraints', function() {
            expect(() => {
                Validate({}, 'not an object' as any, {});
            }).to.throw(TypeError);
        });

        it('Expect TypeError thrown for non object top validate', function() {
            expect(() => {
                Validate('not an object' as any, {}, {});
            }).to.throw(TypeError);
        });

        it('Expect constraints validation failure', function() {
            const constraints: IConstraints = {
                property: {
                    validator: {},
                },
            };
            expect(Validate({}, constraints, {}))
                .have.nested.property('property.validator')
                .and.be.a('string');
        });
    });

    describe('ValidateValue', function() {
        it('Expect to pass', function() {
            expect(ValidateValue({}, {}, {})).to.be.undefined;
        });

        it('Expect TypeError thrown from non object options.', function() {
            expect(() => {
                ValidateValue({}, {}, 'not an object' as any);
            }).to.throw(TypeError);
        });

        it('Expect TypeError thrown from non object constraints', function() {
            expect(() => {
                ValidateValue({}, 'not an object' as any, {});
            }).to.throw(TypeError);
        });
    });
});
