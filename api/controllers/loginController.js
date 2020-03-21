'use strict'

const db = require('../config');
const md5 = require('md5');

exports.post = async(req, res, next) => {



var email = req.body.email;

var senha = md5(req.body.senha);

if(email !== '' && senha !== '')

db.executaQuery(`SELECT COUNT(*) AS cont FROM usuarios WHERE email='${email}' AND senhaMD5= '${senha}'` ,res);

}

