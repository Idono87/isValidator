import { AttributeValidator } from './attributes/attributes';
import { ErrorHandler, ErrorReport } from './errorHandler';
import TypeError from './errors/typeError';
import {
    GetAttributeValidator,
    GetValidator,
    IConstraintOptions,
    IConstraints,
    IPropertyConstraints,
} from './isValidator';
import { isObject, ValidationResponse, Validator } from './validators';

/**
 * Main validation loop.
 */
export default class ObjectValidator {
    public static validate(
        object: object,
        constraints: IConstraints,
        options: IConstraintOptions,
    ): ErrorReport {
        if (isObject(object)) {
            throw new TypeError(
                'The value being validated has to be an an object.',
            );
        }

        const validationObject = new ObjectValidator(
            object,
            constraints,
            options,
        );

        return validationObject.runValidation();
    }

    /**
     * Static properties
     */
    private static constraintOptions: Set<string> = new Set([
        'exclude',
        'expect',
        'reject',
    ]);

    /**
     * Properties
     */
    private constraints: IConstraints;
    private errorHandler: ErrorHandler;
    private errorPath: string[];
    private object: { [name: string]: any };
    private options: IConstraintOptions;

    private constructor(
        object: { [name: string]: any },
        constraints: IConstraints,
        options: IConstraintOptions,
    ) {
        this.constraints = constraints;
        this.errorHandler = new ErrorHandler();
        this.errorPath = [];
        this.object = object;
        this.options = options;
    }

    /**
     * Report an error with the current path.
     * @param msg
     */
    private reportError(msg: string | ErrorReport) {
        this.errorHandler.reportError(this.errorPath.join('.'), msg);
    }

    /**
     * Validate object properties.
     */
    private runValidation(): ErrorReport {
        for (const key in this.constraints) {
            if (this.constraints.hasOwnProperty(key)) {
                this.errorPath.push(key);

                if (key in this.object) {
                    if (!this.rejectProperty(key)) {
                        this.validatePropertyValue(key);
                    }
                } else {
                    if (this.strictExpectProperty(key)) {
                        this.expectProperty(key);
                    }
                }

                this.errorPath.pop();
            }
        }

        this.strictRejectRemainingProperties();

        return this.errorHandler.getReport();
    }

    /**
     * Validate existence for properties if strict option is true.
     * If the property exclude flag is set then don't check strictness for the property.
     *
     * @param propertyKey
     */
    private strictExpectProperty(propertyKey: string): boolean {
        if (
            this.options.strict === true &&
            !this.constraints[propertyKey].exclude
        ) {
            this.reportError(
                'Property is expected but does not exist. Strict validation failure.',
            );

            return false;
        }

        return true;
    }

    /**
     * Reject existing properties that are not defined within the constraints object if the strict option is true.
     *
     */
    private strictRejectRemainingProperties() {
        if (this.options.strict) {
            for (const key in this.object) {
                if (
                    this.object.hasOwnProperty(key) &&
                    !(key in this.constraints)
                ) {
                    this.errorPath.push(key);

                    this.reportError(
                        'Property has been rejected. Not defined in constraints object. Strict validation failure.',
                    );

                    this.errorPath.pop();
                }
            }
        }
    }

    /**
     * Expect the proprty to exist in the object.
     *
     * @param propertyKey
     */
    private expectProperty(propertyKey: string) {
        if (
            typeof this.constraints[propertyKey].expect !== 'undefined' &&
            this.constraints[propertyKey].expect
        ) {
            this.reportError('Property is expected but does not exist.');
        }
    }

    /**
     * Rejects the property if it exists
     *
     * @param propertyKey
     */
    private rejectProperty(propertyKey: string) {
        if (
            typeof this.constraints[propertyKey].reject !== 'undefined' &&
            this.constraints[propertyKey].reject
        ) {
            this.reportError('Property has been rejected.');
            return true;
        }

        return false;
    }

    /**
     * Validate the property with the give IPropertyConstraint
     *
     * @param propertyKey
     */
    private validatePropertyValue(propertyKey: string) {
        const propertyConstraints: IPropertyConstraints = this.constraints[
            propertyKey
        ];

        for (const constraintKey in propertyConstraints) {
            if (propertyConstraints.hasOwnProperty(constraintKey)) {
                if (ObjectValidator.constraintOptions.has(constraintKey)) {
                    continue;
                }

                this.errorPath.push(constraintKey);

                const validator: Validator | undefined = GetValidator(
                    constraintKey,
                );

                const validationResponse: ValidationResponse = validator!(
                    this.object[propertyKey],
                    propertyKey,
                    propertyConstraints[constraintKey],
                    this.options,
                );

                if (validationResponse) {
                    this.reportError(validationResponse);
                } else {
                    this.validateAttributes(propertyKey, constraintKey);
                }

                this.errorPath.pop();
            }
        }
    }

    /**
     * Validate property attributes.
     *
     * @param propertyKey
     * @param constraintKey
     */
    private validateAttributes(propertyKey: string, constraintKey: string) {
        const attributes: { [name: string]: any } = this.constraints[
            propertyKey
        ][constraintKey] as { [name: string]: any };

        for (const key in attributes) {
            if (attributes.hasOwnProperty(key)) {
                this.errorPath.push(key);

                const attributeValidator:
                    | AttributeValidator
                    | undefined = GetAttributeValidator(key, constraintKey);

                if (attributeValidator) {
                    const attr = attributes[key];
                    const validationResponse: ValidationResponse = attributeValidator(
                        this.object[propertyKey],
                        attr,
                    );

                    if (validationResponse) {
                        this.reportError(validationResponse);
                    }
                }

                this.errorPath.pop();
            }
        }
    }
}
