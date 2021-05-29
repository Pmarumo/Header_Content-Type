const FormatoInvalido = require('../errors/FormatoInvalido');

class Serializar {
    json(dados) {
        return JSON.stringify(dados);
    }

    transformar(dados) { //criar método
        if(this.contentType !== 'application/json') { //consigo verificar se a minha aplicação esta com json
            throw new FormatoInvalido(this.contentType);
        }
        return this.json(dados);
    } 
}
//herança
class SerializarAgendamento extends Serializar {
    constructor(contentType) {
        super();
        this.contentType = contentType;
    };
};

class SerializarErro extends Serializar {
    constructor(contentType) {
        super();
        this.contentType = contentType;
        this.camposPermitidos = [
            'id', 'mensagem' 
        ]
    }
}

module.exports = {
    Serializar: Serializar,
    SerializarAgendamento: SerializarAgendamento,
    SerializarErro: SerializarErro,
    FormatoValido: ['application/json']
}