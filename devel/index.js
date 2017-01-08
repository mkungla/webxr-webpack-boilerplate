import 'babel-polyfill';
import webpack from 'webpack';
import config from '../config/webpack.config.babel';
import express from 'express';
import path from 'path';
import history from 'connect-history-api-fallback';
import bodyParser from 'body-parser';
import routing from './utils/routing';
import helper from './utils/helpers';
import clioutput from './utils/clioutput';

const argv = helper.parseArguments(process.argv.slice(2));
const isHot = argv['hot'] || false;
const publicPath = config.output.publicPath || '/';
const outputPath = config.output.path || path.resolve(process.cwd(), 'dist');
const host = '0.0.0.0';
const port = process.env.PORT || argv.port || 9000;
const app = express();

if(isHot) {
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: publicPath,
    contentBase: config.context,
    stats: 'errors-only',
    hot: true,
    inline: true,
    lazy: false,
    historyApiFallback: true,
    headers: {'Access-Control-Allow-Origin': '*'},
  }));

  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/webpack-hot-module-replace',
    heartbeat: 10 * 1000,
  }));
}
else {
  const compression = require('compression');
  app.use(compression());
}

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', routing);
app.use(history({
  verbose: false,
}));
app.use(publicPath, express.static(outputPath));

process.on('uncaughtException', err => {
  clioutput.error('Uncaught Exception ', err.stack);
  process.exit(1)
});

app.listen(port, host, (err) => {
  if(err) {
    clioutput.error(err.message);
  }
  else {
    clioutput.banner(port);
  }
});
