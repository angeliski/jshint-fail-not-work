(function(){

  'use strict';

  var gulp = require('gulp');
  var $ = require('gulp-load-plugins')();

  var dev = true;

  var config = {
    src: './index.js',
    jshint: {
        options: {
            lookup: false,
            node: true,
            globals: {
                jQuery: true
            }
        }
    }
  };


  function errorHandler(stream, title, message, error) {
		if(dev) {
			stream.hasError = true;
			$.notify.onError({
				title: title || 'Error build',
				message: message || "Error: <%= error.message %>"
			})(error);
		} else {
			process.exit(1);
		}
	}

	function endHandler(stream, done, title, message) {
		if(dev && !stream.hasError) {
			$.notify({
				title: title || 'Success Build',
				message: message || 'Finished!'
			}).write('');
		}

		if(done){
			done();
		}

		return stream;
	}


gulp.task('default', function(done) {
  var stream = gulp.src(config.src);
  return stream.pipe($.if(dev, $.plumber()))
    .pipe($.jshint(config.jshint.options))
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'))
    .on('error', errorHandler.bind(null, stream, 'Error in Areas', null))
    .on('end', endHandler.bind(null, stream, null, 'JS Areas build', null));
});

})();