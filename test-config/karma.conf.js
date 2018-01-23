var webpackConfig = require('./webpack.test.js');

module.exports = function (config) {
	'use strict';
  config.set({
    basePath: '',

    frameworks: ['jasmine'],

    files: [
      {pattern: './karma-test-shim.js', watched: true}
    ],

    preprocessors: {
      './karma-test-shim.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    },

    webpackServer: {
      noInfo: true
    },

    reporters: config.coverage ? ['kjhtml', 'dots', 'coverage-istanbul'] : ['kjhtml', 'dots'],
	coverageIstanbulReporter: {
		reports: [ 'html', 'lcovonly' ],
		fixWebpackSourcePaths: true
	},
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: !config.coverage,
    browsers: config.coverage || config.singleRun ? ['ChromeHeadless'] : ['Chrome'],
    singleRun: config.coverage || config.singleRun
  });
};