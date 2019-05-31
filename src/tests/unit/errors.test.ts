import { expect } from 'chai';
import AttributeRegistrationError from '../../errors/attributeRegistrationError';
import BaseError from '../../errors/baseError';
import DuplicateReportError from '../../errors/duplicateReportError';
import MissingValidatorReferenceError from '../../errors/missingValidatorReferenceError';
import NamingCollisionError from '../../errors/namingCollisionError';
import CustomTypeError from '../../errors/typeError';

describe('Error Tests', function() {
    it('Expect BaseError instancing to throw an error', function() {
        expect(() => {
            new BaseError('test message');
        }).to.throw(SyntaxError);
    });

    const errorList = [
        AttributeRegistrationError,
        DuplicateReportError,
        MissingValidatorReferenceError,
        NamingCollisionError,
        CustomTypeError,
    ];

    errorList.forEach((errConstructor) => {
        describe(`${errConstructor.name}`, function() {
            it('Expect thrown error with constructOpt', function() {
                const testFunction = () => {
                    throw new errConstructor('Test error', testFunction);
                };
                expect(() => {
                    testFunction();
                }).to.throw(errConstructor);
            });

            it('Expect thrown error without constructOpt', function() {
                expect(() => {
                    throw new errConstructor('Test error');
                }).to.throw(errConstructor);
            });

            it('Expect TypeError when constructorOpt is not a function', function() {
                expect(() => {
                    new errConstructor('Test error', 'not a function' as any);
                }).to.throw(TypeError);
            });
        });
    });
});
