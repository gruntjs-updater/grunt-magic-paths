'use strict';

var grunt = require('grunt');

module.exports.magicpaths = {
    littlewaydown: function(test) {
        test.expect(1);
        var actual = grunt.file.read('test/test.html');
        var expected = grunt.file.read('test/littleway.html');
        test.equal(actual, expected, 'Tests behaviour one level down');
        test.done();
    },
    mediumwaydown: function(test) {
        test.expect(1);
        var actual = grunt.file.read('test/fixtures/test.html');
        var expected = grunt.file.read('test/mediumway.html');
        test.equal(actual, expected, 'Tests behaviour two levels down');
        test.done();
    },
    longwaydown: function(test) {
        test.expect(1);
        var actual = grunt.file.read('test/fixtures/resolve/test.html');
        var expected = grunt.file.read('test/longway.html');
        test.equal(actual, expected, 'Tests behaviour three levels down');
        test.done();
    },
    badfile_failure: function(test) {
        test.expect(1);
        test.throws();
        test.done();
    },
    dupepaths_failure: function(test) {
        test.expect(1);
        test.throws();
        test.done();
    }
};
