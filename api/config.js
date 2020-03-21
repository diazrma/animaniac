'use strict'
const dotenv = require('dotenv');
const mysql = require('mysql2');

dotenv.config();

//** Realiza a conexão com o banco de dados */

const conexao = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD
});




exports.executaQuery = (sqlQry, res) => {


  conexao.query(sqlQry, function (error, results, fields) {
    if (error)
      res.json(error);
    else
      res.json(results);

    console.log('Query executada com sucesso!');
  });

}
