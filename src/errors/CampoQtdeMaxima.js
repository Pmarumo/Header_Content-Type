class CampoQtdeMaxima extends Error {
    constructor(campo) {
        const mensagem = `O campo ${campo} ultrapassou a quantidade máxima de 60 caracteres`;
        super(mensagem);
        this.name = 'CampoQtdeMaxima';
        this.idError = 2;
    }
}

module.exports = CampoQtdeMaxima;