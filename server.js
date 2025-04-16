// Importando o módulo do express
const express = require('express');
const sequelize = require('./config/sequelize.js');
const router = require('./routes/router.js');
const cors = require('cors')
const session = require('express-session');
const dotenv = require('dotenv').config(); 
const { SESSION_TOKEN } = process.env;

// require('dotenv').config();

// Testando a conexão com o banco de dados
sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados bem-sucedida.');

        // Listando todas as tabelas do banco de dados
        return sequelize.query('SHOW TABLES');
    })
    .then(([result, metadata]) => {
        console.log('Tabelas no banco de dados:');
        console.log(result);

        // Iniciando o servidor
        /*app.listen(3000, () => {
            console.log('Servidor Express iniciado na porta 3000');
        }); */
    })
    .catch(err => {
        console.error('Falha ao conectar ao banco de dados:', err);
    });

// Criando uma instância do express
const app = express();

app.use(session({
    secret: SESSION_TOKEN, // Substitua por uma chave secreta forte
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 24 * 60 * 60 * 1000, // O cookie vai expirar em 1 dia (em milissegundos)
        httpOnly: true, // Impede o acesso ao cookie via JavaScript no cliente
        secure: process.env.NODE_ENV === 'production', // Somente envia cookies via HTTPS em produção
    } // O cookie vai expirar em 1 dia
}));

// // Middleware para lidar com erros
// app.use(function (err, req, res, next) {
//     if (err instanceof multer.MulterError) {
//         return res.status(400).send(`Erro no upload do arquivo: ${err.message}`);
//     } else if (err) {
//         return res.status(400).send(`Erro: ${err.message}`);
//     }
//     next();
// });

app.use(cors())

// Definindo o middleware para aceitar dados no formato JSON
app.use(express.json());
app.use(router);

// Definindo a porta em que o servidor irá ouvir
const PORT = process.env.PORT || 3000;

// Iniciando o servidor e ouvindo a porta especificada

app.listen(PORT, () => {
    console.log(`Servidor Express iniciado!\x1b[36;5;4mhttp://localhost:${PORT}\x1b[0m`);
});