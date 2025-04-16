// Importação do modelo de usuário e das funções de criptografia
const { User } = require('../models/index.js');
const { sendRecoveryEmail } = require('../api/mailer.js');
const crypto = require('crypto');
const { encrypting } = require('../utils/encrypt.js');

/**
 * Gera um token de recuperação de senha para o usuário.
 * 
 * @param {Object} req - Requisição HTTP.
 * @param {Object} res - Resposta HTTP.
 */

// await sendRecoveryEmail(user.email, user.ramal, gencode, res);

exports.genToken = async (req, res) => {
    try {

        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                response: 'O campo e-mail é obrigatório'
            });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({
                success: false,
                response: 'Usuário não encontrado'
            });
        }

        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setMinutes(now.getMinutes() + 10);

        await User.update({ password_reset_token: token, token_expires_at: now }, { where: { id: user.id } });

        await sendRecoveryEmail(user.email, user.ramal, token, res);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            response: 'Erro interno do servidor'
        });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { token, email, password } = req.body; // Código digitado pelo profissional

        if (!token || !email || !password) {
            return res.status(400).json({
                success: false,
                response: 'Informe todos os campos'
            });
        }

        const user = await User.findOne({ where: { email } });

        if (token !== user.password_reset_token) {
            return res.status(400).json({
                success: false,
                response: 'Token inválido'
            });
        }

        const now = new Date();

        if (now > user.token_expires_at) {
            return res.status(400).json({
                success: false,
                response: 'Token expirado'
            });
        }

        const hashedPassword = await encrypting(password);

        await user.update({
            password: hashedPassword,
            password_reset_token: null,
            token_expires_at: null
        });

        return res.status(200).json({
            success: true,
            response: 'Senha redefinida com sucesso'
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            response: 'Erro interno do servidor'
        });
    }
}