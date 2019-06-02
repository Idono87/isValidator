import { expect } from 'chai';
import { IConstraints, Validate, ErrorReport } from '../..';

describe('Array integration test', function() {
    const input = {
        arrayBuffer: new ArrayBuffer(20),
    };

    const passingConstraints: IConstraints = {
        arrayBuffer: {
            isArrayBuffer: {},
        },
    };

    it('Expect to pass', function() {
        expect(Validate(input, passingConstraints)).to.be.undefined;
    });
});
