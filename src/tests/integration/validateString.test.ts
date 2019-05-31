import { expect } from 'chai';
import { IConstraints, ErrorReport, Validate } from '../..';

describe('String integration test', function() {
    const input: any = {
        stringToTest: 'THE STRING TO TEST',
        lowerCaseTest: 'the string to test',
    };

    const passingConstraints: IConstraints = {
        stringToTest: {
            isString: {
                isLengthOf: input.stringToTest.length,
                isNotLengthOf: input.stringToTest.length + 10,
                isUpperCase: undefined,
                isMaxLength: input.stringToTest.length + 10,
                isMinLength: input.stringToTest.length - 10,
                matchRegExp: /THE STRING TO TEST/,
            },
        },
        lowerCaseTest: {
            isString: {
                isLowerCase: undefined,
            },
        },
    };

    const failingConstraints: IConstraints = {
        stringToTest: {
            isString: {
                isLengthOf: input.stringToTest.length + 10,
                isNotLengthOf: input.stringToTest.length,
                isLowerCase: undefined,
                isMaxLength: input.stringToTest.length - 10,
                isMinLength: input.stringToTest.length + 10,
                matchRegExp: /Don't Match/,
            },
        },
        lowerCaseTest: {
            isString: {
                isUpperCase: undefined,
            },
        },
    };

    it('Expect to pass validation', function() {
        expect(Validate(input, passingConstraints)).to.be.undefined;
    });

    it('Expect to fail all attributes', function() {
        const toTest: void | ErrorReport = Validate(input, failingConstraints);
        expect(toTest)
            .to.have.nested.property('stringToTest.isString.isLengthOf')
            .and.be.a('string');

        expect(toTest)
            .to.have.nested.property('stringToTest.isString.isNotLengthOf')
            .and.be.a('string');

        expect(toTest)
            .to.have.nested.property('stringToTest.isString.isLowerCase')
            .and.be.a('string');

        expect(toTest)
            .to.have.nested.property('lowerCaseTest.isString.isUpperCase')
            .and.be.a('string');

        expect(toTest)
            .to.have.nested.property('stringToTest.isString.isMaxLength')
            .and.be.a('string');

        expect(toTest)
            .to.have.nested.property('stringToTest.isString.isMinLength')
            .and.be.a('string');
    });
});
