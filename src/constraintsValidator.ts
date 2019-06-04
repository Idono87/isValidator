import { IAttributes } from './attributes/attributes';
import { ErrorHandler, ErrorReport } from './errorHandler';
import {
    GetAttributeArgumentValidator,
    GetValidator,
    HasAttribute,
    IConstraints,
    IPropertyConstraints,
} from './isValidator';
import { isObject, ValidationResponse, Validator } from './validators';

/**
 * Validates the given constraints.
 */
export default class ConstraintsValidator {
    public static validate(constraints: IConstraints): ValidationResponse {
        const constraintValidator: ConstraintsValidator = new ConstraintsValidator(
            constraints,
        );

        return constraintValidator.validateProperties();
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

    /**
     * Constructor
     *
     * @param constraints
     */
    private constructor(constraints: IConstraints) {
        this.constraints = constraints;
        this.errorHandler = new ErrorHandler();
        this.errorPath = [];
    }

    /**
     * Report an error with the current path.
     * @param msg
     */
    private reportError(msg: string | ErrorReport) {
        this.errorHandler.reportError(this.errorPath.join('.'), msg);
    }

    /**
     * Validates the defined properties.
     */
    private validateProperties(): ValidationResponse {
        for (const key in this.constraints) {
            if (this.constraints.hasOwnProperty(key)) {
                this.errorPath.push(key);

                const propertyValue = this.constraints[key];
                if (this.isObject(propertyValue)) {
                    this.validatePropertyConstraints(propertyValue);
                }

                this.errorPath.pop();
            }
        }

        return this.errorHandler.getReport();
    }

    /**
     * Validate that the property value is an object.
     *
     * @param propertyValue
     */
    private isObject(propertyValue: any): boolean {
        if (isObject(propertyValue)) {
            this.reportError('Constraints should be an object.');
            return false;
        }

        return true;
    }

    /**
     * Validates the property constraints.
     *
     * @param propertyConstraints
     */
    private validatePropertyConstraints(
        propertyConstraints: IPropertyConstraints,
    ) {
        for (const key in propertyConstraints) {
            if (propertyConstraints.hasOwnProperty(key)) {
                this.errorPath.push(key);

                const propertyConstraintValue = propertyConstraints[key];
                if (this.isPropertyConstraintOption(key)) {
                    this.validatePropertyConstraintOptionValueAsBoolean(
                        propertyConstraints[key],
                    );
                } else {
                    if (this.isPropertyConstraint(key)) {
                        if (this.isObject(propertyConstraintValue)) {
                            this.validateValidatorAttributes(
                                key,
                                propertyConstraintValue as IAttributes,
                            );
                        }
                    }
                }

                this.errorPath.pop();
            }
        }
    }

    /**
     * Returns true if the given constraint is a validation option.
     *
     * @param constraint
     */
    private isPropertyConstraintOption(constraint: string) {
        return ConstraintsValidator.constraintOptions.has(constraint);
    }

    /**
     * Validates the option value.
     *
     * @param optionValue
     */
    private validatePropertyConstraintOptionValueAsBoolean(optionValue: any) {
        if (typeof optionValue !== 'boolean') {
            this.reportError('Option value should be a boolean.');
        }
    }

    /**
     * Checks if the validator exists.
     * @param key
     */
    private isPropertyConstraint(key: string): boolean {
        const validator: Validator | undefined = GetValidator(key);
        if (typeof validator === 'undefined') {
            this.reportError('Validator does not exist.');
            return false;
        }

        return true;
    }

    /**
     * Validates the validator attributes.
     *
     * @param validatorKey
     * @param validatorAttributes
     */
    private validateValidatorAttributes(
        validatorKey: string,
        validatorAttributes: IAttributes,
    ) {
        for (const key in validatorAttributes) {
            if (validatorAttributes.hasOwnProperty(key)) {
                this.errorPath.push(key);

                if (this.isAttributeConstraint(key, validatorKey)) {
                    this.validateAttributeArgument(
                        key,
                        validatorKey,
                        (validatorAttributes as { [name: string]: any })[key],
                    );
                }

                this.errorPath.pop();
            }
        }
    }

    /**
     * Checks if the give attribute is a registered attribute constraint.
     *
     * @param key
     * @param validatorKey
     */
    private isAttributeConstraint(key: string, validatorKey: string) {
        if (!HasAttribute(key, validatorKey)) {
            this.reportError('Attribute does not exist.');
            return false;
        }

        return true;
    }

    /**
     * Validates the attribute argument.
     *
     * @param key
     * @param validatorKey
     * @param attributeValue
     */
    private validateAttributeArgument(
        key: string,
        validatorKey: string,
        attributeValue: any,
    ) {
        const argumentValidator: Validator = GetAttributeArgumentValidator(
            key,
            validatorKey,
        ) as Validator;

        const response: ValidationResponse = argumentValidator(attributeValue);

        if (response) {
            this.reportError(response);
        }
    }
}
