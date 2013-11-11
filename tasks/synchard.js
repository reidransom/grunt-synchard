/*
 * grunt-synchard
 * https://github.com/reidransom/grunt-synchard
 *
 * Copyright (c) 2013 Reid Ransom
 * Licensed under the MIT license.
 */

'use strict';

var rsync = require('rsyncwrapper').rsync

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('synchard', 'rsync task handler.', function() {

        // Merge task-specific and/or target-specific options with these defaults.
        var done = this.async(),
            options = this.options({
                args: ['--archive']
            })

        if (grunt.option('dry-run')) {
            // Let's assume you called `--dry-run` because you want to see the files that would have been transferred with `verbose`.
            options.args = options.args.concat(['--dry-run', '--verbose'])
        }

        // Iterate over all specified file groups.
        this.files.forEach(function(f) {

            var grpoptions = grunt.util._.extend(
                grunt.util._.clone(options), {
                    dest: f.dest,
                    src: f.orig.src,
                }
            )

            if (grpoptions.mkdirp) {
                grunt.file.mkdir(grpoptions.dest, '0755')
            }

            rsync(grpoptions, function(error, stdout, stderr, cmd) {
                grunt.log.writeln(cmd)
                stdout = stdout.trim()
                if (stdout) {
                    grunt.log.writeln(stdout)
                }
                if (error) {
                    grunt.log.warn(stderr)
                    done(false)
                }
                else {
                    done(true)
                }
            })
        })

    })

}
