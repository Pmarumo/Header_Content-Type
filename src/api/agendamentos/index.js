//como se fosse o controller, possui os VERBOS. Vai passar os possíveis caminhos
const router = require('express').Router();
const servicoAgendamento = require('../../services/agendamentos');
const passport = require('passport');

router.get('/agendamentos',
    passport.authenticate('bearer', {session: false}),
    servicoAgendamento.carregarTodosAgendamentos
);

router.get('/agendamentos/:id',
    //passport.authenticate('bearer', {session: false}),
    servicoAgendamento.carregarAgendamento
);

router.post('/agendamentos', 
    //passport.authenticate('bearer', {session: false}),
    servicoAgendamento.criarAgendamento
);
//put deu erro
router.put('agendamentos/:id',
    //passport.authenticate('bearer', {session: false}),
    servicoAgendamento.alterarAgendamento
);

router.delete('/agendamentos/:id',
    //passport.authenticate('bearer', {session: false}),
    servicoAgendamento.deletarAgendamento
);

module.exports = router;