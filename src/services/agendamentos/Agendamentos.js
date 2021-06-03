// constructor e métodos para que possamos trabalhar.
const sequelizeAgendamento = require('../../models/agendamentos/SequelizeAgendamentos');
const moment = require('moment');
const CampoInvalido = require('../../errors/CampoInvalido');
const NaoEncontrado = require('../../errors/NaoEncontrado');
const DadosNaoInformados = require('../../errors/DadosNaoInformados');
const CampoQtdeMaxima = require('../../errors/CampoQtdeMaxima');
const CampoQtdeMinima = require('../../errors/CampoQtdeMinima');

class Agendamento {
    constructor({id, nome_cliente, nome_servico, status, data_agendamento, 
        data_criacao, data_atualizacao}) {
            this.id = id;
            this.nome_cliente = nome_cliente;
            this.nome_servico = nome_servico;
            this.status = status;
            this.data_agendamento = data_agendamento;
            this.data_criacao = data_criacao;
            this.data_atualizacao = data_atualizacao;
        };
        //DIFERENÇA ENTRE MÉTODO E FUNÇÃO funcao que pertence à uma classe, é um método.        
    async criar() {
        this.validar();
        const result = await sequelizeAgendamento.adicionar({
            nome_cliente: this.nome_cliente,
            nome_servico: this.nome_servico,
            status: this.status,
            data_agendamento: this.data_agendamento
        });
        this.id = result.id;
        this.data_criacao = result.data_criacao;
        this.data_atualizacao = result.data_atualizacao;        
    };
    //MÉTODO DE BUSCA
    async buscar() {
        const result = await sequelizeAgendamento.buscarPorPk(this.id);
        this.nome_cliente = result.nome_cliente;
        this.nome_servico = result.nome_servico;
        this.status = result.status;
        this.data_agendamento = result.data_agendamento;
        this.data_criacao = result.data_criacao;
        this.data_atualizacao = result.data_atualizacao;
    };

    async atualizar() {
        await sequelizeAgendamento.buscarPorPk(this.id);
        const camposAtualizaveis = ['nome_cliente', 'nome_servico', 'status', 'data_agendamento'];
        const dadosAtualizar = {};

        camposAtualizaveis.forEach((campo) => {
            const valor = this[campo];
            if( typeof valor === 'string' && valor.length > 0) {
                if(campo === 'senha') {
        //            dadosAtualizar[campo] = await this.gerarHash(valor);
                    return
                }
                dadosAtualizar[campo] = valor
            }
        });

        if(Object.keys(dadosAtualizar).length === 0) {
            throw new DadosNaoInformados();
        };

        await sequelizeAgendamento.atualizar(this.id, dadosAtualizar);
    }

    // FOR >> ESTRUTURA DE REPETIÇÃO
    // CRIAR VALIDAÇÕES CONFORME REGRA DE NEGÓCIO
        // PODEMOS CRIAR TODAS DENTRO DA FUNÇÃO VALIDAR
    validar() {
        const camposObrigatorios = ['nome_cliente', 'nome_servico', 'status', 'data_agendamento']
        const hoje = moment().format('YYYY-MM-DD');
        //percorrendo um array
        camposObrigatorios.forEach((campo) => {
            const valor = this[campo]; 
            if(typeof valor !== 'string' || valor.length === 0) {
                throw new CampoInvalido(campo);
            }

            if(campo == 'data_agendamento' && !moment(valor).isSameOrAfter(hoje)) { // !não é >= hoje
                throw new Error('Data Inválida'); //criar um erro para data inválida
            }

            if(valor.length > 60) {
                throw new CampoQtdeMaxima();
            }

            if(valor.length < 8 && (campo !== 'nome_cliente' && campo !== 'nome_servico')) {
                throw new CampoQtdeMinima();
            }
        })
    }

    async remover() {
        const result = await sequelizeAgendamento.remover(this.id);
        if(result == 0) {
            throw new NaoEncontrado('Agendamento inexistente');
        }
    }
};

module.exports = Agendamento;