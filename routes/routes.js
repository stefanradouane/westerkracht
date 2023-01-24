// Express
const express = require('express');

const router = express.Router();

const controller = require('../controllers/controllers');

router.get('/', controller.control_index);

module.exports = router;