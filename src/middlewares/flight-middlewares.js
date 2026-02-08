const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");


function validateCreateRequest(req, res, next) {
    if (!req.body || !req.body.flightNumber || typeof req.body.flightNumber !== "string") {
        ErrorResponse.message = "Something went wrong while creating flight";
        ErrorResponse.error = new AppError(
            ["Flight number is required and should be a string"],
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if (!req.body.airplaneId) {
        ErrorResponse.message = "Something went wrong while creating flight";   
        ErrorResponse.error = new AppError(
            ["Airplane ID is required"],
            StatusCodes.BAD_REQUEST 
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if (!req.body.departureAirportId) {
        ErrorResponse.message = "Something went wrong while creating flight";   
        ErrorResponse.error = new AppError(
            ["Departure Airport ID is required"],
            StatusCodes.BAD_REQUEST 
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if (!req.body.arrivalAirportId) {
        ErrorResponse.message = "Something went wrong while creating flight";   
        ErrorResponse.error = new AppError(
            ["Arrival Airport ID is required"],
            StatusCodes.BAD_REQUEST 
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if (!req.body.departureTime) {
        ErrorResponse.message = "Something went wrong while creating flight";   
        ErrorResponse.error = new AppError(
            ["Departure time is required"],
            StatusCodes.BAD_REQUEST 
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if (!req.body.arrivalTime) {
        ErrorResponse.message = "Something went wrong while creating flight";   
        ErrorResponse.error = new AppError(
            ["Arrival time is required"],
            StatusCodes.BAD_REQUEST 
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if (!req.body.price) {
        ErrorResponse.message = "Something went wrong while creating flight";   
        ErrorResponse.error = new AppError(
            ["Price is required"],
            StatusCodes.BAD_REQUEST 
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if (!req.body.totalSeats) {
        ErrorResponse.message = "Something went wrong while creating flight";   
        ErrorResponse.error = new AppError(
            ["Total seats is required"],
            StatusCodes.BAD_REQUEST 
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }



    next();
}

module.exports = {
    validateCreateRequest,
};