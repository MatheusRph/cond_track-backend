// Importação do modelo de usuário e das funções de criptografia
const { User } = require('../models/index.js');
const { verifyEncrypt, encrypting } = require('../utils/encrypt.js');

// Função de login do usuário
exports.login = async (req, res) => {
    try {
        // Verifica se o usuário já está logado
        if (req.session.user) {
            // Se o usuário já está logado, retorna uma resposta com sucesso falso
            return res.status(200).json({
                success: false,
                response: 'Ramal já está logado',
            });
        }

        // Obtém os dados de login do corpo da requisição
        const { ramal, password } = req.body;

        // Verifica se os campos de login estão preenchidos
        if (!ramal || !password) {
            // Se os campos não estão preenchidos, retorna uma resposta com sucesso falso
            return res.status(400).json({
                success: false,
                response: 'Todos os campos precisam estar preenchidos',
            });
        }

        // Busca o usuário no banco de dados
        const user = await User.findOne({ where: { ramal } });

        // Verifica se o usuário existe
        if (!user) {
            // Se o usuário não existe, retorna uma resposta com sucesso falso
            return res.status(401).json({
                success: false,
                response: 'Ramal ou senha incorretos',
            });
        }

        // Verifica se a senha está correta
        const passwordMatch = await verifyEncrypt(password, user.password);
        if (!passwordMatch) {
            // Se a senha não está correta, retorna uma resposta com sucesso falso
            return res.status(401).json({
                success: false,
                response: 'Ramal ou senha incorretos',
            });
        }

        // Armazena os dados do usuário na sessão
        req.session.user = {
            id: user.id,
            ramal: user.ramal,
        };

        // Retorna uma resposta com sucesso verdadeiro e os dados do usuário
        return res.status(200).json({
            success: true,
            response: 'Login bem-sucedido!',
            user: req.session.user,
        });
    } catch (err) {
        // Se ocorrer um erro, imprime o erro no console e retorna uma resposta com sucesso falso
        console.error(err);

        return res.status(500).json({
            success: false,
            response: 'Erro interno do servidor',
        });
    }
}

// Função de cadastro do usuário
exports.register = async (req, res) => {
    try {
        // Obtém os dados de cadastro do corpo da requisição
        const {
            ramal,
            email,
            password
        } = req.body;

        // Verifica se os campos de cadastro estão preenchidos
        if (!ramal || !email || !password) {
            // Se os campos não estão preenchidos, retorna uma resposta com sucesso falso
            return res.status(400).send('Todos os campos precisam estar preenchidos!');
        }

        // Busca o usuário no banco de dados
        const user = await User.findOne({
            where: {
                ramal: ramal
            }
        });

        if (await User.findOne({ where: { ramal: ramal } })) {
            return res.status(400).send('O email já está em uso!');
        }
        // Verifica se o usuário já existe
        if (user) {
            // Se o usuário já existe, retorna uma resposta com sucesso falso
            return res.status(409).send('O ramal já está cadastrado');
        } else {
            try {
                // Criptografa a senha
                const hashedPassword = await encrypting(password);

                // Armazena a senha criptografada no corpo da requisição
                req.body.password = hashedPassword;

                // Cadastra o usuário no banco de dados
                const register = await User.create(req.body);

                // Verifica se o cadastro foi bem-sucedido
                if (register) {
                    // Se o cadastro foi bem-sucedido, retorna uma resposta com sucesso verdadeiro
                    return res.status(201).send('Ramal cadastrado com sucesso.');
                }

                // Se o cadastro não foi bem-sucedido, retorna uma resposta com sucesso falso
                return res.status(500).json({
                    success: false,
                    response: 'Erro ao cadastrar ramal, tente novamente.'
                });
            } catch (err) {
                // Se ocorrer um erro, imprime o erro no console e retorna uma resposta com sucesso falso
                console.error('Erro ao criptografar a senha ou cadastrar ramal:', err);
                return res.status(500).json({
                    success: false,
                    response: 'Erro ao processar sua solicitação. Por favor, tente novamente.'
                });
            }
        }
    } catch (err) {
        // Se ocorrer um erro, imprime o erro no console e retorna uma resposta com sucesso falso
        console.error('Erro ao criptografar a senha ou cadastrar ramal:', err);
        return res.status(500).json({
            success: false,
            response: 'Erro ao processar sua solicitação. Por favor, tente novamente.'
        });
    }
}