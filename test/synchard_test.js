'use strict';

var grunt = require('grunt')

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.synchard = {
    setUp: function(done) {
        // setup here if necessary
        done()
    },
    default_options: function(test) {
        test.expect(1)
        var actual = grunt.file.expand({cwd: 'tmp/default_options'}, '**'),
            expected = grunt.file.expand({cwd: 'test/src'}, '**')
        test.deepEqual(actual, expected, 'files are copied from test/src to tmp/default_options.')
        test.done()
    },
    custom_options: function(test) {
        test.expect(1)
        var actual = grunt.file.expand({cwd: 'tmp/custom_options'}, '**'),
            expected = grunt.file.expand({cwd: 'test/src'}, '**')
        test.deepEqual(actual, grunt.util._.without(expected, '123'), 'files are copied from test/src to tmp/custom_options.')
        test.done()
    },
    remote_roundtrip: function(test) {
        if (grunt.option('host')) {
            test.expect(1)
            var actual = grunt.file.expand({cwd: 'tmp/remote_roundtrip'}, '**'),
                expected = grunt.file.expand({cwd: 'test/src'}, '**')
            test.deepEqual(actual, expected, 'files are copied to a remote host then back to tmp/remote_roundtrip.')
        }
        test.done()
    },
}
