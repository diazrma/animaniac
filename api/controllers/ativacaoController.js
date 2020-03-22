'use strict'

const conexao = require('../config');
const dotenv = require('dotenv');

dotenv.config();

exports.post = async (req, res, next) => {

    let key_auth = req.body.key_auth;

    let data = key_auth;
    let buff = new Buffer.from(data, 'base64');
    let ativador = buff.toString('ascii');


    ativador = ativador.split('-');


    if (ativador[1] == process.env.key_auth) {


        conexao.query(`UPDATE usuarios SET status='1' WHERE email= '${ativador[0]}'`, function (error, results, fields) {
            if (error) {
                res.status(400).send(error);

            }
            else {
                let count = results.affectedRows;
                if (count == 1) {
                    res.status(200).send({ verificacao: 1 });
                } else {

                    res.status(200).send({ verificacao: 0 });
                }

            }
        });



    }

}

