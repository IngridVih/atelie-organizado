import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main class="login-container" style="max-width: 450px; margin: 60px auto; font-family: sans-serif; padding: 0 20px;">
      <div style="background: white; padding: 32px; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.08); border-top: 5px solid #8F3B27;">
        <h2 style="color: #8F3B27; margin-top: 0; margin-bottom: 8px; font-size: 1.5rem; text-align: center;">Ateliê Organizado <span aria-hidden="true">🧶</span></h2>
        <p style="color: #6c757d; text-align: center; margin-bottom: 24px; font-size: 0.95rem;">Faça login para gerenciar o seu ateliê</p>

        @if (erroMensagem()) {
          <div style="background-color: #f8d7da; color: #721c24; padding: 12px; border-radius: 6px; margin-bottom: 20px; font-size: 0.95rem; font-weight: 500;" role="alert">
            {{ erroMensagem() }}
          </div>
        }

        <div style="margin-bottom: 16px;">
          <label style="display: block; font-weight: bold; margin-bottom: 6px; color: #2B2320; font-size: 1rem;">E-mail:</label>
          <input 
            type="email" 
            [(ngModel)]="email" 
            placeholder="seu-email@atelie.com" 
            style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-size: 1rem; min-height: 44px;" 
          />
        </div>

        <div style="margin-bottom: 24px;">
          <label style="display: block; font-weight: bold; margin-bottom: 6px; color: #2B2320; font-size: 1rem;">Senha:</label>
          <input 
            type="password" 
            [(ngModel)]="senha" 
            placeholder="********" 
            style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-size: 1rem; min-height: 44px;" 
          />
        </div>

        <button 
          (click)="fazerLogin()" 
          style="width: 100%; background: #8F3B27; color: white; border: none; padding: 12px; border-radius: 6px; font-weight: bold; cursor: pointer; min-height: 44px; font-size: 1rem; margin-bottom: 12px;">
          Entrar
        </button>

        <button 
          (click)="acessoDemonstracao()" 
          style="width: 100%; background: transparent; color: #8F3B27; border: 1px solid #8F3B27; padding: 12px; border-radius: 6px; font-weight: bold; cursor: pointer; min-height: 44px; font-size: 1rem;">
          Acessar Modo Demonstração
        </button>
      </div>
    </main>
  `
})
export class LoginComponent {
  private router = inject(Router);

  email = '';
  senha = '';
  erroMensagem = signal<string | null>(null);

  // Define as tuas credenciais de acesso aqui:
  private readonly EMAIL_VALIDO = 'vitoria@atelie.com';
  private readonly SENHA_VALIDA = 'atelie2026';

  fazerLogin(): void {
    if (!this.email.trim() || !this.senha.trim()) {
      this.erroMensagem.set('Preencha o e-mail e a senha');
      return;
    }

    if (this.email === this.EMAIL_VALIDO && this.senha === this.SENHA_VALIDA) {
      this.erroMensagem.set(null);
      this.router.navigate(['/pedidos']);
    } else {
      this.erroMensagem.set('E-mail ou senha incorretos');
    }
  }

  acessoDemonstracao(): void {
    this.router.navigate(['/pedidos']);
  }
}