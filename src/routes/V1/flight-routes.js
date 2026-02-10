const express = require('express');
const router = express.Router();
const { FlightController } = require('../../controllers');
const { flightMiddlewares } = require('../../middlewares');


//api/v1/flights  -> to create a flight
router.post('/', flightMiddlewares.validateCreateRequest, FlightController.createFlight);



//api/v1/flights/  -> to get all flights with filters and sorting
router.get('/', FlightController.getAllFlights);




//api/v1/flights/:id  -> to get details of a particular flight
router.get('/:id', FlightController.getFlight);




//api/v1/flights/:id/seats  -> patch request to update seats
router.patch('/:id/seats', flightMiddlewares.validateUpdateSeatsRequest, FlightController.updateSeats);





module.exports = router;