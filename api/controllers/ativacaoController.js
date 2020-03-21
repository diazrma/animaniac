'use strict'

const config = require('../config');
const dotenv = require('dotenv');

dotenv.config();

exports.post = async (req, res, next) => {

    let key_auth = req.body.key_auth;

    let data = key_auth;
    let buff = new Buffer.from(data, 'base64');
    let ativador = buff.toString('ascii');


    ativador = ativador.split('-');
    

    if (ativador[1] == process.env.key_auth) {

        config.executaQuery(`UPDATE usuarios SET status='1' WHERE email= '${ativador[0]}'` , res);
        
     }

}

