module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		critical: {
			test: {
				options: {
					inline: true,
					base: './',
					css: [
						'src/e2/rv5_css/a-z/style.css'
					],
					width: 320,
					height: 70,
					minify: true
				},
				src: 'src/_critical/critical-index.html',
				dest: 'src/to_frontend_sc/index.html'
			},
			test2: {
				options: {
					inline: true,
					base: './',
					css: [
						'src/e2/rv5_css/a-z/style.css'
					],
					width: 320,
					height: 70,
					minify: true
				},
				src: 'src/_critical/critical-history.html',
				dest: 'src/to_frontend_sc/history.html'
			}
		},

		jslint: {
			client: {
				src: [
					'src/_js/**/*.js'
				],
				directives: {
					browser: true
				},
				exclude: [
					'src/_js/backbone-min.js',
					'src/_js/bootstrap.min.js',
					'src/_js/modernizr.custom.js',
					'src/_js/owl.carousel.custom.min.js',
					'src/_js/spin.min.js',
					'src/_js/underscore-min.js',
					'src/_js/fastclick.js',
					'src/_js/waypoints.min.js'
				],
				options: {

				}
			}
		},
		jshint: {
			all: [
				'src/_js/**/*.js'
			],
			options: {
				ignores: [
					'src/_js/backbone-min.js',
					'src/_js/bootstrap.min.js',
					'src/_js/modernizr.custom.js',
					'src/_js/owl.carousel.custom.min.js',
					'src/_js/spin.min.js',
					'src/_js/underscore-min.js',
					'src/_js/fastclick.js',
					'src/_js/waypoints.min.js'
				]
			}
		},
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					// 'src/e2/rv5_css/a-z/style.css': 'src/_scss/style.scss',
					// 'src/e2/rv5_css/a-z/old_ie_style.css': 'src/_scss/old_ie_style.scss',
					// 'src/e2/rv5_css/a-z/ie_7_style.css': 'src/_scss/ie_7_style.scss',
					// 'src/e2/rv5_css/a-z/ie_8_style.css': 'src/_scss/ie_8_style.scss',
					// 'src/e2/rv5_css/a-z/ie_9_or_newer_style.css': 'src/_scss/ie_9_or_newer_style.scss'
				}

			}
		},
		jsbeautifier: {
			files: ['src/**/*.html'],
			options: {}
		},
		accessibility: {
			options: {
				accessibilityLevel: 'WCAG2A'
			},
			test: {
				src: ['src/**/*.html']
			}
		},
		zip: {
			'build/rv5_images.zip': ['src/e2/rv5_images/**/*']
		},
		unzip: {
			highlight: {
				src: ['build/rv5_images.zip'],
				dest: '.'
			}
		},
		replace: {
			local: {
				src: ['src/**/*.html', 'src/_js/**/*.js', 'src/_scss/**/*.scss'],
				overwrite: true,
				replacements: [{
					from: /\/e2\/(?!rv5_js\/3rdparty|rv5_js\/main|rv5_js\/features|rv5_css\/features|rv5_images\/features)/g,
					to: 'http://localhost:8282/e2/'
				}, {
					from: 'http://frontend.ardev.us/development/<%= pkg.name %>/e2/',
					to: 'http://localhost:8282/e2/'
				}]
			},
			cdn: {
				src: ['src/**/*.html', 'src/_js/**/*.js', 'src/_scss/**/*.scss'],
				overwrite: true,
				replacements: [{
					from: 'http://localhost:8282/e2/',
					to: '/e2/'
				}, {
					from: 'http://frontend.ardev.us/development/<%= pkg.name %>/e2/',
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
					to: 'http://frontend.ardev.us/development/<%= pkg.name %>/e2/'
				}, {
					from: 'http://localhost:8282/e2/',
					to: 'http://frontend.ardev.us/development/<%= pkg.name %>/e2/'
				}, {
					from: 'http://www.army.mil/api/',
					to: 'http://frontend.ardev.us/api/'
				}]
			}
		},
		'http-server': {
			'dev': {
				root: 'src/',
				port: 8282,
				host: "0.0.0.0",
				ext: "html",
				runInBackground: false
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				mangle: true,
				compress: false,
				beautify: false
			},
			build: {
				src: [
					'src/_js/a-z.full.js',
					'src/_js/news.js'
				],
				dest: 'src/e2/rv5_js/a-z/<%= pkg.name %>.js'
			}
		},
		watch: {
			scripts: {
				files: ['src/_js/**/*.js', 'src/_scss/**/*.scss'],
				tasks: ['sass', 'uglify'],
				options: {
					spawn: false,
				},
			},
		},
		'sftp-deploy': {
			build: {
				auth: {
					host: 'frontend.ardev.us',
					authKey: 'privateKey'
				},
				cache: 'sftpCache.json',
				src: 'src/',
				dest: '/www/development/<%= pkg.name %>',
				exclusions: ['build/', 'node_module/', 'Gruntfile.js', 'package.json', 'readme.md', '.sass-cache', '.git', '.gitignore'],
				serverSep: '/',
				concurrency: 4,
				progress: true
			}
		},
		bump: {
			options: {
				files: ['package.json'],
				updateConfigs: [],
				commit: true,
				commitMessage: 'Release v%VERSION%',
				commitFiles: ['package.json'],
				createTag: true,
				tagName: 'v%VERSION%',
				tagMessage: 'Version %VERSION%',
				push: false,
				gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
				globalReplace: false,
				prereleaseName: false,
				regExp: false
			}
		}
	});

	grunt.loadNpmTasks('grunt-critical');

	grunt.loadNpmTasks('grunt-bump');

	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.loadNpmTasks('grunt-sftp-deploy');

	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.loadNpmTasks('grunt-http-server');

	grunt.loadNpmTasks('grunt-php');

	grunt.loadNpmTasks('grunt-text-replace');

	grunt.loadNpmTasks('grunt-curl');

	grunt.loadNpmTasks('grunt-zip');

	grunt.loadNpmTasks('grunt-accessibility');

	grunt.loadNpmTasks('grunt-jslint');

	grunt.loadNpmTasks("grunt-jsbeautifier");

	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.registerTask('default', ['images', 'local', 'http-server']);

	grunt.registerTask('test', ['php', 'mocha']);

	grunt.registerTask('dev', ['replace:dev', 'sass', 'uglify']);

	grunt.registerTask('local', ['replace:local', 'sass', 'uglify']);

	grunt.registerTask('cdn', ['replace:cdn', 'sass', 'uglify']);

	grunt.registerTask('images', ['curl', 'unzip']);

};
