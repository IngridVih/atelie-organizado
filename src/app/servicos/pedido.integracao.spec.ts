import { describe, it, expect, beforeEach } from 'vitest';
import { PedidoService } from './pedido.service';
import { EstoqueService } from './estoque.service';
import { Material, Pedido, EstoqueInsuficienteError } from '../dominio/modelos';

describe('Ateliê Organizado - Teste de Integração (Fluxo de Pedidos e Estoque)', () => {
  let pedidoService: PedidoService;
  let estoqueService: EstoqueService;
  let materiais: Material[];

  beforeEach(() => {
    estoqueService = new EstoqueService();
    pedidoService = new PedidoService();
    
    materiais = [
      {
        id: 'm1',
        donoId: 'u1',
        nome: 'Fio de Malha',
        unidade: 'novelo',
        quantidade: 5,
        estoqueMinimo: 2,
        precoCusto: 20,
        atualizadoEm: new Date('2026-01-01')
      }
    ];
  });

  it('deve executar o ciclo completo do pedido: nasce aguardando, baixa estoque ao iniciar produção, dispara alerta no limite mínimo e conclui entrega', () => {
    // 1. Criar pedido (nasce "aguardando", estoque deve permanecer intacto em 5)
    const pedido: Pedido = {
      id: 'ped-100',
      donoId: 'u1',
      clienteId: 'Cliente Teste',
      pecaId: 'Bolsa',
      cor: 'Bordô',
      prazoEntrega: new Date('2026-12-31'),
      precoCalculado: 150,
      situacao: 'aguardando',
      baixaEstoqueFeita: false,
      criadoEm: new Date(),
      atualizadoEm: new Date()
    };

    pedidoService.adicionarPedido(pedido);
    expect(pedido.situacao).toBe('aguardando');
    expect(materiais[0].quantidade).toBe(5); // Estoque intacto

    // 2. Iniciar produção (realiza a baixa no estoque: 5 - 2 = 3)
    const composicao = [{ materialId: 'm1', quantidadeNecessaria: 2 }];
    const materiaisAtualizados = estoqueService.verificarEBaixarEstoque(composicao, materiais);
    pedido.situacao = pedidoService.avancarSituacao(pedido);
    pedido.baixaEstoqueFeita = true;

    expect(pedido.situacao).toBe('em_producao');
    expect(materiaisAtualizados[0].quantidade).toBe(3);

    // 3. Saldo atinge o mínimo (quantidade cai para 2, alerta deve disparar)
    materiaisAtualizados[0].quantidade = 2;
    const alerta = estoqueService.verificarAlertaSaldoBaixo(materiaisAtualizados[0]);
    expect(alerta).toBe(true); // 2 <= 2 dispara alerta

    // 4. Concluir entrega
    pedido.situacao = pedidoService.avancarSituacao(pedido);
    expect(pedido.situacao).toBe('entregue');
  });

  it('deve lançar EstoqueInsuficienteError e manter saldos intactos se faltar material', () => {
    const composicaoInsuficiente = [{ materialId: 'm1', quantidadeNecessaria: 10 }]; // tem apenas 5
    const quantidadeAnterior = materiais[0].quantidade;

    expect(() => {
      estoqueService.verificarEBaixarEstoque(composicaoInsuficiente, materiais);
    }).toThrow(EstoqueInsuficienteError);

    // Saldos intactos
    expect(materiais[0].quantidade).toBe(quantidadeAnterior);
  });
});