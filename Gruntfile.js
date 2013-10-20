/*
 * grunt-magic-paths
 * https://github.com/ben-eb/grunt-magic-paths
 *
 * Copyright (c) 2013 Ben Briggs
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        clean: {
            tests: {
                src: ['test/**/test.html']
            }
        },
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js'
            ],
            options: {
                'expr'              : true,
                'node'              : true,
                'strict'            : true,
                'trailing'          : true,
                'undef'             : true,
                'curly'             : true,
                'eqeqeq'            : true,
                'immed'             : true,
                'latedef'           : true,
                'noarg'             : true,
                'noempty'           : true,
                'unused'            : true,
                'indent'            : 4
            },
        },
        lintspaces: {
            source: {
                src: [
                    'tasks/**/*.js',
                    'Gruntfile.js',
                    'package.json',
                    'README.md'
                ],
                options: {
                    newline         : true,
                    trailingspaces  : true,
                    indentation     : 'spaces',
                    spaces          : 4,
                    ignores         : ['js-comments']
                }
            }
        },
        nodeunit: {
            tests: ['test/*_test.js']
        },
        magicpaths: {
            littlewaydown: {
                src: ['test.html'],
                dest: 'test/'
            },
            mediumwaydown: {
                src: ['test.html'],
                dest: 'test/fixtures/'
            },
            longwaydown: {
                src: ['test.html'],
                dest: 'test/fixtures/resolve/'
            },
            badfile_failure: {
                src: ['LICENSE'],
                dest: 'test/'
            },
            dupepaths_failure: {
                src: ['README.md'],
                dest: 'test/'
            }
        }
    });
    // Lint all the things
    grunt.registerTask('default', ['lintspaces', 'jshint']);
    grunt.registerTask('test', ['magicpaths:littlewaydown', 'magicpaths:mediumwaydown', 'magicpaths:longwaydown', 'nodeunit', 'clean']);
    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');
};
