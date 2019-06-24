import { expect } from 'chai';

import { cache, get, remove } from '../../cache';
import TypeError from '../../errors/typeError';
import { IConstraints } from '../../isValidator';

describe('Caching tests', function() {
    describe('cacheConstraints', function() {
        it('expect to cache constraints', function() {
            const constraints: IConstraints = {
                property: {
                    validator: {
                        attribute: 5,
                    },
                },
            };

            expect(cache(constraints)).to.be.undefined;
        });

        it('expect TypeError for non object constraints', function() {
            const constraints: IConstraints = 'not an object' as any;

            expect(() => {
                cache(constraints);
            }).to.throw(TypeError);
        });
    });

    describe('getCachedConstraints', function() {
        it('expect constraints to deep equal', function() {
            const constraints: IConstraints = {
                property: {
                    validator: {
                        attribute: 5,
                        attribute2: 5,
                    },
                },
            };

            cache(constraints);

            const toTest: IConstraints | undefined = get(constraints);

            expect(toTest, 'Expect deep equal').to.deep.equal(constraints);
            expect(toTest === constraints, 'Expect reference to differ.').to.be
                .false;
        });

        it('expect constraints to not exist', function() {
            const constraints: IConstraints = {};

            expect(get(constraints)).to.be.undefined;
        });

        it('expect TypeError for non object constraints', function() {
            const constraints: IConstraints = 'not an object' as any;

            expect(() => {
                get(constraints);
            }).to.throw(TypeError);
        });
    });

    describe('removeCachedConstraints', function() {
        it('expect constraints to be removed from cache', function() {
            const constraints: IConstraints = {
                property: {
                    validator: {
                        attribute: 5,
                        attribute2: 5,
                        attribute3: 5,
                    },
                },
            };

            cache(constraints);
            remove(constraints);

            expect(get(constraints)).to.be.undefined;
        });

        it('expect TypeError for non object constraints', function() {
            const constraints: IConstraints = 'not an object' as any;

            expect(() => {
                remove(constraints);
            }).to.throw(TypeError);
        });
    });

    it('expect cached constraints to be exchanged', function() {
        const constraints: IConstraints = {
            property: {
                validator: {
                    attribute: 5,
                },
            },
        };

        cache(constraints);

        expect(get(constraints)).to.deep.equal(constraints);

        constraints.property2 = {
            validator: {},
        };

        cache(constraints);

        expect(get(constraints)).to.deep.equal(constraints);
    });
});
