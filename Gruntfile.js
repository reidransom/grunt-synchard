/*
 * grunt-synchard
 * https://github.com/reidransom/grunt-synchard
 *
 * Copyright (c) 2013 Reid Ransom
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    var config = {

        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>',
            ],
            options: {
                jshintrc: '.jshintrc',
            },
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp/*'],
        },

        synchard: {
            default_options: {
                files: {
                    'tmp/default_options': ['test/src/testing', 'test/src/123'],
                },
            },
            dry_run: {
                files: {
                    'tmp/dry_run/': ['test/src/'],
                },
            },
            custom_options: {
                options: {
                    args: ['-av'],
                    exclude: ['123']
                },
                files: {
                    'tmp/custom_options/': ['test/src/'],
                },
            },
            to_remote: {
                options: {
                    ssh: true
                },
                dest: grunt.option('host') + ':synchard_test/',
                src: ['test/src/']
            },
            from_remote: {
                options: {
                    ssh: true
                },
                files: {
                    'tmp/from_remote/': [grunt.option('host') + ':synchard_test/'],
                },
            }
        },

        mochaTest: {
            all: {
                options: {
                    reporter: 'spec',
                    timeout: 10000
                },
                src: ['test/*_test.js']
            }
        }

    };

    grunt.initConfig(config);
    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('test', ['clean', 'mochaTest']);
    grunt.registerTask('default', ['jshint', 'test']);

};
