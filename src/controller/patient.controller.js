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
      res.status(HttpStatus.OK.code).send(
        new Response(
          HttpStatus.OK.code,
          HttpStatus.OK.status,
          'Drivers Found!',
          {
            drivers: result,
          }
        )
      );
    }
  });
};

const createDriver = (req, res) => {
  log.info(`${req.method} ${req.originalurl}, creating driver`);
  database.query(
    QUERY.CREATE_DRIVER,
    Object.values(req.body),
    (error, result) => {
      log.error(error.message);
      if (!result) {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
          .send(
            new Response(
              HttpStatus.INTERNAL_SERVER_ERROR.code,
              HttpStatus.INTERNAL_SERVER_ERROR.status,
              'Error Occured...',
              []
            )
          );
      } else {
        const driver = {
          id: result.insertedId,
          ...req.body,
          entered_at: new Date().toLocaleString(),
        };
        res
          .status(HttpStatus.OK.code)
          .send(
            new Response(
              HttpStatus.CREATED.code,
              HttpStatus.CREATED.status,
              'Driver Created!',
              driver
            )
          );
      }
    }
  );
};

const getDriver = (req, res) => {
  log.info(`${req.method} ${req.originalurl}, fetching driver`);
  database.query(QUERY.SELECT_DRIVER, [req.params.id], (error, result) => {
    if (!result[0]) {
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            `No Driver Found with id: ${req.params.id}...`,
            []
          )
        );
    } else {
      res.status(HttpStatus.OK.code).send(
        new Response(
          HttpStatus.OK.code,
          HttpStatus.OK.status,
          'Driver Found!',
          {
            driver: result[0],
          }
        )
      );
    }
  });
};

export const updatePatient = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching patient`);
  database.query(QUERY.SELECT_PATIENT, [req.params.id], (error, results) => {
    if (!results[0]) {
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            `Patient by id ${req.params.id} was not found`
          )
        );
    } else {
      logger.info(`${req.method} ${req.originalUrl}, updating patient`);
      database.query(
        QUERY.UPDATE_PATIENT,
        [...Object.values(req.body), req.params.id],
        (error, results) => {
          if (!error) {
            res
              .status(HttpStatus.OK.code)
              .send(
                new Response(
                  HttpStatus.OK.code,
                  HttpStatus.OK.status,
                  `Patient updated`,
                  { id: req.params.id, ...req.body }
                )
              );
          } else {
            logger.error(error.message);
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
              .send(
                new Response(
                  HttpStatus.INTERNAL_SERVER_ERROR.code,
                  HttpStatus.INTERNAL_SERVER_ERROR.status,
                  `Error occurred`
                )
              );
          }
        }
      );
    }
  });
};

export const deletePatient = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, deleting patient`);
  database.query(QUERY.DELETE_PATIENT, [req.params.id], (error, results) => {
    if (results.affectedRows > 0) {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            `Patient deleted`,
            results[0]
          )
        );
    } else {
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            `Patient by id ${req.params.id} was not found`
          )
        );
    }
  });
};

module.exports = {
  HttpStatus,
  getDrivers,
  createDriver,
  getDriver,
};
