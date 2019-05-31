<h1>Error Handling</h1>

When creating validators it's possible to return nested errors by using the [ErrorHandler][errorhandler]. Simply instantiate a new [ErrorHandler] object and report errors with the `reportError` method. Pass in a dot separated string that represents the nested property. And a the error message. Once finished fetch the `ErrorReport` with the `getReport` method and return the generated report.

```typescript
import { ErrorHandler } from 'isValidator';

const eh: ErrorHandler = new ErrorHandler();

eh.reportError('nested.error.path', 'An error');

console.log(eh.getReport());

//Logging the returned ErrorReport will look likes this
// {
//     nested: {
//         error: {
//             path: 'An error'
//         }
//     }
// }

```


[errorhandler]:../api/errorhandler.md