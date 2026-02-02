const logger = require("../config/logger");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  //create record
  //data will be passed as parameter
  //it will return the created record
  async create(data) {
    const response = await this.model.create(data);
    return response;
  }

  //delete by id
  //it will return number of rows deleted
  //id will be passed as parameter
  //soft delete can also be implemented here
  async destroy(id) {
    const response = await this.model.destroy({
      where: {
        id: id,
      },
    });
    return response;
  }

  //find by primary key will always be id and will return only one record
  async get(data) {
    const response = await this.model.findByPk(data);
    return response;
  }

  //get all records
  // will return array of records
  async getAll() {
    const response = await this.model.findAll();
    return response;
  }

  //update record by id
  //first parameter is id and second parameter is data to be updated
  //it will return number of rows updated
  //data will be object, eg: {name: 'new name'}
  async update(id, data) {
    const response = await this.model.update(data, {
      where: {
        id: id,
      },
    });
    return response;
  }
}

module.exports = CrudRepository;
