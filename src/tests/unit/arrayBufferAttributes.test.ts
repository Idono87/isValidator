import { expect } from 'chai';
import * as ArrayBufferAttributes from '../../attributes/arrayBufferAttributes';
import { ValidationResponse } from '../../validators';

describe('ArrayAttributes', function() {
    describe('isEqualTo', function() {
        const input = 'abcdefgh';
        const byteSize: number = input.length * 2;

        const createBufferFromInput = (str: string) => {
            const buffer: ArrayBuffer = new ArrayBuffer(str.length * 2);
            const bufferView: Uint16Array = new Uint16Array(buffer);

            str.split('').forEach((char, index) => {
                bufferView[index] = char.charCodeAt(0);
            });

            return buffer;
        };

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
});
