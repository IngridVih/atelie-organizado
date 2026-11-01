/**
 * Componente de Login com suporte ao modo demonstração e segurança anti-enumeração.
 */
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../dados/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main class="login-container" role="main">
      <div class="login-card">
        <h1>Ateliê Organizado</h1>
        <p class="subtitle">Gestão inteligente para sua arte em crochê</p>

        @if (modoDemo) {
          <div class="demo-banner" role="status">
            <span>⚠ Modo demonstração ativo</span>
          </div>
        }

        <form (submit)="entrar($event)">
          <div class="form-group">
            <label for="email">E-mail</label>
            <input 
              id="email" 
              type="email" 
              [(ngModel)]="email" 
              name="email" 
              required 
              placeholder="seu&#64;email.com"
              aria-label="E-mail"
            />
          </div>

          <div class="form-group">
            <label for="senha">Senha</label>
            <input 
              id="senha" 
              type="password" 
              [(ngModel)]="senha" 
              name="senha" 
              required 
              placeholder="••••••••"
              aria-label="Senha"
            />
          </div>

          @if (erroMensagem()) {
            <div class="error-msg" role="alert">
              {{ erroMensagem() }}
            </div>
          }

          <button type="submit" class="btn-primary">Entrar</button>
          
          <button type="button" class="btn-secondary" (click)="entrarDemo()">
            Acessar Modo Demonstração
          </button>
        </form>
      </div>
    </main>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #FBF6EF;
      padding: 1rem;
    }
    .login-card {
      background: #ffffff;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(43, 35, 32, 0.1);
      width: 100%;
      max-width: 400px;
      border-top: 6px solid #8F3B27;
    }
    h1 {
      color: #2B2320;
      font-size: 1.75rem;
      margin-bottom: 0.5rem;
      text-align: center;
    }
    .subtitle {
      color: #6c757d;
      font-size: 0.9rem;
      text-align: center;
      margin-bottom: 1.5rem;
    }
    .demo-banner {
      background-color: #fff3cd;
      color: #856404;
      padding: 0.75rem;
      border-radius: 6px;
      font-size: 0.85rem;
      text-align: center;
      margin-bottom: 1rem;
      font-weight: 600;
    }
    .form-group {
      margin-bottom: 1.25rem;
    }
    label {
      display: block;
      color: #2B2320;
      font-weight: 600;
      margin-bottom: 0.5rem;
      font-size: 0.95rem;
    }
    input {
      width: 100%;
      padding: 0.75rem;
      font-size: 1rem;
      border: 1px solid #ced4da;
      border-radius: 6px;
      box-sizing: border-box;
    }
    input:focus {
      outline: 2px solid #8F3B27;
    }
    .error-msg {
      background-color: #f8d7da;
      color: #721c24;
      padding: 0.75rem;
      border-radius: 6px;
      font-size: 0.9rem;
      margin-bottom: 1rem;
      text-align: center;
    }
    button {
      width: 100%;
      padding: 0.85rem;
      font-size: 1rem;
      font-weight: bold;
      border-radius: 6px;
      cursor: pointer;
      border: none;
      min-height: 44px;
      margin-bottom: 0.75rem;
    }
    .btn-primary {
      background-color: #8F3B27;
      color: #ffffff;
    }
    .btn-primary:hover {
      background-color: #722e1e;
    }
    .btn-secondary {
      background-color: #e9ecef;
      color: #2B2320;
    }
    .btn-secondary:hover {
      background-color: #dde2e6;
    }
  `]
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  senha = '';
  erroMensagem = signal<string | null>(null);
  modoDemo = true;

  entrar(event: Event): void {
    event.preventDefault();
    // Mensagem de erro genérica padrão OWASP anti-enumeração
    this.erroMensagem.set('E-mail ou senha incorretos');
  }

  entrarDemo(): void {
    this.authService.fazerLoginDemo();
    this.router.navigate(['/inicio']);
  }
}