import { describe, it, expect } from 'vitest';
import { validarNovoPedido } from '../dominio/validacao-pedido';
import { PedidoService } from './pedido.service';
import { Pedido } from '../dominio/modelos';

describe('Ateliê Organizado - Testes de Borda e Validações', () => {
  const pedidoService = new PedidoService();

  describe('validarNovoPedido - Mensagens e Limites Exatos', () => {
    const dataFutura = '2026-12-31';

    it('deve exigir nome do cliente com a mensagem exata', () => {
      expect(() => validarNovoPedido({
        clienteNome: '',
        pecaId: 'p1',
        cor: 'Azul',
        prazoEntregaStr: dataFutura,
        valorInformado: 100
      })).toThrow('Informe o nome do cliente');
    });

    it('deve exigir a peça com a mensagem exata', () => {
      expect(() => validarNovoPedido({
        clienteNome: 'Maria',
        pecaId: '',
        cor: 'Azul',
        prazoEntregaStr: dataFutura,
        valorInformado: 100
      })).toThrow('Escolha a peça');
    });

    it('deve exigir a cor com a mensagem exata', () => {
      expect(() => validarNovoPedido({
        clienteNome: 'Maria',
        pecaId: 'p1',
        cor: '',
        prazoEntregaStr: dataFutura,
        valorInformado: 100
      })).toThrow('Informe a cor');
    });

    it('deve rejeitar prazo anterior a hoje', () => {
      expect(() => validarNovoPedido({
        clienteNome: 'Maria',
        pecaId: 'p1',
        cor: 'Azul',
        prazoEntregaStr: '2020-01-01',
        valorInformado: 100
      })).toThrow('O prazo não pode ser anterior a hoje');
    });

    it('deve rejeitar valor informado menor ou igual a zero', () => {
      expect(() => validarNovoPedido({
        clienteNome: 'Maria',
        pecaId: 'p1',
        cor: 'Azul',
        prazoEntregaStr: dataFutura,
        valorInformado: 0
      })).toThrow('Informe um valor maior que zero');
    });
  });

  describe('PedidoService - Transições Inválidas', () => {
    it('deve lançar erro ao tentar avançar um pedido já entregue', () => {
      const pedido: Pedido = {
        id: 'ped-99',
        donoId: 'u1',
        clienteId: 'c1',
        pecaId: 'p1',
        cor: 'Rosa',
        prazoEntrega: new Date(),
        precoCalculado: 100,
        situacao: 'entregue',
        baixaEstoqueFeita: true,
        criadoEm: new Date(),
        atualizadoEm: new Date()
      };

      expect(() => pedidoService.avancarSituacao(pedido)).toThrow();
    });
  });
});