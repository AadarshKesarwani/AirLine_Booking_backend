const express= require('express');
const router= express.Router();
const {InfoController,}= require('../../controllers');



const AirplaneRoutes= require('./airplane-routes');
const CityRoutes= require('./city-routes');




router.get('/info', InfoController.info);

router.use('/airplanes', AirplaneRoutes);

router.use('/cities', CityRoutes);





module.exports= router;