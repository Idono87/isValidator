import { expect } from 'chai';
import { ErrorReport, IConstraints, Validate } from '../..';

describe('Symbol integration tests', function() {
    const symbol: symbol = Symbol();
    const globalSymbol: symbol = Symbol.for('global');

    const input = {
        symbol: symbol,
        globalSymbol: globalSymbol,
    };

    const passingConstraints: IConstraints = {
        symbol: {
            isSymbol: {
                isEqualTo: symbol,
                isNotEqualTo: globalSymbol,
                isNotGlobal: undefined,
            },
        },
        globalSymbol: {
            isSymbol: {
                isGlobal: undefined,
            },
        },
    };

    const failingConstraints: IConstraints = {
        symbol: {
            isSymbol: {
                isEqualTo: globalSymbol,
                isNotEqualTo: symbol,
                isGlobal: undefined,
            },
        },
        globalSymbol: {
            isSymbol: {
                isNotGlobal: undefined,
            },
        },
    };

    it('Expect validation to pass', function() {
        expect(Validate(input, passingConstraints)).to.be.undefined;
    });

    it('Expect validation to fail validation', function() {
        const toTest: void | ErrorReport = Validate(input, failingConstraints);

        expect(toTest)
            .to.have.nested.property('symbol.isSymbol.isEqualTo')
            .and.be.a('string');

        expect(toTest)
            .to.have.nested.property('symbol.isSymbol.isNotEqualTo')
            .and.be.a('string');

        expect(toTest)
            .to.have.nested.property('symbol.isSymbol.isGlobal')
            .and.be.a('string');

        expect(toTest)
            .to.have.nested.property('globalSymbol.isSymbol.isNotGlobal')
            .and.be.a('string');
    });
});
