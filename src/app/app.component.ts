import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AvisoService } from './servicos/aviso.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <div style="background-color: #FBF6EF; min-height: 100vh; font-family: sans-serif;">
      
      <!-- Menu de Navegação Superior (Aparece apenas quando não está na tela de login) -->
      @if (mostrarMenu) {
        <header style="background: #8F3B27; padding: 12px 24px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h1 style="color: white; font-size: 1.2rem; margin: 0;">Ateliê Organizado 🧶</h1>
          <nav style="display: flex; gap: 16px; align-items: center;">
            <a routerLink="/pedidos" style="color: white; text-decoration: none; font-weight: bold; font-size: 0.95rem;">Pedidos</a>
            <a routerLink="/materiais" style="color: white; text-decoration: none; font-weight: bold; font-size: 0.95rem;">Materiais</a>
            <a routerLink="/preco" style="color: white; text-decoration: none; font-weight: bold; font-size: 0.95rem;">Calculadora</a>
            <a routerLink="/login" style="background: #722e1e; color: white; padding: 6px 12px; border-radius: 4px; text-decoration: none; font-size: 0.85rem;">Sair</a>
          </nav>
        </header>
      }

      <div style="padding: 20px;">
        <!-- Aviso Global -->
        @if (avisoService.mensagemAviso()) {
          <div style="background: #333; color: white; padding: 10px; margin-bottom: 15px; border-radius: 4px; max-width: 700px; margin-left: auto; margin-right: auto;">
            {{ avisoService.mensagemAviso() }}
          </div>
        }

        <!-- Onde as páginas aparecem -->
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class AppComponent {
  avisoService = inject(AvisoService);
  private router = inject(Router);
  mostrarMenu = false;

  constructor() {
    // Controla se o menu aparece com base na rota atual (esconde na tela de login)
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.mostrarMenu = !event.url.includes('/login') && event.url !== '/';
    });
  }
}