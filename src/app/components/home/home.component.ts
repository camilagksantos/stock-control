import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  loginCard = true;
  
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  signUpForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  
  constructor(
    private formBuilder: FormBuilder
  ) { }

  onSubmitLoginForm() {
    if (this.loginForm.valid) {
      console.log('Login Data:', this.loginForm.value);
    }
  }

  onSubmitSignUpForm() {
    if (this.signUpForm.valid) {
      console.log('SignUp Data:', this.signUpForm.value);
    }
  }
}
