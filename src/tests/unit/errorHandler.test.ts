import { expect } from 'chai';
import { ErrorHandler, IErrorStructure, ErrorReport } from '../../errorHandler';
import DuplicateReportError from '../../errors/duplicateReportError';

describe('Error Handler', function() {
    const errorMessage = 'This is an error message';
    const outputStructure: IErrorStructure = {
        testProperty1: {
            nestedProperty1: {
                validatorName: {
                    message: errorMessage,
                    attributes: {
                        attribute1: errorMessage,
                        attribute2: errorMessage,
                    },
                },
            },
        },
    };

    const inputs = [
        'testProperty1.nestedProperty1.validatorName.message',
        'testProperty1.nestedProperty1.validatorName.attributes.attribute1',
        'testProperty1.nestedProperty1.validatorName.attributes.attribute2',
    ];

    let eh: ErrorHandler;

    before(function() {
        eh = new ErrorHandler();
    });

    it('Expecting input to produce outputStructure', function() {
        inputs.forEach((path) => {
            eh.reportError(path, errorMessage);
        });

        const errors: ErrorReport = eh.getReport();

        expect(errors).to.deep.equal(outputStructure);
        expect(errors).to.be.frozen;
    });

    it('Expecting error handler to throw object is frozen error', function() {
        expect(function() {
            eh.reportError('bogus.path', 'not an error');
        }).to.throw(Error);
    });

    it('Test hasErrors', function() {
        eh = new ErrorHandler();

        expect(eh.hasErrors).to.be.false;

        inputs.forEach((path) => {
            eh.reportError(path, errorMessage);
        });

        expect(eh.hasErrors).to.be.true;
    });

    it('Expect undefined return from error handler', function() {
        const eh: ErrorHandler = new ErrorHandler();

        expect(eh.getReport()).to.be.undefined;
    });

    it('Expect thrown error when trying to overwrite existing message', function() {
        const eh: ErrorHandler = new ErrorHandler();
        eh.reportError(inputs[0], 'Reported Error');

        expect(function() {
            eh.reportError(inputs[0], 'Should throw error');
        }).to.throw(Error);
    });

    it('Expect thrown error when trying to overwrite nested error object.', function() {
        const eh: ErrorHandler = new ErrorHandler();
        eh.reportError(inputs[0], 'Reported Error');

        expect(function() {
            eh.reportError('testProperty1', 'Should throw error');
        }).to.throw(DuplicateReportError);
    });
});
