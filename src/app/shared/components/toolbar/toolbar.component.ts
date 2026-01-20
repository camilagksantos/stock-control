import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private messageService: MessageService
  ) { }

handleLogout() {
  this.cookieService.delete('AUTH_TOKEN');
  this.cookieService.delete('USER_INFO');

  this.messageService.add({
    severity: 'info',
    summary: 'Logout',
    detail: 'Você saiu com sucesso!',
    life: 3000
  });

  this.router.navigate(['/home']);
}

}
