'use strict'

const mysql = require('mysql2');

//** Realiza a conexão com o banco de dados */
exports.executaQuery = (sqlQry, res) => {
  const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'animaniac',
    password:''
  });

  conexao.query(sqlQry, function(error, results, fields){
      if(error) 
        res.json(error);
      else
        res.json(results);
        conexao.end();
      console.log('Query executada com sucesso!');
  });
}
