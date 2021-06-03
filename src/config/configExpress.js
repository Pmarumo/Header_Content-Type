const express = require('express');
//chamar a rota dos agendamentos. não vamos usar CONSIGN
const routesAgendamento = require('../api/agendamentos'); //rotas de agendamento, não precisa informar /index.js, automaticamente ele já pega o arquivo index
const routesUsuario = require('../api/usuarios');
const routesLogin = require('../api/login');
const FormatoInvalido = require('../errors/FormatoInvalido');
const FormatoValido = require('../shared/Serializar').FormatoValido; //.FormatoValido vou ter dentro somente o arquivo de interesse.
const SerializarError = require('../shared/Serializar').SerializarErro; // verificar se tá certo 
const NaoEncontrado = require('../errors/NaoEncontrado');
const CampoInvalido = require('../errors/CampoInvalido');
//const CampoQtdeMaxima = require('../errors/CampoQtdeMaxima');
//const CampoQtdeMinina = require('../errors/CampoQtdeMinima');
const DadosNaoInformados = require('../errors/DadosNaoInformados');

const passport = require('./autenticacao');

module.exports = () => {
    const app = express()

    app.use((req, resp, next) => {
        let formatoSolicitado = req.header('Accept'); // se eu não informar o accept ele traz um padrão.
        if(formatoSolicitado === '*/*') { // '*/*' passa qualquer coisa, abaixo forçar a passar o que eu quero!
            formatoSolicitado = 'application/json'
        }
        //verificar se o item existe dentro do array, se não existir retorna um erro:
        if(FormatoValido.indexOf(formatoSolicitado) === -1) { 
            resp.status(406);
            //resp.end();
            return resp.send();
        }
        // setar o header da resposta
        resp.setHeader('Content-Type', formatoSolicitado);
        next(); //próxima função midleware 

    });

    app.use(express.json())
    app.use('/api', routesAgendamento); //cria um caminho e dentro desse caminho joga a minha rota Agendamento
    app.use('/api', routesUsuario);
    app.use('/api', routesLogin);

    app.use((error, req, resp, next) => {
        let status = 500;

        /*serializarErro = new SerializarErro(
            resp.getHeader('Content-Type')
        );*/

        if(error instanceof CampoInvalido || error instanceof DadosNaoInformados){
            status = 400;
        }

        if(error instanceof NaoEncontrado) {
            status = 404;
        };

        /*if(error instanceof CampoInvalido || error instanceof CampoQtdeMaxima || error instanceof CampoQtdeMinina) {
            status = 400;
        };*/

        if(error instanceof FormatoInvalido) {
            status = 406;
        };

        serializarErro = new SerializarError(
            resp.getHeader('Content-Type')
        )


        resp.status(status).send(
            serializarError.transformar({
                id: error.idError, 
                mensagem: error.message
            })
        );

    })

    return app
}