const express = require('express');
//chamar a rota dos agendamentos. não vamos usar CONSIGN
const routesAgendamento = require('../api'); //rotas de agendamento, não precisa informar /index.js, automaticamente ele já pega o arquivo index
const FormatoValido = require('../shared/Serializar').FormatoValido; //.FormatoValido vou ter dentro somente o arquivo de interesse.
const SerializarErro = require('../shared/Serializar').SerializarErro; // verificar se tá certo 

module.exports = () => {
    const app = express();

    app.use((req, resp, next) => {
        let formatoSolicitado = req.header('Accept'); // se eu não informar o accept ele traz um padrão.
        if(formatoSolicitado === '*/*') { // '*/*' passa qualquer coisa, abaixo forçar a passar o que eu quero!
            formatoSolicitado = 'application/json';
        }
        //verificar se o item existe dentro do array, se não existir retorna um erro:
        if(FormatoValido.indexOf(formatoSolicitado) === -1) { 
            resp.status(406);
            resp.end();
            return
        }
        // setar o header da resposta
        resp.setHeader('Content-Type', formatoSolicitado);
        next() //próxima função midleware 

    });

    app.use(express.json());
    app.use('/api', routesAgendamento); //cria um caminho e dentro desse caminho joga a minha rota Agendamento

    app.use((error, req, resp, next) => {
        let status = 500;

        serializarErro = new SerializarErro(
            resp.getHeader('Content-Type')
        );

        if(error instanceof NaoEncontrado) {
            status = 404;
        };

        if(error instanceof CampoInvalido || error instanceof CampoQtdeMaxima || error instanceof CampoQtdeMinina) {
            status = 400;
        };

        if(error instanceof FormatoInvalido) {
            status = 406;
        };

        resp.status(status).send(
            serializarErro.transformar({
                id: error.idErro, 
                mensagem: error.message
            })
        );

    })

    return app
}