module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    loadPath: '_scss/globals/'
                },
                files: {
                    'e2/css/rv7/organization/style.css': '_scss/style.scss'
                }
            }
        },
        browserify: {
            dist: {
                files: {
                    './e2/scripts/rv7/organization/index.js': ['_js/globals/header.js']
                },
                options: {
                    transform: ['babelify']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');

    grunt.loadNpmTasks('grunt-contrib-sass');

};
