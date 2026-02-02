const { StatusCodes } = require("http-status-codes");
const {AirplaneRepository} = require("../repositories");
const AppError = require("../utils/errors/app-error");


const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        if(error.name=="SequelizeValidationError"){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Something went wrong while creating airplane",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplanes(){
    try{
        const airplanes= await airplaneRepository.getAll();
        return airplanes;
    } catch(error){
        throw new AppError("Something went wrong while fetching all the airplanes",StatusCodes.INTERNAL_SERVER_ERROR);  
    }
}


async function getAirplane(id){
    try{
        const airplane= await airplaneRepository.get(id);
        return airplane;
    } catch(error){
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError("The airplane you are looking for is not found",StatusCodes.NOT_FOUND);  
        }
        throw new AppError("Something went wrong while fetching the airplane",StatusCodes.INTERNAL_SERVER_ERROR);  
    }
}




module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane
};