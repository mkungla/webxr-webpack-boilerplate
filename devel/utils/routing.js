import express from 'express';
import clioutput from './clioutput';
var path = require('path');

const routing = express.Router();

routing.get('/debug', (req, res) => {
  // No logging framework used. Choose your own, e.g. Winston
  clioutput.info(JSON.stringify(req.body));
  res.status(200).send({ message: 'OK'});
});
routing.get('/v1/*', (req, res) => {
  clioutput.ok('[200] ' + req.params[0]);
  res.sendFile(path.join(__dirname, '/../../src/api/', req.params[0] ? req.params[0] : 'status.json'));
  res.status(200);
});

routing.get('/coverage/*', (req, res) => {
  clioutput.ok('[200] ' + req.params[0]);
  res.sendFile(path.join(__dirname, '/../coverage/', req.params[0] ? req.params[0] : 'index.html'));
  res.status(200);
});

routing.get('*', (req, res) => {
  clioutput.error('[404] Not Found ' + req.params[0]);
  res.sendStatus(404).end()
});

export default routing;
