import { expect } from 'chai';
import { IConstraints, Validate } from '../..';

const createBufferFromInput = (str: string) => {
    const buffer: ArrayBuffer = new ArrayBuffer(str.length * 2);
    const bufferView: Uint16Array = new Uint16Array(buffer);

    str.split('').forEach((char, index) => {
        bufferView[index] = char.charCodeAt(0);
    });

    return buffer;
};

describe('ArrayBuffer integration test', function() {
    const bufferstring: string = 'abcdefgh';

    const input = {
        arrayBuffer: createBufferFromInput(bufferstring),
    };

    const passingConstraints: IConstraints = {
        arrayBuffer: {
            isArrayBuffer: {
                isByteLengthOf: input.arrayBuffer.byteLength,
                isEqualTo: createBufferFromInput(bufferstring),
                isNotEqualTo: createBufferFromInput(
                    bufferstring.slice(0, bufferstring.length - 1) + 'a',
                ),
            },
        },
    };

    const failingConstraints: IConstraints = {
        arrayBuffer: {
            isArrayBuffer: {
                isByteLengthOf: input.arrayBuffer.byteLength + 1,
                isEqualTo: createBufferFromInput(
                    bufferstring.slice(0, bufferstring.length - 1) + 'a',
                ),
                isNotEqualTo: createBufferFromInput(bufferstring),
            },
        },
    };

    it('Expect to pass', function() {
        expect(Validate(input, passingConstraints)).to.be.undefined;
    });

    it('Expect to fail', function() {
        const toTest = Validate(input, failingConstraints);

        expect(toTest, 'Expect the isEqualTo attribute validator to fail')
            .to.have.nested.property('arrayBuffer.isArrayBuffer.isEqualTo')
            .and.be.a('string');

        expect(toTest, 'Expect the isNotEqualTo attribute validator to fail')
            .to.have.nested.property('arrayBuffer.isArrayBuffer.isNotEqualTo')
            .and.be.a('string');

        expect(toTest, 'Expect the isByteLengthOf attribute validator to fail')
            .to.have.nested.property('arrayBuffer.isArrayBuffer.isByteLengthOf')
            .and.be.a('string');
    });
});
