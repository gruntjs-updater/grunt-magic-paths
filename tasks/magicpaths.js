/*
 * grunt-magic-paths
 * https://github.com/ben-eb/grunt-magic-paths
 *
 * Copyright (c) 2013 Ben Briggs
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Helpers
    var _  = grunt.util._,
        gf = grunt.file;

    var unixifyPath = function(filepath) {
        return (process.platform === 'win32') ? filepath.replace(/\\/g, '/') : filepath;
    };

    var getFile = function(path) {
        return path.replace(/^.*[\\\/]/, '');
    };

    var compactSplitReverse = function(target) {
        return _.compact(target.split('/')).reverse();
    };

    grunt.registerMultiTask('magicpaths', 'Magical asset paths for your HTML templates.', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var paths   = [],
            fpaths  = [],
            ret     = true;
        var options = this.options({
            needle: 'path:',
            ignores: [
                '.sass-cache',
                'node_modules'
            ]
        });
        gf.expand({
            filter: function(src) {
                ret = true;
                _.each(options.ignores, function(ignores) {
                    if (src.indexOf(ignores) > -1) {
                        ret = false;
                    }
                });
                // Ignore directories
                return (gf.isDir(src)) ? false : ret;
            }
        }, ['**/*']).forEach(function(file) {
            var g = getFile(file);
            paths.push({
                fullPath: file,
                filePath: g
            });
            fpaths.push(g);
        });

        var longest = _.max(paths, function(path) {
            return path.filePath.length;
        });
        // Iterate over all specified file groups.
        this.files.forEach(function(f) {
            var files = grunt.file.expand({nonull: true}, f.orig.src);
            files.map(function(filepath) {
                if ( ! grunt.file.exists(filepath)) {
                    grunt.fail.warn('File \'' + filepath + '\' does not exist. Please check your configuration and try again.');
                }
                // Read file source.
                var content = gf.read(filepath);
                // How many directories deep are we?
                var subdirs = _.compact(unixifyPath(f.dest).split('/')).length;
                _.each(paths, function(path) {
                    content = content.replace(options.needle + path.filePath, function(n) {
                        var duplicates = fpaths.filter(function(value) {
                            ret = value === n.replace(options.needle, '');
                        }).length;
                        if (duplicates > 1) {
                            grunt.fail.warn('More than one \'' + path.filePath + '\' exists; could not resolve.');
                        }
                        if (gf.doesPathContain(f.dest, path.fullPath)) {
                            // is the path a descendant of our destination path?
                            ret = path.fullPath.replace(f.dest, '');
                        } else {
                            // ok, it isn't a descendant. see if we can go back to a common directory
                            var needlepath = compactSplitReverse(path.fullPath);
                            var destpath = compactSplitReverse(f.dest);
                            destpath.unshift(path.filePath);
                            var diff = _.difference(destpath, needlepath).length;
                            // are we in root?
                            if (diff === subdirs) {
                                ret = _.repeat('../', subdirs) + path.fullPath.replace(f.dest, '');
                            } else {
                                ret = _.repeat('../', diff) + path.filePath;
                            }
                        }
                        grunt.log.writeln(options.needle.grey + _.rpad(path.filePath, longest.filePath.length) + ' -> ' + ret);
                        return ret;
                    });
                });
                var output = f.dest + filepath;
                gf.write(output, content);
                grunt.log.ok('Paths from ' + filepath.cyan + ' converted to ' + output.green);
            });
        });
    });
};
