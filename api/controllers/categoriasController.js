'use strict'

const conexao = require('../config');

exports.get = async (req, res, next) => {

    conexao.query(`SELECT cod_categoria, nome ,icone, capa ,visualizacao FROM categorias`, function (error, results, fields) {
        if (error) {
            res.status(400).send(error);

        }
        else {




            res.status(200).send({ results });

        }

    });




}

