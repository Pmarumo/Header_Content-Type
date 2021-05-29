const Sequelize = require('sequelize');
const config = require('config');

const instancia = new Sequelize(
    config.get('mysql.database'), //objeto e minha tag é mysql e quero acessar
    config.get('mysql.user'), 
    config.get('mysql.password'), 
    {
        host: config.get('mysql.host'), //localhost
        port: config.get('mysql.port'),
        dialect: 'mysql'
    }

);

module.exports = instancia;

// por que 2 index?
// a partir de agora teremos vários...
// função: utilizado para auto-carregamento, pois é o arquivo principal da pasta