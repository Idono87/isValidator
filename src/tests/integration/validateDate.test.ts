import { expect } from 'chai';
import { Validate, IConstraints, ErrorReport } from '../..';

describe('Date integration tests', function() {
    const date = new Date(50000);
    const input = {
        dateToTest: date,
    };

    const passingConstraints: IConstraints = {
        dateToTest: {
            isDate: {
                isEqualTo: date,
                isGreaterThan: new Date(date.getTime() - 1000),
                isLessThan: new Date(date.getTime() + 1000),
                isGreaterThanOrEqualTo: date,
                isLessThanOrEqualTo: date,
                isNotEqualTo: new Date(),
            },
        },
    };

    const failingConstraints: IConstraints = {
        dateToTest: {
            isDate: {
                isEqualTo: new Date(3000),
                isGreaterThan: new Date(date.getTime() + 1000),
                isLessThan: new Date(date.getTime() - 1000),
                isGreaterThanOrEqualTo: new Date(date.getTime() + 1000),
                isLessThanOrEqualTo: new Date(date.getTime() - 1000),
                isNotEqualTo: date,
            },
        },
    };

    it('Expect to pass validation', function() {
        expect(Validate(input, passingConstraints));
    });

    it('Expect to fail all tests', function() {
        const toTest: void | ErrorReport = Validate(input, failingConstraints);

        expect(toTest)
            .to.have.nested.property('dateToTest.isDate.isEqualTo')
            .and.be.a('string');

        expect(toTest)
            .to.have.nested.property('dateToTest.isDate.isGreaterThan')
            .and.be.a('string');

        expect(toTest)
            .to.have.nested.property('dateToTest.isDate.isLessThan')
            .and.be.a('string');

        expect(toTest)
            .to.have.nested.property('dateToTest.isDate.isGreaterThanOrEqualTo')
            .and.be.a('string');

        expect(toTest)
            .to.have.nested.property('dateToTest.isDate.isLessThanOrEqualTo')
            .and.be.a('string');

        expect(toTest)
            .to.have.nested.property('dateToTest.isDate.isNotEqualTo')
            .and.be.a('string');
    });
});
