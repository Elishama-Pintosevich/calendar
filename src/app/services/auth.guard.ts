import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from './data/localStorage.service';
export const authGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);
  const localStorage = inject(LocalStorageService)
  const router = inject(Router);

  if (authService.isLoggedIn() || localStorage.hasItem('bpn')) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
