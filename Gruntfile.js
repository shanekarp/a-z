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
        replace: {
            cdn: {
                src: ['src/**/*.html', 'src/_js/**/*.js', 'src/_scss/**/*.scss'],
                overwrite: true,
                replacements: [{
                    from: 'http://localhost:8282/to_origin/',
                    to: '/e2/'
                }, {
                    from: 'http://frontend.ardev.us/development/<%= pkg.name %>/to_origin/',
                    to: '/e2/'
                }, {
                    from: 'http://frontend.ardev.us/api/',
                    to: 'http://www.army.mil/api/'
                }]
            },
            dev: {
                src: ['src/**/*.html', 'src/_js/**/*.js', 'src/_scss/**/*.scss'],
                overwrite: true,
                replacements: [{
                    from: /\/e2\/(?!rv5_js\/3rdparty|rv5_js\/main|rv5_js\/features|rv5_css\/features|rv5_images\/features)/g,
                    to: 'http://frontend.ardev.us/development/<%= pkg.name %>/to_origin/'
                }, {
                    from: 'http://localhost:8282/to_origin/',
                    to: 'http://frontend.ardev.us/development/<%= pkg.name %>/to_origin/'
                }, {
                    from: 'http://www.army.mil/api/',
                    to: 'http://frontend.ardev.us/api/'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');

    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('production', ['replace:cdn', 'sass','browserify', 'uglify']);


};
