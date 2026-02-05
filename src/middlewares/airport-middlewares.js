const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
  console.log(req.body, typeof req.body.cityId);

  if (!req.body.name || typeof req.body.name !== "string") {
    ErrorResponse.message = "Something went wrong while creating airport";
    ErrorResponse.error = new AppError(
      "Invalid request body: name is required and should be a string",
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }


  if (!req.body.code || typeof req.body.code !== "string") {
    ErrorResponse.message = "Something went wrong while creating airport";
    ErrorResponse.error = new AppError(
      "Invalid request body: code is required and should be a string",
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }



  if (!req.body.cityId || typeof req.body.cityId !== "string") {
    ErrorResponse.message = "Something went wrong while creating airport";
    ErrorResponse.error = new AppError(
      "Invalid request body: cityId is required and should be a string",
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }




  next();
}

module.exports = {
  validateCreateRequest,
}
