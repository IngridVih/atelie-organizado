/**
 * Implementação de Repositório baseada em LocalStorage do navegador para persistência local do PWA.
 */
import { Repositorio } from './repositorio';

export class RepositorioLocalStorage<T extends { id: string }> implements Repositorio<T> {
  constructor(private chaveStorage: string) {}

  private lerStorage(): T[] {
    const dados = localStorage.getItem(this.chaveStorage);
    if (!dados) return [];
    try {
      return JSON.parse(dados);
    } catch {
      return [];
    }
  }

  private gravarStorage(itens: T[]): void {
    localStorage.setItem(this.chaveStorage, JSON.stringify(itens));
  }

  async obterTodos(): Promise<T[]> {
    return this.lerStorage();
  }

  async obterPorId(id: string): Promise<T | null> {
    const itens = this.lerStorage();
    return itens.find(i => i.id === id) || null;
  }

  async salvar(item: T): Promise<void> {
    const itens = this.lerStorage();
    const index = itens.findIndex(i => i.id === item.id);
    if (index >= 0) {
      itens[index] = { ...item };
    } else {
      itens.push({ ...item });
    }
    this.gravarStorage(itens);
  }

  async excluir(id: string): Promise<void> {
    let itens = this.lerStorage();
    itens = itens.filter(i => i.id !== id);
    this.gravarStorage(itens);
  }
}