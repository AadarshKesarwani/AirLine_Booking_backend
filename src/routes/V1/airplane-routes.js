const app=require('express');

const router= app.Router();

const {AirplaneController}= require('../../controllers');
const { airplaneMiddlewares }= require('../../middlewares');

router.post('/',
    airplaneMiddlewares.validateCreateRequest, 
    AirplaneController.createAirplane);

router.get('/',
    AirplaneController.getAirplanes);

router.get('/:id',
    AirplaneController.getAirplane);    

module.exports= router;