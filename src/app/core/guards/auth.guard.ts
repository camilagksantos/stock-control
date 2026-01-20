import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';

export const authGuard = () => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  const messageService = inject(MessageService);

  const token = cookieService.get('AUTH_TOKEN');

  if (token) {
    return true;
  }

  messageService.add({
    severity: 'warn',
    summary: 'Acesso Negado',
    detail: 'Por favor, faça login para acessar esta página.',
    life: 3000
  });
  
  router.navigate(['/home']);
  return false;
};
