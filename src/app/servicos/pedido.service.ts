/**
 * Serviço de gerenciamento do ciclo de vida e transições de situação de pedidos.
 */
import { Injectable } from '@angular/core';
import { Pedido, SituacaoPedido, TransicaoSituacaoInvalidaError, BaixaEstoqueDuplicadaError } from '../dominio/modelos';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  
  avancarSituacao(pedido: Pedido): SituacaoPedido {
    if (pedido.situacao === 'aguardando') {
      return 'em_producao';
    } else if (pedido.situacao === 'em_producao') {
      return 'entregue';
    } else {
      throw new TransicaoSituacaoInvalidaError(pedido.situacao, 'entregue');
    }
  }

  validarTransicao(de: SituacaoPedido, para: SituacaoPedido): void {
    if (de === 'aguardando' && para === 'em_producao') return;
    if (de === 'em_producao' && para === 'entregue') return;
    if (de === para) return; // Permitir salvar na mesma situação
    throw new TransicaoSituacaoInvalidaError(de, para);
  }
}