const express = require('express');
const app = express();
const ip = require('ip');
const dotenv = require('dotenv');
const cors = require('cors');
const Response = require('./domain/response.js').Response;
const log = require('./util/logger.js').log;
const HttpStatus = require('./controller/patient.controller').HttpStatus;

dotenv.config();
const PORT = process.env.PORT || 3000;
app.use(cors({ origin: '*' })); // allow all websites to get data from this api.
app.use(express.json()); // all response should be in json format.

app.get('/', (req, res) => {
  res.send(
    new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Drivers API', [])
  );
});

app.listen(PORT, () => {
  log.info(`api running on ${ip.address()} : ${PORT}`);
});
