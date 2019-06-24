import { AttributeValidator, IAttributes } from './attributes/attributes';
import { ErrorHandler, ErrorReport } from './errorHandler';
import TypeError from './errors/typeError';
import {
    GetAttributeValidator,
    GetValidator,
    IConstraintOptions,
    IConstraints,
    IPropertyConstraints,
} from './isValidator';
import * as Validators from './validators';
type Validator = Validators.Validator;
type ValidationResponse = Validators.ValidationResponse;

/**
 * Main validation loop.
 */
export class ValidationObject {
    /**
     * Initiate the options and validate the options parameter.
     *
     * @param options
     */
    private static _InitOptions(
        options?: IConstraintOptions,
    ): IConstraintOptions {
        const defaultOptions: IConstraintOptions = {
            strict: false,
        };
        if (options && Validators.isObject(options)) {
            throw new TypeError('Constraint Options is not an Object.');
        }
        return { ...defaultOptions, ...options };
    }

    /**
     * Properties
     */
    private object: any;
    private constraints: IConstraints;
    private options: IConstraintOptions;
    private errorHandler: ErrorHandler;
    private errorPath: string[];

    /**
     * Constructor
     * @param object object to validate
     * @param constraints constraints
     * @param options constraint options
     */
    constructor(
        object: any,
        constraints: IConstraints,
        options?: IConstraintOptions,
    ) {
        this._ValidateObject(object);
        this.object = object;
        this._ValidateConstraints(constraints);
        this.constraints = constraints;
        this.options = ValidationObject._InitOptions(options);
        this._ValidateOptions();
        this.errorHandler = new ErrorHandler();
        this.errorPath = new Array<string>();
    }

    /**
     * Run validation.
     */
    public Validate(): ErrorReport {
        const testedProperties: {
            [name: string]: boolean;
        } = {};

        Object.entries(this.constraints).forEach(
            ([propertyKey, propertyConstraints]) => {
                this.errorPath.push(propertyKey);
                if (this._ValidatePropertyConstraints(propertyConstraints)) {
                    const validOptions: boolean =
                        this._StrictExpectProperty(
                            propertyKey,
                            propertyConstraints,
                        ) &&
                        this._ExpectProperty(
                            propertyKey,
                            propertyConstraints,
                        ) &&
                        this._RejectProperty(propertyKey, propertyConstraints);
                    if (validOptions) {
                        this._ValidateProperty(
                            propertyKey,
                            propertyConstraints,
                        );
                    }
                    testedProperties[propertyKey] = true;
                }
                this.errorPath.pop();
            },
        );

        this._StrictRejectProperties(testedProperties);

        return this.errorHandler.getReport();
    }

    /**
     * Validate that object is an object.
     * @param object
     */
    private _ValidateObject(object: any) {
        if (Validators.isObject(object)) {
            throw new TypeError('Object to validate is not an Object.');
        }
    }

    /**
     * Validate that constraints is an object.
     *
     * @param constraints
     */
    private _ValidateConstraints(constraints: IConstraints) {
        if (Validators.isObject(constraints)) {
            throw new TypeError('Validation constraints is not an Object.');
        }
    }

    /**
     * Validate that constraint options is an object.
     */
    private _ValidateOptions() {
        if (Validators.isBoolean(this.options.strict)) {
            throw new TypeError('Option strict is not of type boolean');
        }
    }

    /**
     * Report an error to the error handler with the provided path.
     * @param msg
     */
    private _ReportError(msg: string | ErrorReport) {
        this.errorHandler.reportError(this.errorPath.join('.'), msg);
    }

    /**
     * Validate property constraint as an object.
     *
     * @param propertyConstraints
     */
    private _ValidatePropertyConstraints(
        propertyConstraints: IPropertyConstraints,
    ): boolean {
        if (Validators.isObject(propertyConstraints)) {
            this._ReportError(
                'Constraint is not a valid type. Expecting an Object.',
            );
            return false;
        }
        return true;
    }

    /**
     * Expect property in the object. Strict validation option.
     *
     * @param propertyKey
     * @param propertyConstraints
     */
    private _StrictExpectProperty(
        propertyKey: string,
        propertyConstraints: IPropertyConstraints,
    ): boolean {
        let exists: boolean = true;
        if (this.options.strict && !(propertyKey in this.object)) {
            const isExcluded: boolean =
                typeof propertyConstraints.exclude !== 'undefined' &&
                propertyConstraints.exclude;
            if (!isExcluded) {
                exists = false;
                this.errorPath.push('expect');
                this._ReportError('Property expected but does not exist.');
                this.errorPath.pop();
            }
        }
        return exists;
    }

