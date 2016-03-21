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
                    './e2/scripts/rv7/organization/<%= pkg.name %>.js': ['_js/globals/header.js']
                },
                options: {
                    transform: ['babelify']
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mangle: true,
                compress: true,
                beautify: false
            },
            build: {
                files: [{
                    src: [
                        'e2/scripts/rv7/organization/<%= pkg.name %>.js'
                    ],
                    dest: 'e2/scripts/rv7/organization/<%= pkg.name %>.min.js'
                }]
            }
        },
    });

    grunt.loadNpmTasks('grunt-browserify');

    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('production', ['sass', 'browserify', 'uglify']);

};
