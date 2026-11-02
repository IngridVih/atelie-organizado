/**
 * Semeador de dados fictícios de demonstração para a artesã de Jardim Melvi, Praia Grande.
 */
import { Cliente, Material, Peca, Pedido } from '../dominio/modelos';

export function obterDadosDemo(): {
  clientes: Cliente[];
  materiais: Material[];
  pecas: Peca[];
  pedidos: Pedido[];
} {
  const donoId = 'demo-user-treiceele';
  const agora = new Date();
  const prazoFuturo = new Date();
  prazoFuturo.setDate(prazoFuturo.getDate() + 5);

  const clientes: Cliente[] = [
    {
      id: 'cli-1',
      donoId,
      nome: 'Juliana Costa',
      nomeNormalizado: 'juliana costa',
      telefone: '(13) 99888-7766',
      criadoEm: agora
    },
    {
      id: 'cli-2',
      donoId,
      nome: 'Camila Santos',
      nomeNormalizado: 'camila santos',
      telefone: '(13) 99777-6655',
      criadoEm: agora
    }
  ];

  const materiais: Material[] = [
    {
      id: 'mat-1',
      donoId,
      nome: 'Barbante Cru Nº 6',
      unidade: 'novelo',
      quantidade: 2,
      estoqueMinimo: 3, // Gatilho de alerta de saldo baixo
      precoCusto: 12.50,
      atualizadoEm: agora
    },
    {
      id: 'mat-2',
      donoId,
      nome: 'Linha Amigurumi Rosa',
      unidade: 'novelo',
      quantidade: 5,
      estoqueMinimo: 2,
      precoCusto: 10.00,
      atualizadoEm: agora
    }
  ];

  const pecas: Peca[] = [
    {
      id: 'pec-1',
      donoId,
      nome: 'Tapete Redondo Boho',
      horasEstimadas: 5,
      composicao: [
        { materialId: 'mat-1', quantidadeNecessaria: 2 },
        { materialId: 'mat-2', quantidadeNecessaria: 1 }
      ],
      criadaEm: agora
    }
  ];

  const pedidos: Pedido[] = [
    {
      id: 'ped-1',
      donoId,
      clienteId: 'cli-1',
      pecaId: 'pec-1',
      cor: 'Cru com detalhes em Rosa',
      medidas: 'Diâmetro 1,20m',
      prazoEntrega: prazoFuturo,
      precoCalculado: 100.00,
      situacao: 'aguardando',
      baixaEstoqueFeita: false,
      criadoEm: agora,
      atualizadoEm: agora
    }
  ];

  return { clientes, materiais, pecas, pedidos };
}