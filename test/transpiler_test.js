'use strict';

var transpiler = require('../transpiler.js');
var utils = transpiler.utils;

exports.simple_transpiling = {
    simple_assignment: function(assert) {
        assert.equals("a = 'oi'\n", transpiler.transpile("var a = 'oi';"));
        assert.equals("hello = \"hi!\"\n", transpiler.transpile("var hello = \"hi!\";"));
        assert.equals("some_variable = 1\n", transpiler.transpile("var some_variable = 1"));
        assert.done();
    },
    multiple_assignment: function(assert) {
        assert.equals("a = 'oi'\nb = 13\n", transpiler.transpile("var a = 'oi', b = 13;"));
        assert.done();
    },
    simple_conditional: function(assert) {
        assert.equals("if 1:\n    a = 1\n", transpiler.transpile("if (1) a = 1;"))
        assert.done();
    },
}

exports.util_functions = {
    indent: function(assert) {
        assert.equals('', utils.indent(0));
        assert.equals('    ', utils.indent(1));
        assert.equals('        ', utils.indent(2));
        assert.done();
    }
}
