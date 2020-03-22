'use strict'

const conexao = require('../config');
const sendgrid = require('../services/emailService');
const dotenv = require('dotenv');
const md5 = require("md5");



dotenv.config();

let key_auth = process.env.key_auth;



const enviaEmail = (sendgrid, nome, email, key_auth) => {


  let data = email + '-' + key_auth;
  let buff = new Buffer(data);
  let base64data = buff.toString('base64');

  let ativador = base64data;

  sendgrid.send({
    to: email,
    from: 'animaniac.contact@gmail.com',
    subject: nome + ' Ative seu cadastro no Animaniac!',
    html: `
    <img src='https://i.ibb.co/Z68kXyJ/gundam-1.png' width="50">
    <h1>Ativação de cadastro no Animaniac!</h1> 
    Para ativar seu cadastro acesse o link abaixo:
    <p><a href='http://localhost:8080/ativacao/${ativador}'>Clique aqui para ativar seu cadastro</a></p>
    <b>Se você não é ${nome} por favor ignore este e-mail.</b>
    <p>
    Para mais informações entre em contato pelo nosso e-mail:
    animaniac.contact@gmail.com</p>
    `
  }, function (err) {
    if (err) {
      console.log(err);

    } else {
      console.log("Success.");

    }
  });
}
exports.post = async (req, res, next) => {


  let nome = req.body.nome;
  let email = req.body.email;
  let senha = req.body.senha;
  let senhaMD5 = md5(req.body.senha);


  if (email !== '' && senha !== '') {



    conexao.query(`INSERT INTO usuarios (nome, email, senha, senhaMD5)
  SELECT * FROM (SELECT '${nome}','${email}', '${senha}', '${senhaMD5}') AS tmp
  WHERE NOT EXISTS ( SELECT email FROM usuarios WHERE email = '${email}'
  ) LIMIT 1;`, function (error, results, fields) {
      if (error) {
        res.status(400).send(error);

      }
      else {


        let count = results.affectedRows;
        if (count == 1) {
          res.status(200).send({ verificacao: 1 });
          enviaEmail(sendgrid, nome, email, key_auth);
        } else {

          res.status(200).send({ verificacao: 0 });

        }

      }
    });



  }

}

