const express = require('express');

const router = express.Router();

const { CityController } = require('../../controllers');

const { cityMiddlewares } = require('../../middlewares');



router.post('/', cityMiddlewares.validateCreateRequest, CityController.createCity);






module.exports = router;