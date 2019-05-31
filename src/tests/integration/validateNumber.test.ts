import { expect } from 'chai';
import { ErrorReport, IConstraints, Validate } from '../..';
import {} from '../../errorHandler';

describe('number integration test', function() {
    const input = {
        numberToTest: 256,
    };

    const passingConstraints: IConstraints = {
        numberToTest: {
            isNumber: {
                isEqualTo: input.numberToTest,
                isNotEqualTo: input.numberToTest + 1,
                isLargerThan: input.numberToTest - 1,
                isLessThan: input.numberToTest + 1,
                isLargerThanOrEqualTo: input.numberToTest,
                isLessThanOrEqualTo: input.numberToTest,
            },
        },
    };

    const failingConstraints: IConstraints = {
        numberToTest: {
            isNumber: {
                isEqualTo: input.numberToTest + 1,
                isNotEqualTo: input.numberToTest,
                isLargerThan: input.numberToTest + 1,
                isLessThan: input.numberToTest - 1,
                isLargerThanOrEqualTo: input.numberToTest + 1,
                isLessThanOrEqualTo: input.numberToTest - 1,
            },
        },
    };

    it('expect to pass validation', function() {
        expect(Validate(input, passingConstraints)).to.be.undefined;
    });

    it('expect to fail all attributes', function() {
        const toTest: void | ErrorReport = Validate(input, failingConstraints);

        expect(toTest)
            .to.have.nested.property('numberToTest.isNumber.isEqualTo')
            .and.be.a('string');

        expect(toTest)
            .to.have.nested.property('numberToTest.isNumber.isNotEqualTo')
            .and.be.a('string');

        expect(toTest)
            .to.have.nested.property('numberToTest.isNumber.isLargerThan')
            .and.be.a('string');

        expect(toTest)
            .to.have.nested.property('numberToTest.isNumber.isLessThan')
            .and.be.a('string');

        expect(toTest)
            .to.have.nested.property(
                'numberToTest.isNumber.isLargerThanOrEqualTo',
            )
            .and.be.a('string');

        expect(toTest)
            .to.have.nested.property(
                'numberToTest.isNumber.isLessThanOrEqualTo',
            )
            .and.be.a('string');
    });
});
