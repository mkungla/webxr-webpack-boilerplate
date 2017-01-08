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
  Object.assign(karma_conf.browserify, {
    transform: [
      [
        'browserify-istanbul', {
          instrumenterConfig: {
            embedSource: true
          },
          defaultIgnore: true,
          ignore: ['**/node_modules/**', '**/tests/**', '**/vendors/**', '**/*.css']
        }
      ]
    ]
  });
  karma_conf.coverageReporter = {
    dir: 'devel/coverage',
    includeAllSources: true,
    reporters: [
      {'type': 'html', subdir: '.'},
      {'type': 'lcov', subdir: '.'}
    ]
  };
  karma_conf.reporters.push('coverage');
  karma_conf.preprocessors['src/**/*.js'] = ['coverage'];
}

// Apply configuration
module.exports = function (config) {
  config.set(karma_conf);
};
