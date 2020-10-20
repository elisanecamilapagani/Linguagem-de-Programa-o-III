import { Lancamento } from './../entity/Lancamento';
import { getManager, LessThan } from "typeorm";
import { Usuario } from "../entity/Usuario";
import { MoreThanOrEqual } from "typeorm";


export class UsuarioController {

    async salvar(usuario: Usuario) {
        const usuarioSalvo = await getManager().save(usuario);
        return usuarioSalvo;
    }

    async recuperarTodos() {
        const usuarios = await getManager().find(Usuario);
        return usuarios;
    }

    async recuperarPorId(id: number) {
        const usuario = await getManager().findOne(Usuario, id);
        return usuario;
    }

    async recuperarLancamentosDoUsuario(id: number) {
        const usuario = await getManager().findOne(Usuario, id, {
            relations: ['lancamentos']
        });
        return usuario.lancamentos;

    }

    /** recupera os lançamentos positivos de um usuário */
    async recuperarLancamentoPositivoDoUsuario(idUsuario: number) {
        const lancamentoPositivo = await getManager().find(Lancamento, {
            where: {
                usuario: idUsuario,
                valor: MoreThanOrEqual(0)
            }
        });
        return lancamentoPositivo;
    }


/** recupera os lançamentos negativo  de um usuário */
    async recuperarLancamentoNegativoDoUsuario(idUsuario: number) {
        const lancamentoNegativo = await getManager().find(Lancamento, {
            where: {
                usuario: idUsuario,
                valor: LessThan(0)
            }
        });
         return lancamentoNegativo;
    }

}
