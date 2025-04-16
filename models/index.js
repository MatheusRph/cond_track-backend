const sequelize = require('../config/sequelize.js'); // Importando a conexão com o banco
const { DataTypes } = require('sequelize');

// Importando os modelos
const User = require('./users.js')(sequelize, DataTypes);
const Suggestion = require('./suggestions.js')(sequelize, DataTypes);
const Aviso = require('./warns.js')(sequelize, DataTypes);
const Entrega = require('./entregas.js')(sequelize, DataTypes);

// 🔗 Definição das associações
User.hasMany(Suggestion, { foreignKey: 'ramal_id', as: 'suggestions' });
Suggestion.belongsTo(User, { foreignKey: 'ramal_id', as: 'user' });

User.hasMany(Aviso, { foreignKey: 'ramal_id', as: 'avisos' });
Aviso.belongsTo(User, { foreignKey: 'ramal_id', as: 'user' });

User.hasMany(Entrega, { foreignKey: 'ramal_id', as: 'entregas' });
Entrega.belongsTo(User, { foreignKey: 'ramal_id', as: 'user' });

// Exportando os modelos
module.exports = { User, Suggestion, Aviso, Entrega };
