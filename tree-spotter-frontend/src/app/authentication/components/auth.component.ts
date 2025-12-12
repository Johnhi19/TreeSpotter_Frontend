import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { AuthService } from '../authService';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private apiService: ApiService, private authService: AuthService, private router: Router) {}

  onSubmit(){
    this.apiService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        console.log('Login successful', response);
        this.authService.setToken(response.token);
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        console.error('Error during login', error);
        if (error.status === 401) {
          this.errorMessage = "Unauthorized: Please check your credentials.";
        } else {
          this.errorMessage = "An error occurred during login. Please try again.";
        }
      }
    });
  }

  onRegister(){
    this.router.navigate(['/register']);
  }

}
