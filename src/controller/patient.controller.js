const database = require('../config/mysql.config');
const Response = require('../domain/response').Response;
const log = require('../util/logger').log;
const QUERY = require('../query/driver.query').QUERY;

const HttpStatus = {
  OK: {
    code: 200,
    status: 'OK',
  },
  CREATED: {
    code: 201,
    status: 'CREATED',
  },
  NO_CONTENT: {
    code: 204,
    status: 'NO_CONTENT',
  },
  BAD_REQUEST: {
    code: 400,
    status: 'BAD_REQUEST',
  },
  BAD_REQUEST: {
    code: 400,
    status: 'BAD_REQUEST',
  },
  NOT_FOUND: {
    code: 404,
    status: 'NOT_FOUND',
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    status: 'INTERNAL_SERVER_ERROR',
  },
};

const getDrivers = (req, res) => {
  log.info(`${req.method} ${req.originalurl}, fetching drivers`);
  database.query(QUERY.SELECT_DRIVERS, (error, result) => {
    if (!result) {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            'No Drivers Found...',
            []
          )
        );
    } else {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            'Drivers Found!',
            result
          )
        );
    }
  });
};

module.exports = {
  HttpStatus,
};
