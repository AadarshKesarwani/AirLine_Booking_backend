const { StatusCodes } = require("http-status-codes");
const { CityRepository}= require("../repositories");
const AppError = require("../utils/errors/app-error");

const cityRepository = new CityRepository();

async function createCity(data) {
  try {
    const city = await cityRepository.create(data);
    return city;
  } catch (error) {
    if(error.name == "SequelizeUniqueConstraintError") {
      throw new AppError("City with this name already exists", StatusCodes.BAD_REQUEST);
    }
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Something went wrong while creating city",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}


module.exports = {
  createCity,
};