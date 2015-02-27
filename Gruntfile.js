'use strict';
module.exports = function(grunt){
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);
	var path = {
		app: 'app',
		dist: 'dist'
	};
	grunt.initConfig({
		yeoman: path,
		connect:{
			options:{
				port: 9000,
				hostname: 'localhost',
				base: '<%= yeoman.app %>',
				livereload: 35729
			},
			livereload: {
				options: {
					open :true,
					//base:'<%= yeoman.app %>'
					middleware: function(connect){
						return [
							connect.static('.tmp'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(path.app)
						]
					}
				}
			},
			dist: {
				options: {
					open:true,
					base: '<%= yeoman.dist %>'
				}
			}
		},
		watch: {
			client: {
				options: {
					livereload: 35729
				},
				files:[
					'<%= yeoman.app %>/*.html',
					'<%= yeoman.app %>/views/*.html',
					'<%= yeoman.app %>/scripts/*.js',
					'.tmp/styles/{,*/}*.css',
					'.tmp/scripts/**/*.js',
					'<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
				]
			}
			
		},
		copy: {
			dist: {
				files: [
				{
					expand:true,
					cwd: '<%= yeoman.app %>',
					src: [
						'*.{ico,png,txt}',
						'.htaccess',
						'*.html',
						'views/*.html',
						'styles/*.*',
						'images/*.*'
					],
					dest: '<%= yeoman.dist %>'
				}
				]
			},
			styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
		},
		clean: {
			dist: {
				files: [{
					src: '<%= yeoman.dist %>{,*/}*'
				}]
			}
		},
		useminPrepare: {
            html: 'app/index.html',
            options: {
                dest: 'dist'
            }
        },
		uglify: {
            options: {
                mangle: false
            }
        },
		usemin: {
            html: ['dist/index.html']
        },
		htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: ['*.html', 'views/{,*/}*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
		
	});
	grunt.registerTask('server',[
		'build',
        'connect:dist:keepalive'
	]);
	/*grunt.registerTask('serve',function(target){
		if(target ===  'dist'){
			return grunt.task.run([
				'build',
				'connect:dist:keepalive'
			]);
		}
		grunt.task.run([
			//'build',
			//'connect:dist:keepalive',
			'connect',
			'watch'
		]);
	});*/
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('live',[
		'copy:styles',
		'connect:livereload',
		'watch'
	]);
	grunt.registerTask('build',[
		'clean:dist',
		'useminPrepare',
		'concat',
		'copy:dist',
		'usemin',
		'cssmin',
		'htmlmin',
		'uglify',
		'watch'
	])
}
        
