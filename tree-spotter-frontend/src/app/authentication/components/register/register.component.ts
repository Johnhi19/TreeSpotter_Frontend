import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  email: string = '';
  errorMessage: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit(){
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'PASSWORD_MISMATCH';
      return;
    }

    const emailRegex = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");
    if (!this.email.match(emailRegex)) {
      this.errorMessage = 'VALID_EMAIL_REQUIRED';
      return;
    }

    this.apiService.register(this.username, this.password, this.email).subscribe({
      next: (response: any) => {
        console.log('Registration successful', response);
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        console.error('Error during registration', error);
        this.errorMessage = error?.error?.code ?? 'Ein unerklärlicher Fehler ist aufgetreten.';
      }
    });
  }

  onBackToLogin(){
    this.router.navigate(['/login']);
  }
}
