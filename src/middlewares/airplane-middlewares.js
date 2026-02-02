const { StatusCodes } = require("http-status-codes");
const {ErrorResponse} = require('../utils/common/');
const AppError = require("../utils/errors/app-error");


function validateCreateRequest(req, res, next) {
    const { modelNumber} = req.body;
    if (!modelNumber || typeof modelNumber !== 'string') {
        ErrorResponse.message="something went wrong while creating airplane";
        ErrorResponse.error=new AppError(["Model number is required and should be a string"],StatusCodes.BAD_REQUEST);
        
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}
 

module.exports = {
    validateCreateRequest
};

 