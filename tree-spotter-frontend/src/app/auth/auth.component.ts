import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  username: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit(){
    this.apiService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        console.log('Login successful', response);
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        console.error('Error during login', error);
      }
    });
  }

  onRegister(){
    this.router.navigate(['/register']);
  }

}
