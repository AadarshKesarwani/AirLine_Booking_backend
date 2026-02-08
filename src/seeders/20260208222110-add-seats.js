"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("Seats", [
      {
        airplaneId: 6,
        col: "A",
        row: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 6,
        col: "B",
        row: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 6,
        col: "C",
        row: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 6,
        col: "D",
        row: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 6,
        col: "E",
        row: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 6,
        col: "F",
        row: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },




      {
        airplaneId: 6,
        col: "A",
        row: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 6,
        col: "B",
        row: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 6,
        col: "C",
        row: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 6,
        col: "D",
        row: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 6,
        col: "E",
        row: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 6,
        col: "F",
        row: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
