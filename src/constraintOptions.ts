import TypeError from './errors/typeError';
import { IConstraintOptions } from './isValidator';
import { isBoolean, isObject } from './validators';

export default class ConstraintOptions {
    /**
     * Create the default options and merge user options if defined.
     */
    public static createConstraintOptions(
        options?: IConstraintOptions,
    ): IConstraintOptions {
        if (isObject(options) && typeof options !== 'undefined') {
            throw new TypeError('OptionsConstraints have to be of type object');
        }

        const optionsConstraints: ConstraintOptions = new ConstraintOptions();

        optionsConstraints.mergeUserOptions(options);

        return optionsConstraints.getConstraintOptions();
    }

    /**
     * Properties
     */
    private options: IConstraintOptions;

    /**
     * Initiate the default options object.
     */
    private constructor() {
        this.options = {};
        this.options.strict = false;
    }

    /**
     * Returns a fully intialized IConstraintOptions.
     */
    private getConstraintOptions(): IConstraintOptions {
        return this.options;
    }

    /**
     * Merge user options with the default options.
     *
     * @param options
     */
    private mergeUserOptions(options?: IConstraintOptions) {
        if (typeof options !== 'undefined') {
            this.validate(options);

            Object.assign(this.options, options);
        }
    }

    /**
     * Validate options
     *
     * @param options
     */
    private validate(options: IConstraintOptions) {
        this.validateStrictOption(options.strict);
    }

    /**
     * Validate strict option.
     *
     * @param value
     */
    private validateStrictOption(value: any) {
        if (typeof value !== 'undefined' && isBoolean(value)) {
            throw new TypeError('Expecting "strict" to be of type boolean.');
        }
    }
}
