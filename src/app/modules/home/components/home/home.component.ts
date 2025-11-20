import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { take } from 'rxjs';
import { IAuthRequest, ISignUpRequest } from 'src/app/models/interfaces/user.interface';
import { UserService } from 'src/app/modules/users/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  loginCard = true;

  roleOptions = [
    { label: 'Usuário', value: 'USER' },
    { label: 'Administrador', value: 'ADMIN' },
    { label: 'Gerente', value: 'MANAGER' }
  ];


  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  signUpForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['USER', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,
    private messageService: MessageService
  ) { }

  // ============================================
  // LOGIN
  // ============================================

  onSubmitLoginForm(): void {
    if (!this.loginForm.valid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Por favor, preencha todos os campos corretamente.',
        life: 3000
      });
      return;
    }

    const credentials: IAuthRequest = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!
    };

    this.authenticateUser(credentials)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          if (response.authenticated && response.user) {
            this.cookieService.set('AUTH_TOKEN', response.token!);

            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: `Bem-vindo(a), ${response.user.name}!`,
              life: 3000
            });
            this.loginForm.reset();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Email ou senha incorretos!',
              life: 3000
            });
          }
        },
        error: (error) => {
          console.error('Erro ao autenticar:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: error.status === 401 ? 'Email ou senha incorretos!' : 'Erro ao fazer login.',
            life: 3000
          });
        }
      });
  }

  private authenticateUser(credentials: IAuthRequest) {
    return this.userService.authenticate(credentials);
  }

  // ============================================
  // SIGNUP
  // ============================================

  onSubmitSignUpForm(): void {
    if (!this.signUpForm.valid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Por favor, preencha todos os campos corretamente.',
        life: 3000
      });
      return;
    }

    const userData: ISignUpRequest = this.signUpForm.value as ISignUpRequest;
    this.createNewUser(userData);
  }

  private createNewUser(userData: ISignUpRequest): void {
    this.userService.signUp(userData)
      .pipe(take(1))
      .subscribe({
        next: (user) => {
          console.log('Usuário criado:', user);
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Conta criada com sucesso! Faça login para continuar.',
            life: 3000
          });
          this.loginCard = true;
          this.signUpForm.reset({ role: 'USER' } as any);
        },
        error: (error) => {
          console.error('Erro ao criar usuário:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: error.error?.message || 'Erro ao criar conta.',
            life: 3000
          });
        }
      });
  }
}
