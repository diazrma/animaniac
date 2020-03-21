'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/ativacaoController');

router.post('/', controller.post);

module.exports = router;