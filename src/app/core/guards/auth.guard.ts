import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard = () => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  const token = cookieService.get('AUTH_TOKEN');

  if (token) {
    return true;
  }

  router.navigate(['/home']);
  return false;
};
