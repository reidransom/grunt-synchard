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

This task runs the command-line program `rsync`.  It comes with minimal defaults and allows for lots of customization.

### Options

#### options.args
Type: `Array`
Default value: `['--archive']`

An array of args to be passed to `rsync`.

#### options.exclude
Type: `Array`
Default value: `[]`

An optional array of rsync patterns to exclude from transfer.

#### options.mkdirp
Type: `Bool`
Default value: `false`

If true, the destination folder and parent folders will be created as necessary.

#### options.ssh
Type: `Bool`
Default value: `false`

Run rsync over ssh.  This is `false` by default.  To use this you need to have public/private key passwordless SSH access setup and working on your workstation.  If set to `true`, you should specify a hostname as part of your src or dest options.

#### options.port
Type: `String`
Default value: `undefined`

If your ssh host uses a non standard SSH port then set it here. Example, `"1234"`.

#### options.privateKey
Type: `String`
Default value: `undefined`

To specify an SSH private key other than the default for this host. Example, `"~/.ssh/aws.pem"`

### Usage Examples

#### Default Options
In this example, the default options are used to copy multiple files from `src` to `dest/default_options`.

    grunt.initConfig({
        synchard: {
            default: {
                files: {
                    'dest/default_options': ['src/testing', 'src/123']
                }
            }
        }
    })

This would be the output.

    rsync ./src/testing ./src/123 ./dest/default_options --archive

#### Dry Run

If you invoked `grunt` for the above config with the command-line option `--dry-run` like this:

    $ grunt --dry-run

the output would look something like this:

    rsync test/src/testing test/src/123 tmp/default_options --archive --dry-run --verbose
    building file list ... done
    created directory tmp/default_options
    123
    testing

    sent 98 bytes  received 32 bytes  260.00 bytes/sec
    total size is 12  speedup is 0.09

#### Custom Options
In this example, the folder `src` is copied to `dest/custom_options`.  Custom options are used to display verbose `rsync` output and exclude the `123` file.

    grunt.initConfig({
        synchard: {
            custom: {
                options: {
                    args: ['-av'],
                    exclude: ['123']
                },
                files: {
                    'dest/custom_options/': ['src/']
                }
            }
        }
    })

Assuming `src` contains two files `123` and `testing`, this would output:

    rsync ./src/ ./dest/custom_options/ --exclude=123 -av
    building file list ... done
    ./
    testing

    sent 147 bytes  received 48 bytes  390.00 bytes/sec
    total size is 7  speedup is 0.04

#### Remote Destination

    grunt.initConfig({
        synchard: {
            remotedest: {
                options: {
                    ssh: true
                },
                files: {
                    'user@example.com:dest/': ['src/']
                }
            }
        }
    })

#### Remote Source

    grunt.initConfig({
        synchard: {
            remotesrc: {
                options: {
                    ssh: true
                },
                files: {
                    'dest/': ['user@example.com:src/']
                }
            }
        }
    })

## Testing

You can test local rsync tasks with:

    $ grunt test

You can test local and remote rsync tasks by first making sure you have password-less ssh key access to a server (ex: `user@example.com`) and then running:

    $ grunt test --host user@example.com     # READ ON BEFORE RUNNING THIS

Be careful!  This will remove files from `user@example.com:synchard_test`.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.2.0 - Added `ssh` and `mkdirp` options.

0.1.0 - Initial Release
