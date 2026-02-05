'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {

    static associate(models) {
      // Each Airport belongs to one City
      Airport.belongsTo(models.City, {
        foreignKey: 'cityId',
        as: 'city',
        
      });

      // An Airport can have many departing Flights
      Airport.hasMany(models.Flight, {
        foreignKey: 'departureAirportId',
        as: 'departingFlights',
        onDelete: 'CASCADE',
      });

      // An Airport can have many arriving Flights
      Airport.hasMany(models.Flight, {
        foreignKey: 'arrivalAirportId',
        as: 'arrivingFlights',
        onDelete: 'CASCADE',
      });
    }

  }

  Airport.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    address: {
      type: DataTypes.STRING,
      unique: true
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Airport',
  });

  return Airport;
};
