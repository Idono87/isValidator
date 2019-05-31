import { expect } from 'chai';
import * as FunctionAttributeValidators from '../../attributes/functionAttributes';

describe('Function Attributes', function() {
    describe('isLength', function() {
        const input = function(arg1: any, arg2: any) {};

        it('Expect to match length', function() {
            expect(FunctionAttributeValidators.isLength(input, input.length)).to
                .be.undefined;
        });

        it('Expect to not match length', function() {
            expect(
                FunctionAttributeValidators.isLength(input, input.length + 2),
            ).to.be.a('string');
        });
    });
});
