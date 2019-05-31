import { expect } from 'chai';
import { Validate, IConstraints } from '../..';

describe('Function integration tests', function() {
    const input = {
        functionProperty: function(param1: any, param2: any, param3: any) {},
    };

    const passingConstraints: IConstraints = {
        functionProperty: {
            isFunction: {
                isLength: 3,
            },
        },
    };

    const failingConstraints: IConstraints = {
        functionProperty: {
            isFunction: {
                isLength: 5,
            },
        },
    };

    it('Expect to pass validation', function() {
        expect(Validate(input, passingConstraints)).to.be.undefined;
    });

    it('Expect to fail validation', function() {
        expect(Validate(input, failingConstraints))
            .to.have.nested.property('functionProperty.isFunction.isLength')
            .and.be.a('string');
    });
});
