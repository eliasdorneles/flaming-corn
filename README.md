Experimenting with Acorn.js
===========================

The goal is to build a simple transpiler to convert AcornJS to Python.


Planning:
---------

- **DONE** get some simple walker working
- **DONE** make the walker translate a simple expression like: "var a = 'oi';' to "a = 'oi'"
- **DONE** translate a expression with several variables "var a = 'oi', b = 1;' to "a = 'oi'\nb=1"
- **DONE** create a basic test suite to help adding support to next statement
- **DONE** translate a more complex expression like an if
- change AST visiting strategy for better control
- translate a JS object into a Python dict
- translate an if/else
- translate a nested if
- translate a for(;;)
- translate a simple function
- translate a function from Acorn.js source
- ...
