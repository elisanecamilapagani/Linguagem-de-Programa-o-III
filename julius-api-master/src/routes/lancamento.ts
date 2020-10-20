import { UsuarioController } from './../controller/UsuarioController';
import { LancamentoController } from './../controller/LancamentoController';
import { Router } from 'express';
import { Lancamento } from '../entity/Lancamento';
import { resolve } from 'url';

export const routerLancamento = Router();
const lancamentoCtrl = new LancamentoController();
const usuarioCtrl = new UsuarioController();

/**
 * Serviço para salvar um novo lançamento
 */
routerLancamento.post('/', async (req, res) => {
    const { idUsuario, valor, descricao, data } = req.body;
    const usuario = await usuarioCtrl.recuperarPorId(idUsuario);
    if (usuario) {
        const lancamento = new Lancamento(valor, descricao, data, usuario);
        const lancamentoSalvo = await lancamentoCtrl.salvar(lancamento);
        res.json(lancamentoSalvo);
    } else {
        res.status(404).json({ mensagem: 'Usuário do lançamento não encontrado' });
    }
});


/**
 * Serviço para excluir um determinado lançamento
 */
routerLancamento.delete('/:id', async (req, res) => {
    const excluirLancamento = parseInt(req.params.id);
    const lancamento = await lancamentoCtrl. ExcluirLancamentoPorId(excluirLancamento);
    if(lancamento){
        res.status(500).json({mensagem: 'Lançamento excluido'})
    }else{
        res.status(404).json({ mensagem: 'Lançamento não encontrado' });
    }
});

/**
 * Serviço para alterar um lançamento
 */
routerLancamento.put('/:id', async(req, res) => {
    const alterarLancamento = parseInt(req.params.id);
    const { valor, descricao, data, idUsuario } = req.body;
    const usuario = await usuarioCtrl.recuperarPorId(idUsuario);
    const lancamento =  new Lancamento(valor, descricao, data, usuario);
    lancamento.id = alterarLancamento 
    await lancamentoCtrl.AlterarLancamentoPorId(alterarLancamento, lancamento);
    if(lancamento){
        res.status(200).json({ mensagem: 'Lançamento atualizado' });
    }else{
        res.status(404).json({ mensagem: 'Lançamento não encontrado' });
    }
});







