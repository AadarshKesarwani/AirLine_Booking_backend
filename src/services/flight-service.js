const { StatusCodes } = require("http-status-codes");
const { FlightRepository}= require("../repositories");
const AppError = require("../utils/errors/app-error");
const { Op } = require("sequelize");

const { isAfter  } = require("../utils/helpers/datetime-helpers");




const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
  // Invalid case: departure > arrival
        if (isAfter(data.departureTime, data.arrivalTime)) {
            throw new AppError(
                "departure time cannot be greater than arrival time",
                StatusCodes.BAD_REQUEST
            );
        }

        const flight = await flightRepository.create(data);
        return flight;

    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            const explanation = error.errors.map(err => err.message);
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }

        throw new AppError(
            "Something went wrong while creating flight",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function getAllFlights(query) {
   let customFilter = {};
   const endingTripdate="23:59:59";
   let sortFilters = [];

     //trips=MUM-DEL
     //departureAirportId = MUM
     //arrivalAirportId = DEL    code hai id nhi
   if(query.trips){
       
        [departureAirportId, arrivalAirportId] = query.trips.split("-");
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;

        //TODO :check if both airports are valid
   }



   //price=4000-5000 or price=4000
   if(query.price){
        if(query.price.includes("-")){
            const [minPrice, maxPrice] = query.price.split("-");
            customFilter.price = {
                [Op.between]: [minPrice, maxPrice]
            }
        } else {
            const minPrice = query.price;
            const maxPrice = 20000; // Default max price
            customFilter.price = {
                [Op.between]: [minPrice, maxPrice]
            };
        }
   }

   //totalSeats refers to number of seats available in flight
   if(query.travellers){
        const travellers = query.travellers;
        customFilter.totalSeats = {
            [Op.gte]: travellers
        };
   }
//tripDate=2023-12-25
   if(query.tripDate){
        const tripDate = query.tripDate;
        customFilter.departureTime = {
            [Op.between]: [tripDate + " 00:00:00", tripDate + " " + endingTripdate]
        };
   
    }

    //i also want to add functionality order by price or departure time in asc or desc order
    //sort=price_ASC,sortBy=departureTime_DESC
    if(query.sort){
        const params = query.sort.split(",");
        sortFilters = params.map(param => {
            const [field, order] = param.split("_");
            return [field, order];
        });
    }


    console.log(customFilter);
   try {
        const flights = await flightRepository.getAllFlights(customFilter, sortFilters);
        return flights;
   } catch (error) {
        throw new AppError(
            "Cannot fetch data of flights",
            StatusCodes.INTERNAL_SERVER_ERROR,
        );
   }
}



async function getFlight(id){
    try {
        const flight = await flightRepository.get(id);
        return flight;
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            const explanation = error.errors.map(err => err.message);
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        if(error.StatusCode === StatusCodes.NOT_FOUND){
            throw new AppError(
                "The flight you requested is not found",
                StatusCodes.NOT_FOUND
            );
        }
        throw new AppError(
            "Cannot fetch data of flight",
            StatusCodes.INTERNAL_SERVER_ERROR,
        );
    }
} 


module.exports = {
    createFlight,
    getAllFlights,  
    getFlight 
};