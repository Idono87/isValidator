import { Func } from '../utils';
import BaseError from './baseError';

export default class TypeError extends BaseError {
    constructor(msg?: string, constructOpt?: Func) {
        super(msg, constructOpt);
    }
}
