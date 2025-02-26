const { User, Suggestion } = require('../models');

exports.createSuggestions = async (req, res) => {
    // Verifica se o corpo da requisição contém a mensagem
    const { message } = req.body;

    // Verifica se a mensagem está vazia
    if (!message) {
        // Retorna erro 401 se a mensagem estiver vazia
        return res.status(401).json({
            success: false,
            response: "Informe a sugestão"
        })
    }

    // Busca o usuário no banco de dados
    const user = await User.findOne({ where: { id: req.session.user.id } });

    // Verifica se o usuário existe
    if (!user) {
        // Retorna erro 401 se o usuário não existir
        return res.status(401).json({
            success: false,
            response: "Deslogue e logue novamente"
        })
    }

    // Cria uma nova sugestão no banco de dados
    const suggestion = await Suggestion.create({ message, ramal_id: user.id });

    // Verifica se a sugestão foi criada com sucesso
    if (!suggestion) {
        // Retorna erro 500 se a sugestão não for criada
        return res.status(500).json({
            success: false,
            response: "Erro ao criar sugestão"
        })
    }

    // Retorna sucesso se a sugestão for criada
    return res.status(201).json({
        success: true,
        response: "Sugestão criada com sucesso"
    })
}

exports.getSuggestions = async (req, res) => {
    try {
        // Busca todas as sugestões no banco de dados
        const suggestions = await Suggestion.findAll();

        // Verifica se não há sugestões
        if (!suggestions || suggestions.length === 0) {
            return res.status(200).json({
                success: true,
                response: "Nenhuma sugestão encontrada"
            })
        }

        // Retorna as sugestões encontradas
        return res.status(200).json({
            success: true,
            response: suggestions
        })
    } catch (error) {
        // Registra o erro no console
        console.error(error);
        return res.status(500).json({
            success: false,
            response: "Erro interno do servidor"
        })
    }
}