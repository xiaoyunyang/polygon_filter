// Set up ======================================================================
// get all the tools we need
import express from 'express';
import http from 'http';
import logger from 'morgan';
import path from 'path';
import apiVersion1 from './api/api1';

require('dotenv').config();

// Configuration ===============================================================
const app = express();
app.set('port', process.env.PORT || 8080);
app.use(logger('short'));

app.use('/api/v1', apiVersion1);

// launch ======================================================================
// Starts the Express server on port 3001 and logs that it has started
http.createServer(app).listen(app.get('port'), () => {
  console.log(`Express server started at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

module.exports = app;
