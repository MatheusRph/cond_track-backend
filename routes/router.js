// routes/router.js
// Neste arquivo estão definidas todas as rotas do projeto.
// Em projetos com muitas rotas, é possível dividir as rotas em vários arquivos.

// Importações de módulos
const express = require('express');
const router = express.Router();
const path = require('path');
const isAuthenticated = require('../middleware/authMiddleware.js');
const checkPermissions = require('../middleware/checkPermissionsMiddleware.js')

// Importando controllers
// const usuarioController = require('../controllers/usuario');
const authController = require('../controllers/authController.js')
const suggestioncontroller = require('../controllers/suggestions.js')
const warnsController = require('../controllers/warns.js');
const recoveryController = require('../controllers/passwordRecoveryController.js')
const entregasController = require('../controllers/entrega.js')
const { runInNewContext } = require('vm');

//Gerar um código para uma url e quando ok, redirecionar para a url de acordo se o código existir

//Ver as sugestões 

router.post('/login', authController.login);

router.post('/avisos/criar', isAuthenticated, checkPermissions('admin'), (req, res) => {
    warnsController.createWarn(req, res);
});

router.post('/sugestao/criar', isAuthenticated, (req, res) => {
    suggestioncontroller.createSuggestions(req, res);
});

router.get('/sugestao/ver', isAuthenticated, (req, res) => {
    suggestioncontroller.getSuggestions(req, res);
});

router.post('/cadastro', isAuthenticated, checkPermissions('admin'), (req, res) => {
    authController.register(req, res);
});

router.get('/avisos/ver', isAuthenticated, (req, res) => {
    warnsController.getWarns(req, res); // Certifique-se de invocar a função corretamente
});

router.get('/entregas/ver', isAuthenticated, (req, res) => {
    entregasController.getEntregas(req, res);
});

router.post('/entregas/criar', isAuthenticated, checkPermissions('admin'), (req, res) => {
    entregasController.registerEntrega(req, res)
});

router.post('/forgot_password', recoveryController.genToken);

router.post('/reset_password', recoveryController.resetPassword);





router.route('/avisos/modificar')
    .get(isAuthenticated, (req, res) => {
        warnsController.modWarns(req, res);
    })
    .put(isAuthenticated, (req, res) => {
        warnsController.modWarns(req, res); // Chama a função para criar um novo aviso
    });


router.route('/')

// Rota para servir a página HTML de upload
// router.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../index.html'));
// });

// INSERIR OUTRAS ROTAS -->
/* router.get('/turmas', turmasController.getAll)
router.get('/turmas/:id', turmasCOntroller.getById) */

/* router.get('/turmas', turmasCOntroller.getAll)
router.get('/turmas/:id', turmasCOntroller.getById) */

/* router.get('/usuario', usuarioController.listarUsuarios) */

module.exports = router;
