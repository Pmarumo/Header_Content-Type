const { STRING } = require('sequelize');
const Sequelize = require('sequelize');
// instancia é a conexão
const instanciadb = require('../db'); //arquivo index carrega automaticamente
//criar objeto:
const colums = {
    nome_cliente: { //configuração do sequelize
        type: Sequelize.STRING,
        allowNull: false
    },
    nome_servico: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('agendado', 'cancelado'),
        allowNull: false
    },
    data_agendamento: {
        type: Sequelize.DATE,
        allowNull: false
    }
};

const sequelizeOptions = {
    //opções que o sequelize oferece
    freezeTableName: true, // sem esse campo lá no final em module.exports ele criaria mais um 's' em agendamentos
    tableName: 'agendamentos',
    timestamps: true,
    createdAt: 'data_criacao', // log
    updateAt: 'data_atualizacao'
}

module.exports = instanciadb.define('agendamentos', colums, sequelizeOptions);