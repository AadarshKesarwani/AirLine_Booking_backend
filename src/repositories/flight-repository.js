const CrudRepository = require("./crud-repository");

const {Flight} = require("../models");

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getAllFlights(filter, sortFilters) {
        const flights = await Flight.findAll({
            where: filter,
            order: sortFilters
        });
        return flights;
    }

    
}

module.exports = FlightRepository;