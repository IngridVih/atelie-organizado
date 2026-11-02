import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const usuario = localStorage.getItem('atelie_usuario');

  if (usuario) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};