const CrudRepository = require("./crud-repository");

const {Flight,Airplane,Airport} = require("../models");

const { Sequelize } = require("sequelize");

const db = require("../models");

const { addRowLockOnFlights } = require("./queries");

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getAllFlights(filter, sortFilters) {
        const flights = await Flight.findAll({
            where: filter,
            order: sortFilters,
            include: [
                {
                    model: Airplane,
                    as: "airplane",
                    required: true, // inner join to fetch only flights with valid airplane
                },
                {
                    model: Airport,
                    as: "departure_Airport",
                    required: true, // inner join to fetch only flights with valid departure airport
                },

                {
                    model: Airport,
                    as: "arrival_Airport",
                    required: true, // inner join to fetch only flights with valid arrival airport
                },
                
            ]
        });
        return flights;
    }


    async updateRemainingSeats(flightId, seats , dec = 1){
        await db.sequelize.query(addRowLockOnFlights(flightId));
        const flight = await Flight.findByPk(flightId);
        if(parseInt(dec)){
            await flight.decrement('totalSeats', { by: seats });
        } else {
            await flight.increment('totalSeats', { by: seats });
        }
        await flight.save();
        return flight;
    }

    
}

module.exports = FlightRepository;