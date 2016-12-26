import express from 'express';
import clioutput from './clioutput';

const routing = express.Router();

routing.post('/debug', (req, res) => {
  // No logging framework used. Choose your own, e.g. Winston
  clioutput.info(JSON.stringify(req.body));
  res.status(200).send({ message: 'OK'});
});

routing.get('*', (req, res) => res.sendStatus(404).end());

export default routing;
