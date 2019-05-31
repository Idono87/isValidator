import { expect } from 'chai';
import * as DateAttributes from '../../attributes/dateAttributes';

describe('dateAttributes', function() {
    const firstDate = new Date(500000000);
    const secondDate = new Date(600000000);

    describe('isEqualTo', function() {
        it('Expect to be equal', function() {
            expect(DateAttributes.isEqualTo(firstDate, firstDate)).to.be
                .undefined;
        });

        it('Expect to not be equal', function() {
            expect(DateAttributes.isEqualTo(firstDate, new Date())).to.be.a(
                'string',
            );
        });
    });

    describe('isNotEqualTo', function() {
        it('Expect to not be equal', function() {
            expect(DateAttributes.isNotEqualTo(firstDate, secondDate)).to.be
                .undefined;
        });

        it('Expect to be equal', function() {
            expect(DateAttributes.isNotEqualTo(firstDate, firstDate)).to.be.a(
                'string',
            );
        });
    });

    describe('isLessThan', function() {
        it('Expect first date to be less than the second date.', function() {
            expect(DateAttributes.isLessThan(firstDate, secondDate)).to.be
                .undefined;
        });

        it('Expect first date to not be less than the second date.', function() {
            expect(DateAttributes.isLessThan(secondDate, firstDate)).to.be.a(
                'string',
            );
        });

        it('Expect first date to not equal the second date.', function() {
            expect(DateAttributes.isLessThan(secondDate, secondDate)).to.be.a(
                'string',
            );
        });
    });

    describe('isGreaterThan', function() {
        it('Expect first date to be greater than the second date.', function() {
            expect(DateAttributes.isGreaterThan(secondDate, firstDate)).to.be
                .undefined;
        });

        it('Expect first date to not be greater than the second date.', function() {
            expect(DateAttributes.isGreaterThan(firstDate, secondDate)).to.be.a(
                'string',
            );
        });

        it('Expect first date to not equal the second date.', function() {
            expect(
                DateAttributes.isGreaterThan(secondDate, secondDate),
            ).to.be.a('string');
        });
    });

    describe('isLessThanOrEqualTo', function() {
        it('Expect first date to equal to the second date.', function() {
            expect(DateAttributes.isLessThanOrEqualTo(firstDate, firstDate)).to
                .be.undefined;
        });

        it('Expect first date to be less than the second date.', function() {
            expect(DateAttributes.isLessThanOrEqualTo(firstDate, secondDate)).to
                .be.undefined;
        });

        it('Expect first date to not be less than the second date.', function() {
            expect(
                DateAttributes.isLessThanOrEqualTo(secondDate, firstDate),
            ).to.be.a('string');
        });
    });

    describe('isGreaterThanOrEqualTo', function() {
        it('Expect first date to equal to the second date.', function() {
            expect(
                DateAttributes.isGreaterThanOrEqualTo(secondDate, secondDate),
            ).to.be.undefined;
        });

        it('Expect first date to be greater than the second date.', function() {
            expect(DateAttributes.isGreaterThanOrEqualTo(secondDate, firstDate))
                .to.be.undefined;
        });

        it('Expect first date to not be greater than the second date.', function() {
            expect(
                DateAttributes.isGreaterThanOrEqualTo(firstDate, secondDate),
            ).to.be.a('string');
        });
    });

    describe('isDateType', function() {
        it('expect attribute type date to pass', function() {
            expect(DateAttributes.isTypeDate(new Date())).to.be.undefined;
        });

        it('expect attribute type string to fail', function() {
            expect(DateAttributes.isTypeDate('not a date')).to.be.a('string');
        });
    });
});
