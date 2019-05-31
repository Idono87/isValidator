import { expect } from 'chai';
import * as SymbolAttributes from '../../attributes/symbolAttributes';

describe('symbolAttributes', function() {
    const s1 = Symbol.for('symbol1');
    const s2 = Symbol('symbol2');

    describe('isEqualTo', function() {
        it('Expect symbol to be equal to validation symbol', function() {
            expect(SymbolAttributes.isEqualTo(s1, s1)).to.be.undefined;
        });

        it('Expect symbol to be unequal to validation symbol', function() {
            expect(SymbolAttributes.isEqualTo(s1, s2)).to.be.a('string');
        });
    });

    describe('isNotEqualTo', function() {
        it('Expect symbol to be unequal to validation symbol', function() {
            expect(SymbolAttributes.isNotEqualTo(s1, s2)).to.be.undefined;
        });

        it('Expect symbol to be equal to validation symbol', function() {
            expect(SymbolAttributes.isNotEqualTo(s1, s1)).to.be.a('string');
        });
    });

    describe('isGlobalSymbol', function() {
        it('Expect to be a global symbol', function() {
            expect(SymbolAttributes.isGlobal(s1, undefined)).to.be.undefined;
        });

        it('Expect to not be a global symbol', function() {
            expect(SymbolAttributes.isGlobal(s2, undefined)).to.be.a('string');
        });
    });

    describe('isNotGlobalSymbol', function() {
        it('Expect to not be a global symbol', function() {
            expect(SymbolAttributes.isNotGlobal(s2, undefined)).to.be.undefined;
        });

        it('Expect to be a global symbol', function() {
            expect(SymbolAttributes.isNotGlobal(s1, undefined)).to.be.a(
                'string',
            );
        });
    });
});
