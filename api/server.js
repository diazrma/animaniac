'use strict'
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();




//** Rotas */
const indexRoute = require('./routes/indexRoute');
const loginRoute = require('./routes/loginRoute');
const cadastroRoute = require('./routes/cadastroRoute');
const categoriasRoute = require('./routes/categoriasRoute');
const ativacaoRoute = require('./routes/ativacaoRoute');

dotenv.config();

app.use(bodyParser.json({
    limit: '5mb'
}));

app.use(bodyParser.urlencoded({
    extended: false
}));

//** Cors */
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    
    next();
});

app.use('/', indexRoute);
app.use('/cadastro', cadastroRoute);
app.use('/login', loginRoute);
app.use('/categorias', categoriasRoute);
app.use('/ativacao/', ativacaoRoute);

let port = process.env.PORT;

app.listen(port, () => {
    console.log("API rodando na porta "+ port);
   });

module.exports = app;
