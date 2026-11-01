/**
 * Guarda de rota para proteger páginas autenticadas do Ateliê Organizado.
 */
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../dados/auth';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.usuarioAtual()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};