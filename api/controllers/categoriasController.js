'use strict'

const db = require('../config');

exports.get = async(req, res, next) => {

db.executaQuery('SELECT * FROM usuarios',res);

}

