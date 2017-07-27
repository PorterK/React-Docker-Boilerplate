// This file should not need to be changed, details about what is happening here are: https://webpack.github.io/docs/context.html#context-module-api
// **** ALL TEST FILES NEED TO HAVE FILE NAME IN THE FORMAT: *.spec.js ************

var context = require.context('.', true, /\.spec\.js$/);

/**
* per above link, context is actually a method that will load the module, keys() is a list of modules that have been mapped.
* this could be rewritten as:
```
//pretend we have lodash up in here.

_.each(context.keys(), (key) => {
    context(key);
});
```
**/
context.keys().forEach(context);
