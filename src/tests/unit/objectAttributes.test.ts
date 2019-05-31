import { expect } from 'chai';
import { isEmpty, isNotEmpty } from '../../attributes/objectAttributes';
import { IConstraints } from '../../isValidator';

describe('objectAttributes', function() {
    describe('isEmpty', function() {
        const input = {
            string1: 'a string',
            string2: 'a second string',
        };
        it('Expect to be empty and pass', function() {
            expect(isEmpty({}, undefined)).to.be.undefined;
        });

        it('Expect to not be empty and fail', function() {
            expect(isEmpty(input, undefined)).to.be.a('string');
        });
    });

    describe('isNotEmpty', function() {
        const input = {
            string1: 'a string',
            string2: 'a second string',
        };

        it('Expect to not be empty and pass', function() {
            expect(isNotEmpty(input, undefined)).to.be.undefined;
        });

        it('Expect to be empty fail', function() {
            expect(isNotEmpty({}, undefined)).to.be.a('string');
        });
    });
});
