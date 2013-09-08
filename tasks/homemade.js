/*
 * grunt-homemade
 * https://github.com/dfcreative/grunt-homemade
 *
 * Copyright (c) 2013 Dmitry Ivanov
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path'),
	homemade = require('homemade');

var defaultEnv = {};

module.exports = function(grunt) {
	var _ = grunt.util._;

	grunt.registerMultiTask('homemade', 'C-like JS preprocessor grunt task', function() {
		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options();
		var context = _.extend({
			srcDir: "",
			src: ""
		},this.data.context);

		//log options
		//grunt.log.writeln("data")
		//for (var i in context){
		//	grunt.log.writeln(i + ":" + context[i])
		//}


		// Iterate over all specified file groups.
		this.files.forEach(function(f) {
			// Concat specified files.
			var src = f.src.filter(function(filepath) {
				// Warn on and remove invalid source files (if nonull was set).
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} else {
					return true;
				}
			}).map(function(filepath) {
				// Read file source.
				return grunt.file.read(filepath);
			}).join(grunt.util.normalizelf(""));

			// Handle options.
			//src += options.punctuation;

			context.src = f.src[0];
			context.srcDir = path.dirname(context.src);

			// Write the destination file.
			grunt.file.write(f.dest, homemade.handle(src, context));

			// Print a success message.
			grunt.log.writeln('File "' + f.dest + '" created.');
		});
	});

};