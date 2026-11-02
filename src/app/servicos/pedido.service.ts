import { Injectable, signal } from '@angular/core';
import { Pedido, SituacaoPedido } from '../dominio/modelos';
import { TransicaoSituacaoInvalidaError } from '../dominio/modelos';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  pedidos = signal<Pedido[]>([
    {
      id: 'p1',
      donoId: 'demo-user',
      clienteId: 'Cliente Exemplo',
      pecaId: 'Bolsa Fio de Malha',
      cor: 'Vinho / Bege',
      medidas: '30x25cm',
      prazoEntrega: new Date('2026-11-15'),
      precoCalculado: 140.0,
      situacao: 'em_producao',
      baixaEstoqueFeita: false,
      criadoEm: new Date(),
      atualizadoEm: new Date()
    }
  ]);

  adicionarPedido(novo: Partial<Pedido>): void {
    const pedidoCompleto: Pedido = {
      id: Date.now().toString(),
      donoId: 'demo-user',
      clienteId: novo.clienteId || 'Cliente Geral',
      pecaId: novo.pecaId || 'Peça Padrão',
      cor: novo.cor || '',
      medidas: novo.medidas,
      prazoEntrega: novo.prazoEntrega ? new Date(novo.prazoEntrega) : new Date(),
      precoCalculado: novo.precoCalculado || 0,
      situacao: 'aguardando',
      baixaEstoqueFeita: false,
      criadoEm: new Date(),
      atualizadoEm: new Date(),
      ...novo
    };
    
    this.pedidos.update(lista => [pedidoCompleto, ...lista]);
  }

avancarSituacao(pedido: Pedido): SituacaoPedido {
  if (pedido.situacao === 'aguardando') {
    return 'em_producao';
  } else if (pedido.situacao === 'em_producao') {
    return 'entregue';
  }

throw new TransicaoSituacaoInvalidaError('aguardando', 'entregue');}
}