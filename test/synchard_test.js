/* globals describe, it */

'use strict';

var grunt = require('grunt'),
    assert = require('assert'),
    spawn  = require('child_process').spawn,
    fs     = require('fs')

describe('grunt-synchard', function () {

    var expected = grunt.file.expand({cwd: 'test/src'}, '**')

    // Spawn a child process.  The callback gets two arguments `(stderr, stdout)`.
    function _spawn (cmd, args, callback) {
        var p = spawn(cmd, args),
            stdout = '',
            stderr = ''
        p.stdout.on('data', function (data) {
            stdout += data
        })
        p.stderr.on('data', function (data) {
            stderr += data
        })
        p.on('close', function () {
            callback(stderr, stdout)
        })
    }

    function rmdir_remote (host, dir, callback) {
        _spawn('ssh', [host, 'rm ' + dir + '/*'], callback)
    }

    function listdir_remote (host, dir, callback) {
        _spawn('ssh', [host, 'ls -1 ' + dir], function (err, out) {
            out = out.trim()
            out = (out) ? out.split('\n') : []
            callback(err, out)
        })
    }

    describe(':default_options', function () {
        it('should sync files to `tmp/default_options`', function (done) {
            var dir = 'tmp/default_options',
                p
            assert(!grunt.file.exists(dir))
            p = spawn('grunt', ['synchard:default_options'])
            p.on('close', function () {
                var actual = grunt.file.expand({cwd: dir}, '**')
                assert.deepEqual(actual, expected)
                done()
            })
        })
    })

    describe('--dry-run', function () {
        it('should call rsync with the `--dry-run` argument', function (done) {
            var dir = 'tmp/dry_run',
                p
            assert(!grunt.file.exists(dir))
            _spawn('grunt', ['synchard:dry_run', '--dry-run'], function (err, out) {
                out = out.split('\n')
                expected.slice(1).forEach(function (file) {
                    assert.notEqual(out.indexOf(file), -1)
                })
                assert(!grunt.file.exists(dir))
                done()
            })
        })
    })

    describe(':custom_options', function () {
        it('should sync files to `tmp/custom_options` excluding file `123`', function (done) {
            var dir = 'tmp/custom_options',
                p
            assert(!grunt.file.exists(dir))
            p = spawn('grunt', ['synchard:custom_options'])
            p.on('close', function () {
                var actual = grunt.file.expand({cwd: dir}, '**'),
                    _expected = grunt.util._.without(expected, '123')
                assert.deepEqual(actual, _expected)
                done()
            })
        })
    })

    var host = grunt.option('host')
    if (host) {
        describe(':to_remote', function () {
            it('should sync files to a remote host', function (done) {
                var remote_dir = 'synchard_test'
                function _sync () {
                    var p = spawn('grunt', ['synchard:to_remote', '--host', host])
                    p.on('close', function () {
                        listdir_remote(host, remote_dir, function (err, files) {
                            assert.deepEqual(files, expected.slice(1))
                            done()
                        })
                    })
                }
                rmdir_remote(host, remote_dir, function () {
                    listdir_remote(host, remote_dir, function (err, files) {
                        assert.deepEqual(files, [])
                        _sync()
                    })
                })
            })
        })
        describe(':from_remote', function () {
            it('should sync files from a remote host to `tmp/from_remote`', function (done) {
                var remote_dir = 'synchard_test',
                    local_dir  = 'tmp/from_remote'
                assert(!grunt.file.exists(local_dir))
                function _sync () {
                    var p = spawn('grunt', ['synchard:from_remote', '--host', host])
                    p.on('close', function () {
                        var actual = grunt.file.expand({cwd: local_dir}, '**')
                        assert.deepEqual(actual, expected)
                        done()
                    })
                }
                listdir_remote(host, remote_dir, function (err, files) {
                    assert.deepEqual(files, expected.slice(1))
                    _sync()
                })
            })
        })
    }

})
