import { expect } from 'chai';
import { IConstraints, Validate, ErrorReport } from '../..';

describe('Array integration test', function() {
    const input = {
        stringArray: ['a string', 'another string'],
        multiTypeArray: ['a string', new Date(), 10],
    };

    const passingConstraints: IConstraints = {
        stringArray: {
            isArray: {
                isLengthOf: input.stringArray.length,
                isNotLengthOf: input.stringArray.length + 10,
                isMaxLength: input.stringArray.length + 10,
                isMinLength: input.stringArray.length - 1,
                isOfType: 'string',
                isNotOfType: 'number',
                isStrictEqualTo: input.stringArray,
                hasValues: [input.stringArray[1]],
                doesNotHaveValues: ['not in the array'],
                isEqualTo: [input.stringArray[1], input.stringArray[0]],
            },
        },
        multiTypeArray: {
            isArray: {
                isOfTypes: ['string', 'number', Date],
                isStrictOfTypes: ['string', Date, 'number'],
                isNotOfTypes: ['object', Array],
            },
        },
    };

    const failingConstraints: IConstraints = {
        stringArray: {
            isArray: {
                isLengthOf: input.stringArray.length + 10,
                isNotLengthOf: input.stringArray.length,
                isMaxLength: input.stringArray.length - 1,
                isMinLength: input.stringArray.length + 10,
                isOfType: 'number',
                isNotOfType: 'string',
                isStrictEqualTo: [1, 2, 3],
                hasValues: [2],
                doesNotHaveValues: ['a string'],
                isEqualTo: [2, 3],
            },
        },
        multiTypeArray: {
            isArray: {
                isOfTypes: ['object', Array],
                isStrictOfTypes: ['object', Array],
                isNotOfTypes: ['string', 'number', Date],
            },
        },
    };

    it('Expect to pass validation', function() {
        expect(Validate(input, passingConstraints)).to.be.undefined;
    });

    it('Expect to fail validation', function() {
        const toTest: void | ErrorReport = Validate(input, failingConstraints);

        expect(toTest, 'Expect to not be equal')
            .to.have.nested.property('stringArray.isArray.isLengthOf')
            .and.be.a('string');

        expect(toTest, 'Expect to be equal to')
            .to.have.nested.property('stringArray.isArray.isNotLengthOf')
            .and.be.a('string');

        expect(toTest, 'Expect to be larger than max length')
            .to.have.nested.property('stringArray.isArray.isMaxLength')
            .and.be.a('string');

        expect(toTest, 'Expect to be less than min length')
            .to.have.nested.property('stringArray.isArray.isMinLength')
            .and.be.a('string');

        expect(toTest, 'Expect to not be of type')
            .to.have.nested.property('stringArray.isArray.isOfType.0')
            .and.be.a('string');

        expect(toTest, 'Expect to not be of type')
            .to.have.nested.property('stringArray.isArray.isOfType.1')
            .and.be.a('string');

        expect(toTest, 'Expect to be of type')
            .to.have.nested.property('stringArray.isArray.isNotOfType.0')
            .and.be.a('string');

        expect(toTest, 'Expect to be of type')
            .to.have.nested.property('stringArray.isArray.isNotOfType.1')
            .and.be.a('string');

        expect(toTest, 'Expect to not be strictly equal to')
            .to.have.nested.property('stringArray.isArray.isStrictEqualTo.0')
            .and.be.a('string');

        expect(toTest, 'Expect to not be strictly equal to')
            .to.have.nested.property('stringArray.isArray.isStrictEqualTo.1')
            .and.be.a('string');

        expect(toTest, 'Expect to not be strictly equal to')
            .to.have.nested.property('stringArray.isArray.isStrictEqualTo.2')
            .and.be.a('string');

        expect(toTest, 'Expect to not have the value')
            .to.have.nested.property('stringArray.isArray.hasValues.0')
            .and.be.a('string');

        expect(toTest, 'Expect to have the value')
            .to.have.nested.property('stringArray.isArray.doesNotHaveValues.0')
            .and.be.a('string');

        expect(toTest, 'Expect to not be equal to')
            .to.have.nested.property('stringArray.isArray.isEqualTo.0')
            .and.be.a('string');

        expect(toTest, 'Expect to not be equal to')
            .to.have.nested.property('stringArray.isArray.isEqualTo.1')
            .and.be.a('string');

        expect(toTest, 'Expect to not equal type')
            .to.have.nested.property('multiTypeArray.isArray.isOfTypes.0')
            .and.be.a('string');

        expect(toTest, 'Expect to not equal type')
            .to.have.nested.property('multiTypeArray.isArray.isOfTypes.1')
            .and.be.a('string');

        expect(toTest, 'Expect to not equal type')
            .to.have.nested.property('multiTypeArray.isArray.isOfTypes.2')
            .and.be.a('string');

        expect(toTest, 'Expect to not be strict of types')
            .to.have.nested.property('multiTypeArray.isArray.isStrictOfTypes.0')
            .and.be.a('string');

        expect(toTest, 'Expect to not equal type')
            .to.have.nested.property('multiTypeArray.isArray.isStrictOfTypes.1')
            .and.be.a('string');

        expect(toTest, 'Expect to not equal type')
            .to.have.nested.property('multiTypeArray.isArray.isStrictOfTypes.2')
            .and.be.a('string');
    });
});
