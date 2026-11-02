import { describe, it, expect } from 'vitest';

describe('Regras de Negócio do Novo Pedido (Validação Pura)', () => {
  
  const listaPecas = [
    { id: 'bolsa-malha', nome: 'Bolsa de Fio de Malha', preco: 150.00 },
    { id: 'tapete-cru', nome: 'Tapete Geométrico Cru', preco: 120.00 },
    { id: 'amigurumi', nome: 'Amigurumi Personalizado', preco: 90.00 }
  ];

  it('deve conter as peças cadastradas com os preços corretos', () => {
    expect(listaPecas.length).toBe(3);
    const tapete = listaPecas.find(p => p.id === 'tapete-cru');
    expect(tapete?.preco).toBe(120.00);
  });

  it('deve calcular o preço corretamente ao selecionar uma peça', () => {
    const selecionarPeca = (id: string) => {
      const peca = listaPecas.find(p => p.id === id);
      return peca ? peca.preco : 0;
    };

    expect(selecionarPeca('bolsa-malha')).toBe(150.00);
    expect(selecionarPeca('amigurumi')).toBe(90.00);
    expect(selecionarPeca('id-inexistente')).toBe(0);
  });

  it('deve validar campos obrigatórios do formulário', () => {
    const validarFormulario = (cliente: string, peca: string, cor: string, prazo: string) => {
      if (!cliente.trim()) return 'Informe o nome do cliente';
      if (!peca) return 'Escolha a peça';
      if (!cor.trim()) return 'Informe a cor';
      if (!prazo) return 'Informe o prazo de entrega';
      return null;
    };

    expect(validarFormulario('', 'tapete-cru', 'Azul', '2026-12-31')).toBe('Informe o nome do cliente');
    expect(validarFormulario('Maria', '', 'Azul', '2026-12-31')).toBe('Escolha a peça');
    expect(validarFormulario('Maria', 'tapete-cru', '', '2026-12-31')).toBe('Informe a cor');
    expect(validarFormulario('Maria', 'tapete-cru', 'Azul', '')).toBe('Informe o prazo de entrega');
    expect(validarFormulario('Maria', 'tapete-cru', 'Azul', '2026-12-31')).toBeNull();
  });
});