const SibApiV3Sdk = require('sib-api-v3-sdk');
const dotenv = require('dotenv').config();
const { SENDINBLUE_API_TOKEN, SENDER_EMAIL, SENDER_NAME } = process.env;

// Configurações da API do Brevo
const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = SENDINBLUE_API_TOKEN;

// Instância da API de e-mails transacionais
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
// Objeto para enviar e-mails
const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

/**
 * Envia um e-mail de recuperação de senha.
 * 
 * @description Esta função é responsável por enviar um e-mail de recuperação de senha para o usuário.
 * @param {String} to - E-mail do destinatário
 * @param {String} ramal - Nome do destinatário
 * @param {String} code - Código de recuperação
 * @param {Object} res - Objeto de resposta do Express
 */
exports.sendRecoveryEmail = async (to, ramal, code, res) => {


    // Configura o destinatário do e-mail
    sendSmtpEmail.to = [{ email: to }];
    // Configura o remetente do e-mail
    sendSmtpEmail.sender = { email: SENDER_EMAIL, name: SENDER_NAME };
    // Configura o assunto do e-mail
    sendSmtpEmail.subject = "Código de recuperação";
    // Configura o conteúdo do e-mail
    sendSmtpEmail.htmlContent = `<p>O código para recuperar sua senha é ${code}</p>`;

    try {
        // Envia o e-mail e aguarda a resposta
        const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log("E-mail enviado:", response);
        // Resposta para o cliente indicando sucesso
        res.status(200).send({ message: 'E-mail de recuperação enviado com sucesso.' });
    } catch (error) {
        // Trata erros internos do servidor
        console.error('Erro ao enviar o e-mail:', error);
        // Retorna uma resposta de erro para o cliente
        res.status(500).send({ message: 'Erro interno ao enviar e-mail de recuperação.' });
    }
};
