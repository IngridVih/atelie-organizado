import { describe, it, expect, beforeEach } from 'vitest';
import { AuthService } from './auth';
import { RepositorioMemoria } from './memoria';
import { RepositorioLocalStorage } from './local-storage';

// Mock seguro do localStorage para o ambiente do Vitest (Node)
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value.toString(); },
    clear: () => { store = {}; },
    removeItem: (key: string) => { delete store[key]; }
  };
})();
Object.defineProperty(global, 'localStorage', { value: localStorageMock });

describe('Ateliê Organizado - Testes de Repositórios e Autenticação', () => {

  describe('AuthService (auth.ts)', () => {
    it('deve inicializar com o usuário demo e permitir login/logout', () => {
      const auth = new AuthService();
      expect(auth.usuarioAtual()).not.toBeNull();
      expect(auth.isModoDemo()).toBe(true);

      auth.fazerLogout();
      expect(auth.usuarioAtual()).toBeNull();

      auth.fazerLoginDemo();
      expect(auth.usuarioAtual()?.email).toBe('treiceele@atelie.demo');
    });
  });

  describe('Repositório em Memória (memoria.ts)', () => {
    let repo: RepositorioMemoria<{ id: string; nome: string }>;

    beforeEach(() => {
      repo = new RepositorioMemoria<{ id: string; nome: string }>([
        { id: '1', nome: 'Linha Inicial' }
      ]);
    });

    it('deve obter todos os itens, incluindo dados iniciais', async () => {
      const itens = await repo.obterTodos();
      expect(itens.length).toBe(1);
      expect(itens[0].nome).toBe('Linha Inicial');
    });

    it('deve salvar e obter por ID corretamente', async () => {
      const novoItem = { id: '2', nome: 'Barbante' };
      await repo.salvar(novoItem);

      const obtido = await repo.obterPorId('2');
      expect(obtido).toEqual(novoItem);
    });

    it('deve excluir um item pelo ID', async () => {
      await repo.excluir('1');
      const itens = await repo.obterTodos();
      expect(itens.length).toBe(0);
    });
  });

  describe('Repositório LocalStorage (local-storage.ts)', () => {
    let repoStorage: RepositorioLocalStorage<{ id: string; nome: string }>;
    const chaveTeste = 'test_itens_atelie';

    beforeEach(() => {
      localStorage.clear();
      repoStorage = new RepositorioLocalStorage(chaveTeste);
    });

    it('deve persistir, recuperar por ID e excluir dados no LocalStorage', async () => {
      const item = { id: '10', nome: 'Linha Rosa' };
      await repoStorage.salvar(item);

      const recuperado = await repoStorage.obterPorId('10');
      expect(recuperado).toEqual(item);

      const todos = await repoStorage.obterTodos();
      expect(todos.length).toBe(1);

      await repoStorage.excluir('10');
      const aposExclusao = await repoStorage.obterTodos();
      expect(aposExclusao.length).toBe(0);
    });
  });

});