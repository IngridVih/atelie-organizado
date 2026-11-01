/**
 * Serviço de Autenticação abstrato e suporte ao Modo Demonstração (Demo).
 */
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuarioAtual = signal<{ uid: string; email: string; nome: string } | null>({
    uid: 'demo-user-treiceele',
    email: 'treiceele@atelie.demo',
    nome: 'Treiceele (Modo Demo)'
  });

  isModoDemo = signal<boolean>(true);

  fazerLoginDemo(): void {
    this.usuarioAtual.set({
      uid: 'demo-user-treiceele',
      email: 'treiceele@atelie.demo',
      nome: 'Treiceele (Modo Demo)'
    });
    this.isModoDemo.set(true);
  }

  fazerLogout(): void {
    this.usuarioAtual.set(null);
  }
}