const express= require('express');

const router= express.Router();

const {InfoController,}= require('../../controllers');

const AirplaneRoutes= require('./airplane-routes');

router.get('/info', InfoController.info);

router.use('/airplanes', AirplaneRoutes);



module.exports= router;