import { expect } from 'chai';
import * as ArrayBufferAttributes from '../../attributes/arrayBufferAttributes';
import { ValidationResponse } from '../../validators';

const createBufferFromInput = (str: string) => {
    const buffer: ArrayBuffer = new ArrayBuffer(str.length * 2);
    const bufferView: Uint16Array = new Uint16Array(buffer);

    str.split('').forEach((char, index) => {
        bufferView[index] = char.charCodeAt(0);
    });

    return buffer;
};

describe('ArrayBufferAttributes', function() {
    describe('isEqualTo', function() {
        const input = 'abcdefgh';
        const byteSize: number = input.length * 2;

        it('Expect isEqualTo to pass', function() {
            const buffer: ArrayBuffer = createBufferFromInput(input);
            const compareBuffer: ArrayBuffer = createBufferFromInput(input);

            expect(ArrayBufferAttributes.isEqualTo(buffer, compareBuffer)).to.be
                .undefined;
        });

        it('Expect isEqualTo to fail when buffer sizes differ', function() {
            const buffer: ArrayBuffer = createBufferFromInput(input);
            const compareBuffer: ArrayBuffer = createBufferFromInput(
                input + 'ijk',
            );

            expect(
                ArrayBufferAttributes.isEqualTo(buffer, compareBuffer),
            ).to.be.a('string');
        });

        it('Expect isEqualTo to fail when buffer sizes are equal', function() {
            const buffer: ArrayBuffer = createBufferFromInput(input);
            const compareBuffer: ArrayBuffer = createBufferFromInput(
                input.slice(0, input.length - 1) + 'l',
            );

            expect(
                ArrayBufferAttributes.isEqualTo(buffer, compareBuffer),
            ).to.be.a('string');
        });
    });

    describe('isNotEqualTo', function() {
        const input = 'abcdefgh';
        const byteSize: number = input.length * 2;

        it('Expect isNotEqualTo to pass when the buffer sizes differ.', function() {
            const buffer: ArrayBuffer = createBufferFromInput(input);
            const compareBuffer: ArrayBuffer = createBufferFromInput(
                input + 'ijk',
            );

            expect(ArrayBufferAttributes.isNotEqualTo(buffer, compareBuffer)).to
                .be.undefined;
        });

        it('Expect isNotEqualTo to pass when the buffer sizes are equal', function() {
            const buffer: ArrayBuffer = createBufferFromInput(input);
            const compareBuffer: ArrayBuffer = createBufferFromInput(
                input.slice(0, input.length - 1) + 'a',
            );

            expect(ArrayBufferAttributes.isNotEqualTo(buffer, compareBuffer)).to
                .be.undefined;
        });

        it('Expect isNotEqualTo to fail when both buffers are equal.', function() {
            const buffer: ArrayBuffer = createBufferFromInput(input);
            const compareBuffer: ArrayBuffer = createBufferFromInput(input);

            expect(
                ArrayBufferAttributes.isNotEqualTo(buffer, compareBuffer),
            ).to.be.a('string');
        });
    });

    describe('isByteLengthOf', function() {
        const input: string = 'abcdefgh';
        const buffer: ArrayBuffer = createBufferFromInput(input);

        it('Expect to pass', function() {
            expect(
                ArrayBufferAttributes.isByteLengthOf(buffer, buffer.byteLength),
            ).to.be.undefined;
        });

        it('Expect to fail', function() {
            expect(
                ArrayBufferAttributes.isByteLengthOf(
                    buffer,
                    buffer.byteLength + 1,
                ),
            ).to.be.a('string');
        });
    });
});
