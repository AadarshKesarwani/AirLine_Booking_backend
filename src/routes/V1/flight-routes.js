const express = require('express');
const router = express.Router();
const { FlightController } = require('../../controllers');
const { flightMiddlewares } = require('../../middlewares');


//api/v1/flights
router.post('/', flightMiddlewares.validateCreateRequest, FlightController.createFlight);



//api/v1/flights/?trips=MUM-DEL
router.get('/', FlightController.getAllFlights);


module.exports = router;