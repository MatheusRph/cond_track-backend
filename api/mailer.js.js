import SibApiV3Sdk from 'sib-api-v3-sdk';
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const { SENDINBLUE_API_TOKEN, SENDER_EMAIL, SENDER_NAME} = process.env;

// Configs da api do BREVO
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
 */

exports.sendRecoveryEmail = async (to, ramal, res) => {
    // Gera um código de recuperação aleatório
    const gencode = Math.floor(100000 + Math.random() * 900000);
    // Assina o código com um token JWT
    const code = jwt.sign({ gencode }, process.env.SECRET_KEY, { expiresIn: '10m' });

    // Configura o destinatário do e-mail
    sendSmtpEmail.to = [{ email: to, name: ramal }];
    // Configura o remetente do e-mail
    sendSmtpEmail.sender = { email: SENDER_EMAIL, name: SENDER_NAME };
    // Configura o assunto do e-mail
    sendSmtpEmail.subject = "Código de recuperação";
    // Configura o conteúdo do e-mail
    sendSmtpEmail.htmlContent = `<p>O código para recuperar sua senha é ${code}</p>`;

    try {
        // Envia o e-mail
        apiInstance.sendTransacEmail(sendSmtpEmail)
            .then(response => console.log("E-mail enviado:", response))
            .catch(error => console.error("Erro ao enviar:", error));
    } catch (error) {
        // Trata erros internos do servidor
        console.log('Erro interno do servidor:', error);
        // Retorna uma resposta de erro para o cliente
        res.status(500).send({ message: 'Erro interno do servidor' });
    }
};