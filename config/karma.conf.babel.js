import webpackConfig from '../config/webpack.config.babel';

// karma configuration
var karma_conf = {
  basePath: '../',
  webpack: webpackConfig,
  browsers: ['Firefox', 'Chrome'],
  client: {
    captureConsole: true,
    mocha: {'ui': 'tdd'}
  },
  envPreprocessor: [
    'TEST_ENV'
  ],
  files: [
    'dist/vendors/vendors-bundle.js',
    // Define test files.
    {pattern: 'tests/**/*.test.js'},
    // Serve test assets.
    {pattern: 'tests/assets/**/*', included: false, served: true},

    {pattern: './src/js/vendors.js', watched: false, included: false, served: false}
  ],
  frameworks: ['mocha', 'sinon-chai', 'chai-shallow-deep-equal'],
  preprocessors: {
    'tests/**/*.js': ['webpack', 'sourcemap', 'env']
  },
  reporters: ['mocha']
};

// configuration for code coverage reporting
if (process.env.TEST_ENV === 'ci') {
  karma_conf.coverageReporter = {
    dir: 'devel/coverage',
    reporters: [
      {'type': 'html', subdir: '.'},
      {'type': 'lcov', subdir: '.'}
    ]
  };
  karma_conf.reporters.push('coverage');
  karma_conf.reporters.push('progress');
  karma_conf.preprocessors['src/**/*.js'] = ['coverage'];
}

// Apply configuration
module.exports = function (config) {
  config.set(karma_conf);
};