    /**
     * Reject properties with no described constraints. Strict validation option
     * @param testedProperties
     */
    private _StrictRejectProperties(testedProperties: {
        [name: string]: boolean;
    }) {
        if (this.options.strict) {
            Object.keys(this.object).forEach((propertyName) => {
                if (!(propertyName in testedProperties)) {
                    this.errorPath.push(propertyName);
                    this.errorPath.push('reject');
                    this._ReportError('Property has been rejected.');
                    this.errorPath.pop();
                    this.errorPath.pop();
                }
            });
        }
    }

    /**
     * Expect property to exist in the validated object
     *
     * @param propertyKey
     * @param propertyConstraints
     */
    private _ExpectProperty(
        propertyKey: string,
        propertyConstraints: IPropertyConstraints,
    ): boolean {
        const isExpected: boolean =
            typeof propertyConstraints.expect !== 'undefined' &&
            propertyConstraints.expect;
        if (isExpected && !(propertyKey in this.object)) {
            this.errorPath.push('expect');
            this._ReportError('Property expected but does not exist.');
            this.errorPath.pop();
            return false;
        }
        return true;
    }

    /**
     * Reject property in the validated object.
     *
     * @param propertyKey
     * @param propertyConstraints
     */
    private _RejectProperty(
        propertyKey: string,
        propertyConstraints: IPropertyConstraints,
    ): boolean {
        const isRejected: boolean =
            typeof propertyConstraints.reject !== 'undefined' &&
            propertyConstraints.reject;
        if (isRejected && propertyKey in this.object) {
            this.errorPath.push('reject');
            this._ReportError('Property has been rejected.');
            this.errorPath.pop();
            return false;
        }
        return true;
    }

    /**
     * Validate the current property with the given validators.
     *
     * @param propertyKey
     * @param propertyConstraints
     */
    private _ValidateProperty(
        propertyKey: string,
        propertyConstraints: IPropertyConstraints,
    ) {
        Object.entries(propertyConstraints).forEach(
            ([validatorName, validatorAttributes]) => {
                this.errorPath.push(validatorName);

                const isOption = ['expect', 'reject', 'exclude'].find(
                    (option) => {
                        return validatorName === option;
                    },
                );

                if (!isOption) {
                    const validator: Validator | undefined = GetValidator(
                        validatorName,
                    );

                    if (typeof validator !== 'undefined') {
                        const errorMessage: ValidationResponse = validator(
                            this.object[propertyKey],
                            propertyKey,
                            validatorAttributes,
                            this.options,
                        );

                        if (typeof errorMessage === 'undefined') {
                            this._ValidateAttributes(
                                propertyKey,
                                validatorName,
                                validatorAttributes as IAttributes,
                            );
                        } else {
                            this._ReportError(errorMessage);
                        }
                    } else {
                        this._ReportError('Validator not found.');
                    }
                }

                this.errorPath.pop();
            },
        );
    }

    /**
     * Validate the current property with the given validator attributes.
     *
     * @param propertyKey
     * @param validatorName
     * @param validatorAttributes
     */
    private _ValidateAttributes(
        propertyKey: string,
        validatorName: string,
        validatorAttributes: IAttributes,
    ) {
        if (Validators.isObject(validatorAttributes)) {
            this._ReportError('Attributes constraints is not an object.');
            return;
        }
        Object.entries(validatorAttributes).forEach(
            ([attributeName, attributeArgument]) => {
                this.errorPath.push(attributeName);

                const attribute:
                    | AttributeValidator
                    | undefined = GetAttributeValidator(
                    attributeName,
                    validatorName,
                );

                if (typeof attribute !== 'undefined') {
                    const response: ValidationResponse = attribute(
                        this.object[propertyKey],
                        attributeArgument,
                    );

                    if (typeof response !== 'undefined') {
                        this._ReportError(response);
                    }
                } else {
                    this._ReportError('Constraint attribute does not exist.');
                }
                this.errorPath.pop();
            },
        );
    }
}
