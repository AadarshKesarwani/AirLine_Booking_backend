'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // 1 Flight belongs to 1 Airplane (by airplaneId -> Airplane.id)
      Flight.belongsTo(models.Airplane, {
        foreignKey: 'airplaneId',
        as: 'airplane',
      });

      // 1 Flight belongs to 1 Departure Airport (by code)
      Flight.belongsTo(models.Airport, {
        foreignKey: 'departureAirportId', // Flights table column
        targetKey: 'code',                // Airports table column
        as: 'departureAirport',
      });

      // 1 Flight belongs to 1 Arrival Airport (by code)
      Flight.belongsTo(models.Airport, {
        foreignKey: 'arrivalAirportId',   // Flights table column
        targetKey: 'code',                // Airports table column
        as: 'arrivalAirport',
      });
    }
  }

  Flight.init({
    flightNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    airplaneId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    departureAirportId: {
      type: DataTypes.STRING, // stores Airport.code (MUM, DEL)
      allowNull: false,
    },
    arrivalAirportId: {
      type: DataTypes.STRING, // stores Airport.code
      allowNull: false,
    },
    arrivalTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    departureTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    boardingGate: {
      type: DataTypes.STRING,
    },
    totalSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Flight',
  });

  return Flight;
};
