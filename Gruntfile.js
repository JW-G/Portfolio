'use strict';
module.exports = function(grunt) {
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	var config = {};

	config['clean'] = {
		build: {
			files: [{
				dot: true,
				src: [
					'dist/*',
					'!dist/.git*'
				]
			}]
		}
	};

	config['htmlmin'] = {
		build: {
			options: {
				collapseBooleanAttributes: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true,
				removeComments: true,
				removeRedundantAttributes: true,
				removeEmptyAttributes: true
			},
			files: {
				src: ['*.html'],
				dest: 'dist/',
				filter: {
					cwd: 'src/'
				}
			}
		}
	};

	config['imagemin'] = {
		dist: {
			files: {
				'dist/img/LogoWhite.png' : 'src/img/LogoWhite.png',
			}
		}
	};

	config['useminPrepare'] = {
		options: {
			dest: 'dist'
		},
		html: 'src/index.html'
	};

	config['usemin'] = {
		options: {
			dirs: ['dist']
		},
		html: 'src/index.html'
	};

	config['rev'] = {
		files: {
			src: [
				'dist/scripts/{,*/}*.js',
			]
		}
	};

	config['cssmin'] = {
		target: {
			files: [{
				expand: true,
				src: ['*.css'],
				dest: 'dist/css/',
				cwd: 'src/css/'
			}]
		}
	};

	config['watch'] = {
		options: {
			dateFormat: function(time) {
				grunt.log.writeln('Finished in ' + time + 'ms, madafacka!')
				grunt.log.writeln('Ready for more!')
			},
		},
		scripts: {
			files: ['**/*.{css,html,scss}'],
			tasks: ['build'],
			options: {
				spawn: false,
			},
		},
	};

	config['sass'] = {
		dist: {
			files: {
				'src/css/style.css' : 'src/sass/style.scss'
			}
		}
	}

	grunt.initConfig(config);

	var tasks = [
		'clean',
		'useminPrepare',
		'htmlmin',
		'imagemin',
		'rev',
		'usemin',
		'sass',
		'cssmin'
	];

	grunt.registerTask('build', tasks);
}