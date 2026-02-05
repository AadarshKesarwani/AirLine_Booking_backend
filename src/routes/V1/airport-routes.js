const express = require('express');
const router = express.Router();

const { AirportController } = require('../../controllers');
const { airportMiddlewares } = require('../../middlewares');

// api/v1/airports
router.post(
  '/',
  airportMiddlewares.validateCreateRequest,
  AirportController.createAirport
);

// api/v1/airports
router.get('/', AirportController.getAirports);

// api/v1/airports/:id
router.get('/:id', AirportController.getAirport);

// api/v1/airports/:id
router.delete('/:id', AirportController.destroyAirport);

module.exports = router;
