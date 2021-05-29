const configExpress = require("./config/configExpress");
const config = require('config');
const instanciadb = require("./db");
//abaixo, função anônima assícrona com promise - arrow function
// precisa executar a função

(async () => {
    try {
        await instanciadb.sync()   // force: true = força a criação da tabela, excluindo a tabela e criando de novo...NÃO É INTERESSANTE TER ELE AQUI  

        app = configExpress()
        app.listen(config.get('api.port'), () => { 
            console.log('Servidor rodando!')
        });         
    } catch (error) {
        throw error;
    };
  
})();


