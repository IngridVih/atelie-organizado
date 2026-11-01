/**
 * Interface genérica de Repositório desacoplada para persistência de dados.
 */
import { InjectionToken } from '@angular/core';

export interface Repositorio<T> {
  obterTodos(): Promise<T[]>;
  obterPorId(id: string): Promise<T | null>;
  salvar(item: T): Promise<void>;
  excluir(id: string): Promise<void>;
}

export const REPOSITORIO_CLIENTES = new InjectionToken<Repositorio<any>>('REPOSITORIO_CLIENTES');
export const REPOSITORIO_MATERIAIS = new InjectionToken<Repositorio<any>>('REPOSITORIO_MATERIAIS');
export const REPOSITORIO_PECAS = new InjectionToken<Repositorio<any>>('REPOSITORIO_PECAS');
export const REPOSITORIO_PEDIDOS = new InjectionToken<Repositorio<any>>('REPOSITORIO_PEDIDOS');