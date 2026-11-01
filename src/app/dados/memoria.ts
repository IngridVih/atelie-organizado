/**
 * Implementação em memória dos Repositórios para testes e Modo Demonstração inicial.
 */
import { Repositorio } from './repositorio';

export class RepositorioMemoria<T extends { id: string }> implements Repositorio<T> {
  private itens: Map<string, T> = new Map();

  constructor(dadosIniciais: T[] = []) {
    for (const item of dadosIniciais) {
      this.itens.set(item.id, { ...item });
    }
  }

  async obterTodos(): Promise<T[]> {
    return Array.from(this.itens.values()).map(item => ({ ...item }));
  }

  async obterPorId(id: string): Promise<T | null> {
    const item = this.itens.get(id);
    return item ? { ...item } : null;
  }

  async salvar(item: T): Promise<void> {
    this.itens.set(item.id, { ...item });
  }

  async excluir(id: string): Promise<void> {
    this.itens.delete(id);
  }
}