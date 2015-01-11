#!/usr/bin/env node

'use strict';

var fs = require('fs');

var parser = require('./node_modules/acorn/acorn');
var walker = require('./node_modules/acorn/util/walk');

var acorn_options = {
}

function repeat(s, num) {
    return new Array(num + 1).join(s);
}

function indent(level) {
    return repeat('    ', level);
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
        } else if (node.type == 'IfStatement') {
            state.result += "if " + node.test.raw + ":\n";
            state.level += 1;

            // TODO: this should be handled separately as assignment expression,
            // but we need to change the walker strategy before that
            var assign_expr = node.consequent.expression;
            state.result += indent(state.level) + assign_expr.left.name + " = " + assign_expr.right.raw + "\n";

            state.level -= 1;
        }
    },
    // ExpressionStatement: function(node, state) {
    //     console.log("EXPR_STMT: ", node);
    // },
    // AssignmentExpression: function(node, state) {
    //     state.result += indent(state.level) + node.left.name + " = " + node.right.raw + "\n";
    // }
}

exports.transpile = function(js_code){
    var ast = parser.parse(js_code, acorn_options);
    var state = {
        result: '',
        level: 0,
    }
    walker.simple(ast, visitors, undefined, state);
    return state.result;
}

exports.utils = {
    indent: indent,
}
