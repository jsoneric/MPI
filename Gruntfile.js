'use strict';

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		exec:{
			clean: 'npm run clean',
			build: 'npm run build',
			serve: 'npm run ionic:serve',
			lab: 'npm run ionic:serve -l',
			lint: 'npm run lint',
			test: 'npm test',
			dev: 'npm run test-ci',
			coverage: 'npm run test-coverage',
			e2e: 'npm run e2e',
			android:'npm run ionic:android',
			resources:'npm run ionic:resources',
			runAndroid:'npm run ionic:run-a',
			extractTranslations:'npm run extract'
		},
		clean:{
			options:{force:true},
			coverage:{
				src: ['coverage/*']
			}
		},
		open:{
			coverage:{
				path:'coverage/index.html'
			}
		}
	});
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-open');

	grunt.registerTask('default', ['exec:clean', 'exec:lint', 'exec:test', 'exec:build']);
	grunt.registerTask('build', 'exec:build');
	grunt.registerTask('serve', ['exec:serve']);
	grunt.registerTask('lab', ['exec:lab']);
	grunt.registerTask('lint', ['exec:lint']);
	grunt.registerTask('android', 'exec:android');
	grunt.registerTask('resources', 'exec:resources');
	grunt.registerTask('test', ['exec:lint', 'exec:test']);
	grunt.registerTask('dev', ['exec:dev']);
	grunt.registerTask('coverage', ['exec:lint', 'clean:coverage', 'exec:coverage', 'open:coverage']);
	grunt.registerTask('e2e', ['exec:e2e']);
	grunt.registerTask('runAndroid', ['exec:runAndroid']);
	//Keeping this because you can't call the clean tasks with 'clean' unless you call 'grunt clean' directly and pass a path as an argument.
	//To call 'clean' from within a Gruntfile you have to name the Grunt task something else and call it like we did with 'clean:coverage' below.
	grunt.registerTask('cleanup', ['clean:coverage', 'exec:clean']);
	grunt.registerTask('translate', ['exec:extractTranslations']);
};