// ISC License

// Copyright (c) 2019, Sorin Sandru <sorin.sandru@idono.net>

// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.

// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

/**
 * Internal error organizer. Will produce a [[ErrorReport]] that can be consumed by the user.
 */

import DuplicateReportError from './errors/duplicateReportError';
import { isString } from './validators';

/**
 * A nested object similar to the constraints defined. Holds reported errors for failed validations.
 */
export interface IErrorStructure {
    [propertyName: string]: IErrorStructure | ErrorReport | string;
}

/**
 * Error report that returns a read only [[ErrorStructure]] with all the failed
 * validation reports or undefined if no errors have been reported
 */
export type ErrorReport = Readonly<IErrorStructure> | undefined;

/**
 * Organizes reported errors into a suitable structure.
 */
export class ErrorHandler {
    private errors: IErrorStructure;
    private hasReportedErrors: boolean;

    public constructor() {
        this.errors = {};
        this.hasReportedErrors = false;
    }

    /**
     * Returns true or false if the errorHandler has any reported errors.
     */
    get hasErrors(): boolean {
        return this.hasReportedErrors;
    }

    /**
     * Add an error into it's proper nested position.
     *
     * @param propertyPath Nested path in the object.
     * @param message Error messages for the
     */
    public reportError(
        propertyPath: string,
        message: string | ErrorReport,
    ): void {
        if (Object.isFrozen(this.errors)) {
            const error: Error = new Error('Error structure is frozen.');
            Error.captureStackTrace(error, this.reportError);
            throw error;
        }

        let currentObject: IErrorStructure = this.errors;

        const separator: string = '.';
        propertyPath
            .replace('[', separator)
            .replace(']', '')
            .split(separator)
            .forEach(
                (propertyKey: string, index: number, pathArray: string[]) => {
                    if (propertyKey in currentObject) {
                        if (
                            index >= pathArray.length - 1 ||
                            !isString(currentObject[propertyKey])
                        ) {
                            throw new DuplicateReportError(
                                'Can not overwrite reported error',
                                this.reportError,
                            );
                        }

                        currentObject = currentObject[
                            propertyKey
                        ] as IErrorStructure;
                    } else {
                        if (index >= pathArray.length - 1) {
                            currentObject[propertyKey] = message;
                        } else {
                            currentObject = currentObject[propertyKey] = {};
                        }
                    }
                },
            );

        this.hasReportedErrors = true;
    }

    /**
     * Returns a detailed map of reported validation errors. Notice! Once called the internal error structure will be frozen. Reporting new errors will throw an exception.
     *
     * @returns readonly DetailedValidationError[]
     */
    public getReport(): ErrorReport {
        if (this.hasReportedErrors) {
            return Object.freeze(this.errors);
        }
    }
}
