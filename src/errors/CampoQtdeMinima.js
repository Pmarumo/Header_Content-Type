class CampoQtdeMinima extends Error {
    constructor(campo) {
        const mensagem = `O campo ${campo} não possui a quantidade mínima de 8 caracteres`;
        super(mensagem);
        this.name = 'CampoQtdeMininma';
        this.idError = 3;
    }
}

module.exports = CampoQtdeMinima;