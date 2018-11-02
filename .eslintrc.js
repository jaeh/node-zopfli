module.exports = {
  env: {
    node: true,
    mocha: true,
    es6: true,
  },
  parserOptions: { ecmaVersion: 8 },
  rules: {
    // Possible Errors
    // list: https://github.com/eslint/eslint/tree/master/docs/rules//possible-errors
    // check debugger sentence
    'no-debugger': 2,
    // check duplicate arguments
    'no-dupe-args': 2,
    // check duplicate object keys
    'no-dupe-keys': 2,
    // check duplicate switch-case
    'no-duplicate-case': 2,
    // disallow assignment of exceptional params
    'no-ex-assign': 2,
    // disallow unreachable code
    'no-unreachable': 2,
    // require valid typeof compared string like typeof foo === 'strnig'
    'valid-typeof': 2,

    // Best Practices
    // list: https://github.com/eslint/eslint/tree/master/docs/rules//best-practices
    // require falls through comment on switch-case
    'no-fallthrough': 2,

    // Stylistic Issues
    // list: https://github.com/eslint/eslint/tree/master/docs/rules//stylistic-issues
    // use single quote, we can use double quote when escape chars
    quotes: [2, 'single', 'avoid-escape'],
    'quote-props': [2, 'as-needed'],
    // 2 space indentation
    indent: [2, 2],
    // add space after comma
    'comma-spacing': 2,
    // commas dangle always
    'comma-dangle': [
      'error',
      {
        arrays: 'only-multiline',
        objects: 'only-multiline',
        imports: 'only-multiline',
        exports: 'only-multiline',
        functions: 'only-multiline',
      },
    ],
    // no semi-colon
    semi: 0,
    // require spaces operator like var sum = 1 + 1;
    'space-infix-ops': 2,
    // require spaces return, throw, case
    'keyword-spacing': 2,
    // no space before function, eg. 'function()'
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'ignore',
      },
    ],
    // require space before blocks, eg 'function() {}'
    'space-before-blocks': [2, 'always'],
    // require parens for Constructor
    'new-parens': 2,
    // max 100 length
    'max-len': [2, 100, 2],
    // max 2 consecutive empty lines
    'no-multiple-empty-lines': [2, { max: 2 }],
    // require newline at end of files
    'eol-last': 2,
    // no trailing spaces
    'no-trailing-spaces': 2,

    // Strict Mode
    // list: https://github.com/eslint/eslint/tree/master/docs/rules//strict-mode
    // 'use strict' on top
    // strict: [2, "global"], // not for now.

    // Variables
    // list: https://github.com/eslint/eslint/tree/master/docs/rules//variables
    // disallow use of undefined variables (globals)
    'no-undef': 2,
  },
}
