# grunt-synchard

> rsync task handler.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

    npm install grunt-synchard --save-dev

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

    grunt.loadNpmTasks('grunt-synchard');

## The "synchard" task

### Overview
In your project's Gruntfile, add a section named `synchard` to the data object passed into `grunt.initConfig()`.

    grunt.initConfig({
        synchard: {
            options: {
                // Task-specific options go here.
            },
            your_target: {
                // Target-specific file lists and/or options go here.
            },
        },
    })

### Options

#### options.args
Type: `Array`
Default value: `['--archive']`

An array of args to be passed to `rsync`.

#### options.exclude
Type: `Array`
Default value: `[]`

An optional array of rsync patterns to exclude from transfer.

### Usage Examples

#### Default Options
In this example, the default options are used to copy multiple files from `src` to `dest/default_options`.

    grunt.initConfig({
        synchard: {
            options: {},
            files: {
                'dest/default_options': ['src/testing', 'src/123'],
            },
        },
    })
    
This would be the output.

    rsync ./src/testing ./src/123 ./dest/default_options --archive

#### Custom Options
In this example, the folder `src` is copied to `dest/custom_options`.  Custom options are used to display verbose `rsync` output and exclude the `123` file.

    grunt.initConfig({
        synchard: {
            options: {
                args: ['-av'],
                exclude: ['123'],
            },
            files: {
                'dest/custom_options/': ['src/'],
            },
        },
    })

Assuming `src` contains two files `123` and `testing`, this would output:

    rsync ./src/ ./dest/custom_options/ --exclude=123 -av
    building file list ... done
    ./
    testing
    
    sent 147 bytes  received 48 bytes  390.00 bytes/sec
    total size is 7  speedup is 0.04

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
