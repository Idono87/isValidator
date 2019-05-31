import { expect } from 'chai';
import * as StringAttributes from '../../attributes/stringAttributes';
describe('String Attributes', function() {
    describe('isLengthOf', function() {
        it('Expect to pass with a string of proper length.', function() {
            expect(StringAttributes.isLengthOf('length of 12', 12)).to.be
                .undefined;
        });
        it('Expect isLength to fail with a string less than and greater than expect value.', function() {
            expect(StringAttributes.isLengthOf('Less than 50', 50)).to.be.a(
                'string',
            );
            expect(StringAttributes.isLengthOf('Larger than 5', 5)).to.be.a(
                'string',
            );
        });
    });

    describe('isNotLengthOf', function() {
        it('Expect string to pass and not be length of n', function() {
            expect(StringAttributes.isNotLengthOf('not length of 12', 12)).to.be
                .undefined;
        });

        it('Expect string to fail when of length n', function() {
            expect(StringAttributes.isNotLengthOf('length of 12', 12)).to.be.a(
                'string',
            );
        });
    });

    describe('isMaxLength', function() {
        it('Expect isMaxLength to pass and be less than the given validationValue', function() {
            const str = 'Expect to be less than validation value';
            expect(StringAttributes.isMaxLength(str, str.length + 20)).to.be
                .undefined;
        });
        it('Expect isMaxLength to pass and be equal than the given validationValue', function() {
            const str = 'Expect to be equal validation value';
            expect(StringAttributes.isMaxLength(str, str.length)).to.be
                .undefined;
        });
        it('Expect isMaxLength to fail and be larger than the given validationValue', function() {
            const str = 'Expect to be less than validation value';
            expect(StringAttributes.isMaxLength(str, str.length - 10)).to.be.a(
                'string',
            );
        });
    });
    describe('isMinLength', function() {
        it('Expect isMinLength to pass and be larger than the given validationValue', function() {
            const str = 'Expect to be larger than validation value';
            expect(StringAttributes.isMinLength(str, str.length - 5)).to.be
                .undefined;
        });
        it('Expect isMinLength to pass and be equal the given validationValue', function() {
            const str = 'Expect to be equal to the validation value';
            expect(StringAttributes.isMinLength(str, str.length)).to.be
                .undefined;
        });
        it('Expect isMinLength to fail and be less than the given validationValue', function() {
            const str = 'Expect to be less than validation value';
            expect(StringAttributes.isMinLength(str, str.length + 55)).to.be.a(
                'string',
            );
        });
    });
    describe('isUpperCase', function() {
        const input = 'À strìng';

        it('expect to be all uppercase', function() {
            expect(
                StringAttributes.isUpperCase(input.toLocaleUpperCase(), true),
            ).to.be.undefined;
        });

        it('expect to not be all uppercase', function() {
            expect(StringAttributes.isUpperCase(input, true)).to.be.a('string');
        });
    });

    describe('isLowerCase', function() {
        const input = 'À strìng';

        it('expect to be all lowercase', function() {
            expect(
                StringAttributes.isLowerCase(input.toLocaleLowerCase(), true),
            ).to.be.undefined;
        });

        it('expect to not be all lowercase', function() {
            expect(StringAttributes.isLowerCase(input, true)).to.be.a('string');
        });
    });

    describe('matchRegExp', function() {
        const regExp = /testRegExp/;

        it('Expect to match with RegExp', function() {
            expect(
                StringAttributes.matchRegExp(
                    'Match with testRegExp string',
                    regExp,
                ),
            ).to.be.undefined;
        });

        it('Expect to not match with RegExp', function() {
            expect(
                StringAttributes.matchRegExp('Dont match with string', regExp),
            ).to.be.a('string');
        });
    });
});
