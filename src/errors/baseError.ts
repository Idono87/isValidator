import { Func } from '../utils';

export default class BaseError extends Error {
    constructor(msg?: string, constructOpt?: Func) {
        super(msg);

        if (this.constructor === BaseError) {
            throw new SyntaxError('Defining a new "BaseError" is not allowed.');
        }

        this.name = this.constructor.name;

        if (
            typeof constructOpt !== 'undefined' &&
            typeof constructOpt !== 'function'
        ) {
            throw new TypeError('constructorOpt has to be a function');
        }

        const cOpt =
            typeof constructOpt !== 'undefined'
                ? constructOpt
                : this.constructor;

        Error.captureStackTrace(this, cOpt);
    }
}
