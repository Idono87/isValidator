import { expect, use } from 'chai';
import sinon = require('sinon');
import sinonChai = require('sinon-chai');

import { IConstraints, Validate, ValidateConstraints } from '../..';
import * as Cache from '../../cache';
import { ErrorReport } from '../../errorHandler';

use(sinonChai);

describe('Caching integration', function() {
    it('expect validated constraints to be cached', function() {
        const cacheSpy = sinon.spy(Cache, 'cache');

        const constraints: IConstraints = {
            property: {
                isNumber: {
                    isLargerThan: 5,
                },
            },
        };

        ValidateConstraints(constraints);

        (Cache.cache as sinon.SinonSpy).restore();

        expect(cacheSpy).to.have.been.calledOnceWith(constraints);
    });

    it('expect validate to use the cached validated constraints', function() {
        const getSpy = sinon.spy(Cache, 'get');

        const constraints: IConstraints = {
            property: {
                isNumber: {
                    isLargerThan: 5,
                },
            },
        };

        const object = {
            property: 70,
        };

        ValidateConstraints(constraints);

        Validate(object, constraints);

        (Cache.get as sinon.SinonSpy).restore();

        expect(getSpy, 'Cache was not accessed.').to.have.been.calledOnceWith(
            constraints,
        );

        expect(getSpy.returnValues[0], '').to.deep.equal(constraints);
    });

    it('expect cached constraints to be removed when no reference is held', function() {
        const getSpy = sinon.spy(Cache, 'get');

        let constraints: IConstraints = {
            property: {
                isNumber: {
                    isLargerThan: 5,
                },
            },
        };

        const object = {
            property: 70,
        };

        ValidateConstraints(constraints);

        constraints = {};

        Validate(object, constraints);

        (Cache.get as sinon.SinonSpy).restore();

        expect(getSpy.returnValues[0]).to.be.undefined;
    });
});
