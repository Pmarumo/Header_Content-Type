//como se fosse o controller, possui os VERBOS. Vai passar os possíveis caminhos
const router = require('express').Router();
const servicoAgendamento = require('../services');

router.get('/agendamentos',
    servicoAgendamento.carregarTodosAgendamentos
);

router.get('/agendamentos/:id',
    servicoAgendamento.carregarAgendamento
);

router.post('/agendamentos', 
    servicoAgendamento.criarAgendamento
);
//put deu erro
router.put('agendamentos/:id',
    servicoAgendamento.alterarAgendamento
);

router.delete('/agendamentos/:id',
    servicoAgendamento.deletarAgendamento
);

module.exports = router