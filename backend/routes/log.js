const express = require('express');
const router = express.Router();

const logController = require('../controllers/log.js');
const {authorize} = require('../middleware');

router.get('/:id', authorize, logController.getLogs);
router.get("/fcp/:id", authorize, logController.getFcpLogs);
router.get('/uptime/day/:id', authorize, logController.getDailyUptime);
router.get('/uptime/month/:id',authorize, logController.getMonthLogs);

router.delete('/:id', authorize, logController.deleteLog);

module.exports = router;