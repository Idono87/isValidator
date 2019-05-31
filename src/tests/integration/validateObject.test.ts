import { expect } from 'chai';
import { ErrorReport, IConstraints, Validate } from '../..';

describe('Object integration test', function() {
    const input = {
        objectToValidate: {
            property1: 'a property',
        },
        emptyObjectToValidate: {},
    };

    const passingConstraints: IConstraints = {
        objectToValidate: {
            isObject: {
                isNotEmpty: undefined,
            },
        },
        emptyObjectToValidate: {
            isObject: {
                isEmpty: undefined,
            },
        },
    };

    const failingConstraints: IConstraints = {
        objectToValidate: {
            isObject: {
                isEmpty: undefined,
            },
        },
        emptyObjectToValidate: {
            isObject: {
                isNotEmpty: undefined,
            },
        },
    };

    it('Expect to pass validation', function() {
        expect(Validate(input, passingConstraints)).to.be.undefined;
    });

    it('Expect to fail all validations', function() {
        const toTest: void | ErrorReport = Validate(input, failingConstraints);

        expect(toTest)
            .to.have.nested.property('objectToValidate.isObject.isEmpty')
            .and.be.a('string');

        expect(toTest)
            .to.have.nested.property(
                'emptyObjectToValidate.isObject.isNotEmpty',
            )
            .and.be.a('string');
    });
});
