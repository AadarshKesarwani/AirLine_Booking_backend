const CrudRepository = require("./crud-repository");

const {Flight,Airplane,Airport} = require("../models");

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

    
}

module.exports = FlightRepository;