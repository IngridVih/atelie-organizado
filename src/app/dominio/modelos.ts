/**
 * Modelos de dados e tipos fundamentais do domínio do Ateliê Organizado.
 * Define a estrutura de Clientes, Materiais, Peças, Pedidos e Erros de Domínio.
 */

export type SituacaoPedido = 'aguardando' | 'em_producao' | 'entregue';

export interface Cliente {
  id: string;
  donoId: string;
  nome: string;
  nomeNormalizado: string;
  telefone?: string;
  criadoEm: Date;
}

export interface Material {
  id: string;
  donoId: string;
  nome: string;
  unidade: string; // Ex: 'novelo', 'metro', 'kg'
  quantidade: number;
  estoqueMinimo: number;
  precoCusto: number; // Preço unitário em reais
  atualizadoEm: Date;
}

export interface ItemComposicaoPeca {
  materialId: string;
  quantidadeNecessaria: number;
}

export interface Peca {
  id: string;
  donoId: string;
  nome: string;
  horasEstimadas: number;
  composicao: ItemComposicaoPeca[];
  criadaEm: Date;
}

export interface Pedido {
  id: string;
  donoId: string;
  clienteId: string;
  pecaId: string;
  cor: string;
  medidas?: string;
  prazoEntrega: Date;
  precoCalculado: number;
  situacao: SituacaoPedido;
  baixaEstoqueFeita: boolean;
  criadoEm: Date;
  atualizadoEm: Date;
}

/**
 * Erros customizados de domínio para controle de regras de negócio.
 */
export class EstoqueInsuficienteError extends Error {
  constructor(public readonly materiaisFaltantes: Array<{ materialId: string; necessario: number; disponivel: number }>) {
    super('Estoque insuficiente para iniciar a produção do pedido.');
    this.name = 'EstoqueInsuficienteError';
  }
}

export class TransicaoSituacaoInvalidaError extends Error {
  constructor(de: SituacaoPedido, para: SituacaoPedido) {
    super(`Transição de situação inválida: não é permitido alterar de "${de}" para "${para}".`);
    this.name = 'TransicaoSituacaoInvalidaError';
  }
}

export class BaixaEstoqueDuplicadaError extends Error {
  constructor(pedidoId: string) {
    super(`A baixa de estoque para o pedido ${pedidoId} já foi realizada.`);
    this.name = 'BaixaEstoqueDuplicadaError';
  }
}