import cloneDeep = require('lodash.clonedeep');

import TypeError from './errors/typeError';
import { IConstraints } from './isValidator';
import { isObject } from './validators';

/**
 * Cache for validated constraints.
 *
 * Hashing the constraints object guarantees key consistency between different objects
 * that are deep equal. Relying on the objects as keys results in cache misses even when
 * objects are deep equal.
 */

/**
 * Cache data structure.
 */
const cacheMap = new WeakMap<IConstraints, IConstraints>();

/**
 * Cache the constraints.
 *
 * @param constraints
 */
export const cache = (constraints: IConstraints) => {
    if (isObject(constraints)) {
        throw new TypeError(
            'Cached constraints key has to be of type object.',
            cache,
        );
    }

    const clonedConstraints: IConstraints = cloneDeep(constraints);

    cacheMap.set(constraints, clonedConstraints);
};

/**
 * Retrieve the cached object.
 *
 * @param constraints
 */
export const get = (constraints: IConstraints): IConstraints | undefined => {
    if (isObject(constraints)) {
        throw new TypeError(
            'Cached constraints key has to be of type object.',
            get,
        );
    }

    // const hash: string = hashConstraints(constraints);

    return cacheMap.get(constraints);
};

/**
 * Remove a cached constraints object.
 *
 * @param key
 */
export const remove = (constraints: IConstraints) => {
    if (isObject(constraints)) {
        throw new TypeError(
            'Cached constraints key has to be of type object.',
            remove,
        );
    }

    // const hash: string = hashConstraints(constraints);

    cacheMap.delete(constraints);
};
