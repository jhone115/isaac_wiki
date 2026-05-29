import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './AuthService';

export const authGuard: CanActivateFn = (_route, state) => {

  const auth = inject(AuthService);
  const router = inject(Router);

  // si existe token -> permitir
  if (localStorage.getItem('token')) {
    return true;
  }

  // si no -> redirigir login
  return router.createUrlTree(
    ['/login'],
    {
      queryParams: {
        redirect: state.url
      }
    }
  );
};