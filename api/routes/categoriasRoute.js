'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoriasController');

router.get('/', controller.get);

module.exports = router;