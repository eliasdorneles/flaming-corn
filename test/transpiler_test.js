'use strict';

var transpiler = require('../transpiler.js');

exports.simple_transpiling = {
    simple_assignment: function(t) {
        t.equals("a = 'oi'\n", transpiler.transpile("var a = 'oi';"));
        t.equals("hello = \"hi!\"\n", transpiler.transpile("var hello = \"hi!\";"));
        t.equals("some_variable = 1\n", transpiler.transpile("var some_variable = 1"));
        t.done();
    },
    multiple_assignment: function(t) {
        t.equals("a = 'oi'\nb = 13\n", transpiler.transpile("var a = 'oi', b = 13;"));
        t.done();
    },
}
