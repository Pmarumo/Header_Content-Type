class CampoInvalido extends Error {
    constructor(campo) {
        const mensagem = `O campo ${campo} está inválido`
        super(mensagem);//como estamos usando herança, temos que avisar o pai qual a msg ele tem que explodir, mostrar
        this.name = 'CampoInválido';// para controlar os erros, criamos a classe
        this.idError = 1;
    }
}

module.exports = CampoInvalido;