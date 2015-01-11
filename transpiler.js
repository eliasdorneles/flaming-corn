#!/usr/bin/env node

'use strict';

var fs = require('fs');

var parser = require('./node_modules/acorn/acorn');
var walker = require('./node_modules/acorn/util/walk');

var acorn_options = {
}

// Node objects:
// https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API#Node_objects
var visitors = {
    Expression: function(node, state) {
        // console.log("NODE: ", node);
    },
    Program: function(node, state) {
        // console.log("PROGRAM: ", node);
    },
    Statement: function(node, state) {
        // console.log("STATEMENT: ", node);
        if (node.type == 'VariableDeclaration') {
            node.declarations.forEach(function(decl){
                // console.log("DECLARATION:", decl);
                state.result += decl.id.name + " = " + decl.init.raw + "\n";
            });
        }
    }
}

exports.transpile = function(js_code){
    var ast = parser.parse(js_code, acorn_options);
    var state = {
        result: '',
    }
    walker.simple(ast, visitors, undefined, state);
    return state.result;
}
