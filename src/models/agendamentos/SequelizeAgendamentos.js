const TabelaAgendamento = require('./TabelaAgendamento'); //importei a tabela de agendamento
const NaoEncontrado = require('../../errors/NaoEncontrado');

// exportar um objeto >> criar várias funções
module.exports = {
    async listar() {
        try {
            return await TabelaAgendamento.findAll({
                raw: true
            }); 
        } catch (error) {
            throw error
        }   
    },

    async buscarPorPk(id){
        try {
            result = await TabelaAgendamento.findByPk(id);
            //forçar um erro:
            if(!result) {
                throw new NaoEncontrado('agendamento');
            }
            
            return result;
        } catch (error){
            throw error;
        }
    },

    async adicionar(agendamento) {
        try {
            result = await TabelaAgendamento.create(agendamento);
            return result;
        } catch (error) {
            throw error;
        }
    },

    async atualizar(id, dados) {
        try{
            result = await TabelaAgendamento.update(dados, 
                {
                    where: {
                        id:id
                    }
                });
            return result;
        } catch (error) {
            throw error;
        }
    },

    async remover(id) {
        try {
            result = await TabelaAgendamento.destroy({ //pega a instância do objeto criado 
                where: {
                    id:id
                }
            });
            return result;
        } catch (error) {
            throw error;
        }
    }
};
