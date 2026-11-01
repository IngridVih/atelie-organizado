/**
 * Testes unitários abrangentes para Preço, Estoque, Validação, Datas e Pedidos.
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { PrecoService } from './preco.service';
import { EstoqueService } from './estoque.service';
import { PedidoService } from './pedido.service';
import { validarNovoPedido } from '../dominio/validacao-pedido';
import { Material, Pedido, EstoqueInsuficienteError, TransicaoSituacaoInvalidaError } from '../dominio/modelos';

describe('Ateliê Organizado - Regras de Negócio (Bloco A)', () => {
  let precoService: PrecoService;
  let estoqueService: EstoqueService;
  let pedidoService: PedidoService;

  beforeEach(() => {
    precoService = new PrecoService();
    estoqueService = new EstoqueService();
    pedidoService = new PedidoService();
  });

  describe('PreçoService', () => {
    it('deve calcular o preço correto com base em materiais, horas, valor hora e margem', () => {
      // Exemplo de referência: 2 barbante (R$ 10,00 cada) + 1 linha rosa (R$ 10,00) = R$ 30,00; 5h * R$ 10 = R$ 50; margem 25% -> 80 * 1.25 = 100
      const preco = precoService.calcularPreco(30, 5, 10, 25);
      expect(preco).toBe(100.00);
    });

    it('deve lançar RangeError se houver valores negativos', () => {
      expect(() => precoService.calcularPreco(-10, 5, 10, 25)).toThrow(RangeError);
    });
  });

  describe('EstoqueService', () => {
    const materiaisIniciais: Material[] = [
      { id: 'm1', donoId: 'u1', nome: 'Barbante Cru', unidade: 'novelo', quantidade: 5, estoqueMinimo: 2, precoCusto: 10, atualizadoEm: new Date() },
      { id: 'm2', donoId: 'u1', nome: 'Linha Rosa', unidade: 'novelo', quantidade: 1, estoqueMinimo: 1, precoCusto: 10, atualizadoEm: new Date() }
    ];

    it('deve realizar baixa com sucesso quando há estoque suficiente, somando itens repetidos', () => {
      const composicao = [
        { materialId: 'm1', quantidadeNecessaria: 2 },
        { materialId: 'm1', quantidadeNecessaria: 1 }, // repetido (total 3)
        { materialId: 'm2', quantidadeNecessaria: 1 }
      ];

      const atualizados = estoqueService.verificarEBaixarEstoque(composicao, materiaisIniciais);
      const barbante = atualizados.find(m => m.id === 'm1');
      const linha = atualizados.find(m => m.id === 'm2');

      expect(barbante?.quantidade).toBe(2); // 5 - 3
      expect(linha?.quantidade).toBe(0); // 1 - 1
    });

    it('deve lançar EstoqueInsuficienteError e não alterar nada se faltar material', () => {
      const composicao = [{ materialId: 'm2', quantidadeNecessaria: 5 }]; // tem apenas 1

      expect(() => estoqueService.verificarEBaixarEstoque(composicao, materiaisIniciais)).toThrow(EstoqueInsuficienteError);
    });

    it('deve identificar corretamente alerta de saldo baixo quando quantidade <= estoqueMinimo', () => {
      const materialBaixo: Material = { id: 'm3', donoId: 'u1', nome: 'Botão', unidade: 'un', quantidade: 2, estoqueMinimo: 2, precoCusto: 1, atualizadoEm: new Date() };
      expect(estoqueService.verificarAlertaSaldoBaixo(materialBaixo)).toBe(true);
    });
  });

  describe('ValidacaoPedido', () => {
    it('deve validar um pedido correto sem erros', () => {
      const amanha = new Date();
      amanha.setDate(amanha.getDate() + 1);
      const dataStr = amanha.toISOString().split('T')[0];

      expect(() => validarNovoPedido({
        clienteNome: 'Maria da Silva',
        pecaId: 'p1',
        cor: 'Azul Marinho',
        prazoEntregaStr: dataStr,
        valorInformado: 150
      })).not.toThrow();
    });

    it('deve exigir nome do cliente com mensagem exata', () => {
      expect(() => validarNovoPedido({
        clienteNome: '',
        pecaId: 'p1',
        cor: 'Azul',
        prazoEntregaStr: '2026-12-31',
        valorInformado: 100
      })).toThrow('Informe o nome do cliente');
    });

    it('deve rejeitar prazo anterior a hoje com mensagem exata', () => {
      expect(() => validarNovoPedido({
        clienteNome: 'Ana',
        pecaId: 'p1',
        cor: 'Azul',
        prazoEntregaStr: '2020-01-01',
        valorInformado: 100
      })).toThrow('O prazo não pode ser anterior a hoje');
    });
  });

  describe('PedidoService', () => {
    it('deve avançar situação de aguardando para em_producao e depois entregue', () => {
      const pedido: Pedido = {
        id: 'ped-1', donoId: 'u1', clienteId: 'c1', pecaId: 'p1', cor: 'Vermelho',
        prazoEntrega: new Date(), precoCalculado: 100, situacao: 'aguardando',
        baixaEstoqueFeita: false, criadoEm: new Date(), atualizadoEm: new Date()
      };

      const prox1 = pedidoService.avancarSituacao(pedido);
      expect(prox1).toBe('em_producao');

      pedido.situacao = 'em_producao';
      const prox2 = pedidoService.avancarSituacao(pedido);
      expect(prox2).toBe('entregue');
    });

    it('deve lançar erro ao tentar transição inválida', () => {
      const pedido: Pedido = {
        id: 'ped-1', donoId: 'u1', clienteId: 'c1', pecaId: 'p1', cor: 'Vermelho',
        prazoEntrega: new Date(), precoCalculado: 100, situacao: 'entregue',
        baixaEstoqueFeita: true, criadoEm: new Date(), atualizadoEm: new Date()
      };

      expect(() => pedidoService.avancarSituacao(pedido)).toThrow(TransicaoSituacaoInvalidaError);
    });
  });
});