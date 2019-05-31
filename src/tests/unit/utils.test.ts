import { expect } from 'chai';
import TypeError from '../../errors/typeError';
import NamingCollisionError from '../../errors/namingCollisionError';
import MissingValidatorReferenceError from '../../errors/missingValidatorReferenceError';
import DuplicateReportError from '../../errors/duplicateReportError';

describe('Utils test', function() {
    it('TypeError Test', function() {
        expect(function test() {
            throw new TypeError('Test');
        }).to.throw(TypeError);
    });

    it('NamingCollisionError Test', function() {
        expect(function test() {
            throw new NamingCollisionError('Test');
        }).to.throw(NamingCollisionError);
    });

    it('MissingValidatorReferenceError Test', function() {
        expect(function test() {
            throw new MissingValidatorReferenceError('Test');
        }).to.throw(MissingValidatorReferenceError);
    });

    it('DoubleReportError Test', function() {
        expect(function test() {
            throw new DuplicateReportError('Test');
        }).to.throw(DuplicateReportError);
    });
});
