# grunt-magic-paths

> Magical asset paths for your HTML templates.

## Getting Started
This plugin requires Grunt `~0.4.1`

Once the plugin has been installed via `npm install grunt-magic-paths --save-dev`, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-magic-paths');
```

Alternatively, use a plugin such as [https://github.com/sindresorhus/load-grunt-tasks](load-grunt-tasks); specify `require('load-grunt-tasks')(grunt);` in your Gruntfile and you don't need a separate line for every plugin you use.

## The "magicpaths" task

`magicpaths` searches through your files and generates the folder structure intelligently based on where the output file is located, even if the location changes. For example, you could write a link such as  `<a href="path:test.html">Test</a>` and it would resolve that path to something like `<a href="example/templates/testing/test.html">Test</a>`.

### Options

#### options.needle
Type: `String`
Default value: `path:`

The needle to look for before the file path itself.

#### options.ignores
Type: `Array`
Default value: `['.sass-cache', 'node_modules']`

Directories that the plugin should not look in.

### Example Configuration

This example will copy `test.html` into the `test` directory and update the paths prefixed with `@@` automagically.

```js
grunt.initConfig({
    magicpaths: {
        build: {
            options: {
                needle: '@@'
            },
            src: ['test.html'],
            dest: 'test/'
        }
    }
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.1.0 - Initial release.
