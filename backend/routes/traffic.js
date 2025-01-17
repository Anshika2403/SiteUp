const express = require('express'); 
const router = express.Router();
const trafficController = require('../controllers/traffic');
const { authorize } = require('../middleware');

router.get("/:id",authorize ,trafficController.getTraffic);

module.exports = router;