import { expect } from 'chai';

import { IPropertyConstraints, ValidatePropertyConstraints } from '../..';

describe('ValidatePropertyConstraints', function() {
    it('Expect to pass validation', function() {
        const constraints: IPropertyConstraints = {
            isString: {
                isMaxLength: 10,
            },
        };

        expect(ValidatePropertyConstraints(constraints)).to.be.undefined;
    });

    it('Expect to fail validation', function() {
        const constraints: IPropertyConstraints = {
            isString: {
                isMaxLength: 'not a number' as any,
            },
        };

        expect(ValidatePropertyConstraints(constraints))
            .have.nested.property('isString.isMaxLength')
            .and.be.a('string');
    });
});
