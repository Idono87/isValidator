import { expect } from 'chai';
import { IConstraints, Validate } from '../..';

describe('Type integration test', function() {
    const date = new Date();

    const input = {
        dateToTest: date,
    };

    const passingConstraints: IConstraints = {
        dateToTest: {
            isType: {
                type: Date,
            },
        },
    };

    const failingConstraints: IConstraints = {
        dateToTest: {
            isType: {
                type: Array,
            },
        },
    };

    it('Expect to pass validation', function() {
        expect(Validate(input, passingConstraints)).to.be.undefined;
    });

    it('Expect to fail validation', function() {
        expect(Validate(input, failingConstraints))
            .to.have.nested.property('dateToTest.isType')
            .and.be.a('string');
    });
});
