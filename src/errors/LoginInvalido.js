class LoginInvalido extends Error {
    constructor() {
        const mensagem = 'e-mail ou senha inválidos';
        super(mensagem);
        this.name = 'LoginInvalido';
        this.IidError = 7;

    };
};

module.exports = LoginInvalido;