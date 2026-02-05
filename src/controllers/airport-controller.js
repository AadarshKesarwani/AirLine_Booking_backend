const { StatusCodes } = require("http-status-codes");
const { AirportService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common/");
const { add } = require("winston");

//api ->/aiports
//post request -> create a new airport
//req body -> name, code, cityId, address
async function createAirport(req, res) {
    try {
        const airport = await AirportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            cityId: req.body.cityId,
            address: req.body.address,
        });
        SuccessResponse.data = airport;
        SuccessResponse.message = "Airport created successfully";
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}


//api -> /airports
//get request -> get all the airports
//req body -> no body required
async function getAirports(req, res) {
    try {
        const airports = await AirportService.getAirports();
        SuccessResponse.data = airports;
        SuccessResponse.message = "Airports fetched successfully";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }   
}


//api -> /airports/:id
//get request -> get airport by id
//req body -> no body required
async function getAirport(req, res) {
    try {
        const airport = await AirportService.getAirport(req.params.id);
        SuccessResponse.data = airport;
        SuccessResponse.message = "Airport fetched successfully";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}


//api -> /airports/:id
//delete request -> delete airport by id
//req body -> no body required
async function destroyAirport(req, res) {
    try {
        const response = await AirportService.destroyAirport(req.params.id);
        SuccessResponse.data = response;
        SuccessResponse.message = "Airport deleted successfully";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }   
}

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
}

