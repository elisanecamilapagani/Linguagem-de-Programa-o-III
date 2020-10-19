import { Lancamento } from './../entity/Lancamento';
import { getManager } from 'typeorm';

export class LancamentoController {

    async salvar(lancamento: Lancamento) {
        const lancamentoSalvo = await getManager().save(lancamento);
        return lancamentoSalvo;
    }

         /** excluir  lançamento por id */

         async ExcluirLancamentoPorId(id: number){
            const lancamento = await getManager().findOne(Lancamento, id);
            if(lancamento) {
                await getManager().delete(Lancamento,id);
                return lancamento
            }    
        }

     /** Alterar lançamento por id */
        async AlterarLancamentoPorId(id:number, lancamento: Lancamento) {
            const novoLancamento = await getManager().findOne(Lancamento,id);
            if(novoLancamento) {
                await getManager().save(lancamento);
                return novoLancamento;
            };
          
        }
}