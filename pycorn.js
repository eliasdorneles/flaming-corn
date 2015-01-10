#!/usr/bin/env node

'use strict';

var path = require('path');
var fs = require('fs');

// requires acorn in current dir
// git clone git@github.com:marijnh/acorn.git
var parser = require('./acorn/acorn');
var walker = require('./acorn/util/walk');

var infile = "first.js";
var js_code = fs.readFileSync(infile, "utf8");


var acorn_options = {
}
var ast = parser.parse(js_code, acorn_options);


var visitors = {
    Expression: function(node) {
        // console.log("NODE: ", node);
    },
    Program: function(node) {
        // console.log("PROGRAM: ", node);
    },
    Statement: function(node) {
        // console.log("STATEMENT: ", node);
        if (node.type == 'VariableDeclaration') {
            node.declarations.forEach(function(decl){
                // console.log("DECLARATION:", decl);
                console.log(decl.id.name + " = " + decl.init.raw);
            });
        }
    }
}

var result = walker.simple(ast, visitors);

