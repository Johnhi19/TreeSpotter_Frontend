import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  errorMessage: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit(){
    this.apiService.register(this.username, this.password, this.email).subscribe({
      next: (response: any) => {
        console.log('Registration successful', response);
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        console.error('Error during registration', error);
        this.errorMessage = "An error occurred during registration. Please try again.";
      }
    });
  }

  onBackToLogin(){
    this.router.navigate(['/login']);
  }
}
