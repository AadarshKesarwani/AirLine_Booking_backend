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


    async updateRemainingSeats(flightId, seats, dec = 1) {
    const transaction = await db.sequelize.transaction();

        try {
            //  Row-level lockon the flight
            await db.sequelize.query(
            addRowLockOnFlights(flightId),
            { transaction }
            );

            const flight = await Flight.findByPk(flightId, { transaction },{logging: true});

            if (!flight) {
            throw new Error("Flight not found");
            }

            if (parseInt(dec)) {
            await flight.decrement(
                'totalSeats',
                { by: seats, transaction }
            );
            } else {
            await flight.increment(
                'totalSeats',
                { by: seats, transaction }
            );
            }

            await transaction.commit();
            return flight;

        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }


    
} 

module.exports = FlightRepository;