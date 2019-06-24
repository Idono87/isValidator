import { expect } from 'chai';

import { IConstraints, ValidateConstraints } from '../..';

describe('ValidateConstraints', function() {
    it('Expect to pass validation', function() {
        const constraints: IConstraints = {
            property: {
                isString: {
                    isMaxLength: 10,
                },
            },
        };

        expect(ValidateConstraints(constraints)).to.be.undefined;
    });

    it('Expect to fail validation', function() {
        const constraints: IConstraints = {
            property: {
                isString: {
                    isMaxLength: 'not a number' as any,
                },
            },
        };

        expect(ValidateConstraints(constraints))
            .have.nested.property('property.isString.isMaxLength')
            .and.be.a('string');
    });
});
