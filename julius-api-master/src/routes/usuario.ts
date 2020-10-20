import { Lancamento } from './../entity/Lancamento';
import { Usuario } from './../entity/Usuario';
import { Router } from 'express';
import { UsuarioController } from '../controller/UsuarioController';

export const routerUsuario = Router();
const usuarioCtrl = new UsuarioController();

/**
 * Serviço pra salvar um novo usuário
 */
routerUsuario.post('/', async (req, res) => {
    const { nome, email } = req.body;
    const usuario = new Usuario(nome, email);
    const usuarioSalvo = await usuarioCtrl.salvar(usuario);
    res.json(usuarioSalvo);
});


/**
 * Serviço para recuperar todos os usuários
 */
routerUsuario.get('/', async (req, res) => {
    const usuarios = await usuarioCtrl.recuperarTodos();
    res.json(usuarios);
});

/**
 * Serviço para recuperar os lançamentos de um determinado usuário
 */
routerUsuario.get('/lancamento/:idUsuario', async (req, res) => {
    const idUsuario = parseInt(req.params.idUsuario);
    const lancamentos = await usuarioCtrl.recuperarLancamentosDoUsuario(idUsuario);
        res.json(lancamentos);      
});

/**
 * serviço para recuperar lançamento positivo de um determinado usuario
 */

 routerUsuario.get('/lancamento/entrada/:idUsuario', async (req, res) => {
    const idUsuario = parseInt(req.params.idUsuario);
    const valorPositivo= await usuarioCtrl.recuperarLancamentoPositivoDoUsuario(idUsuario);
        res.json(valorPositivo );
});

/**
 * serviço para recuperar lançamentos negativo de um usuário
 */

routerUsuario.get('/lancamento/saida/:idUsuario', async (req, res) => {
    const idUsuario = parseInt(req.params.idUsuario);
    const valorNegativo= await usuarioCtrl.recuperarLancamentoNegativoDoUsuario(idUsuario);
   res.json (valorNegativo)
});







