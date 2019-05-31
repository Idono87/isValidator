import { expect } from 'chai';
import {
    IConstraintOptions,
    IConstraints,
    RegisterValidator,
} from '../../isValidator';
import * as Validators from '../../validators';
type Validator = Validators.Validator;

describe('validateNestedObject', function() {
    const validator: Validator = (value: any) => {
        if (!value) {
            return 'Failed Validation';
        }
    };
    const validatorName: string = 'testValidator';
    RegisterValidator(validatorName, validator);

    it('Expect to pass nested validation.', function() {
        const obj = {
            property: true,
        };

        const constraints: IConstraints = {
            property: {
                [validatorName]: {},
            },
        };

        const options: IConstraintOptions = {
            strict: true,
        };

        const toTest = Validators.validateNestedObject(
            obj,
            undefined,
            { constraints: constraints },
            options,
        );

        expect(toTest).to.be.undefined;
    });

    it('Expect to fail with non object value', function() {
        const obj = 'not an object';

        expect(Validators.validateNestedObject(obj)).be.a('string');
    });

    it('Expect to fail with non constraint object', function() {
        const obj = {
            property: 'a string',
        };

        const constraints: IConstraints = 'not an object' as any;

        expect(
            Validators.validateNestedObject(obj, undefined, {
                constraints: constraints,
            }),
        ).be.a('string');
    });

    it('Expect to fail nested validation', function() {
        const obj = {
            property: 'a string',
        };

        const constraints: IConstraints = {};

        const options: IConstraintOptions = {
            strict: true,
        };

        const toTest = Validators.validateNestedObject(
            obj,
            undefined,
            { constraints: constraints },
            options,
        );
        expect(toTest)
            .to.have.nested.property('property.reject')
            .and.be.a('string');
    });
});
