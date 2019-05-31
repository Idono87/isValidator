import { Func } from '../utils';
import BaseError from './baseError';

export default class MissingValidatorReferenceError extends BaseError {
    constructor(msg?: string, constructOpt?: Func) {
        super(msg, constructOpt);
    }
}
