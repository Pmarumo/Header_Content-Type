const Sequelize = require('sequelize');
const instanciadb = require('../../db');

const colums = {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    }, 

    email: {
        type: Sequelize.STRING,
        allowNull: false
    },

    senha: {
        type: Sequelize.STRING,
        allowNull: false
    }
}
//opcionais
const sequelizeOptions = {
    freezeTableName: true,
    tableName: "usuario",
    timestamps: true, 
    createdAt: "data_criacao",
    updatedAt: "data_atualizacao"
};

module.exports = instanciadb.define('usuario', colums, sequelizeOptions);
