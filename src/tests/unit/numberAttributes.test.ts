import { expect } from 'chai';
import * as NumberAttributeValidators from '../../attributes/numberAttributes';

describe('Number Attributes', function() {
    describe('isEqualTo', function() {
        it('Expect isEqualTo pass where value equals validationValue', function() {
            expect(NumberAttributeValidators.isEqualTo(5, 5)).to.be.undefined;
        });
        it('Expect isEqualTo fail where value is unequal to validationValue', function() {
            expect(NumberAttributeValidators.isEqualTo(5, 6)).to.be.a('string');
        });
    });
    describe('isNotEqualTo', function() {
        it('Expect isEqualTo pass where value equals validationValue', function() {
            expect(NumberAttributeValidators.isNotEqualTo(5, 6)).to.be
                .undefined;
        });
        it('Expect isEqualTo fail where value is unequal to validationValue', function() {
            expect(NumberAttributeValidators.isNotEqualTo(5, 5)).to.be.a(
                'string',
            );
        });
    });
    describe('isLessThan', function() {
        it('Expect isLessThan to pass where value is less than validationValue', function() {
            expect(NumberAttributeValidators.isLessThan(5, 6)).to.be.undefined;
        });
        it('Expect isLessThan to fail where value is larger or equal to validationValue', function() {
            expect(NumberAttributeValidators.isLessThan(6, 6)).to.be.a(
                'string',
                'Expected to fail with a return string when value equals validationValue',
            );
            expect(NumberAttributeValidators.isLessThan(7, 6)).to.be.a(
                'string',
                'Expected to fail with a return string when value is larger than the validationValue',
            );
        });
    });
    describe('isLargerThan', function() {
        it('Expect isLargerThan to pass where value is larger than validationValue', function() {
            expect(NumberAttributeValidators.isLargerThan(7, 6)).to.be
                .undefined;
        });
        it('Expect isLargerThan to fail where value is less or equal to validationValue', function() {
            expect(NumberAttributeValidators.isLargerThan(6, 6)).to.be.a(
                'string',
                'Expected to fail with a return string when value equals validationValue',
            );
            expect(NumberAttributeValidators.isLargerThan(5, 6)).to.be.a(
                'string',
                'Expected to fail with a return string when value is less than the validationValue',
            );
        });
    });
    describe('isLessThanOrEqualTo', function() {
        it('Expect to pass with a value less than and a value equal to the validationValue', function() {
            expect(
                NumberAttributeValidators.isLessThanOrEqualTo(5, 6),
                'Expect to be less than validation value',
            ).to.be.undefined;
            expect(
                NumberAttributeValidators.isLessThanOrEqualTo(6, 6),
                'Expect to be equal to validation value',
            ).to.be.undefined;
        });
        it('Expect to fail with a value larger than validationValue', function() {
            expect(NumberAttributeValidators.isLessThanOrEqualTo(7, 6)).to.be.a(
                'string',
                'Expect to be larger than the validationValue',
            );
        });
    });
    describe('isLargerThanOrEqualTo', function() {
        it('Expect to pass with a value larger than and a value equal to the validationValue', function() {
            expect(
                NumberAttributeValidators.isLargerThanOrEqualTo(7, 6),
                'Expect to be larger than validation value',
            ).to.be.undefined;
            expect(
                NumberAttributeValidators.isLargerThanOrEqualTo(6, 6),
                'Expect to be equal to validation value',
            ).to.be.undefined;
        });
        it('Expect to fail with a value less than validationValue', function() {
            expect(
                NumberAttributeValidators.isLargerThanOrEqualTo(5, 6),
            ).to.be.a('string', 'Expect to be less than the validationValue');
        });
    });
});
