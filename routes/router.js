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
const authController = require('./../controllers/authController.js')
const suggestioncontroller = require('./../controllers/suggestions.js')
const warnsController = require('./../controllers/warns.js');
const { runInNewContext } = require('vm');

router.get('/login', authController.login);

router.post('/avisos/criar', isAuthenticated, checkPermissions('admin'), (req, res) => {
    warnsController.createWarn(req, res);
});

router.post('/sugestao', suggestioncontroller.createSuggestions)

router.post('/cadastro', isAuthenticated, checkPermissions('admin'), (req, res) => {
    authController.register(req, res);
});

router.get('/avisos/ver', isAuthenticated, (req, res) => {
    warnsController.getWarns(req, res); // Certifique-se de invocar a função corretamente
});

router.route('/avisos/modificar')
    .get(isAuthenticated, (req, res) => {
        warnsController.modWarns(req, res);
    })
    .put(isAuthenticated, (req, res) => {
        warnsController.modWarns(req, res); // Chama a função para criar um novo aviso
    });


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
