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
            tests: ['tmp'],
        },

        // Configuration to be run (and then tested).
        synchard: {
            default_options: {
                options: {
                    mkdirp: true,
                },
                files: {
                    'tmp/default_options': ['test/src/testing', 'test/src/123'],
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
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js'],
        },

    };
    
    if (grunt.option('host')) {
        config.synchard.to_remote = {
            options: {
                ssh: true,
            },
            dest: grunt.option('host') + ':',
            src: ['test/src'],
        }
        config.synchard.from_remote = {
            options: {
                ssh: true,
            },
            files: {
                'tmp/remote_roundtrip/': [grunt.option('host') + ':src/'],
            },
        }
    }
    
    grunt.initConfig(config);

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'synchard', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
