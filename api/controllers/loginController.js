'use strict'

const conexao = require('../config');
const md5 = require('md5');

exports.post = async (req, res, next) => {

    let email = req.body.email;

    let senha = md5(req.body.senha);

    if (email !== '' && senha !== '')

        conexao.query(`SELECT COUNT(*) AS count FROM usuarios WHERE email='${email}' AND senhaMD5= '${senha}'`, function (error, results, fields) {
            if (error) {
                res.status(400).send(error);

            }
            else {

                let count = results[0]['count'];

                if (count == 1) {
                    res.status(200).send({ verificacao: 1 });
                } else {

                    res.status(200).send({ verificacao: 0 });

                }
            }

        });


}

