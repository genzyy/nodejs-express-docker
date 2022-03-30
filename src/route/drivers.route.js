const express = require('express');
const {
  getDrivers,
  getDriver,
  createDriver,
  updateDriver,
  deleteDriver,
} = require('../controller/drivers.controller');
const driverRoutes = express.Router();

driverRoutes.route('/').get(getDrivers).post(createDriver);
driverRoutes
  .route('/:id')
  .get(getDriver)
  .put(updateDriver)
  .delete(deleteDriver);
