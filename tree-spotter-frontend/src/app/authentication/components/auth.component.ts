import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { AuthService } from '../authService';
import {TranslatePipe} from '@ngx-translate/core';


@Component({
  selector: 'app-auth',
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, TranslatePipe],
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
        this.errorMessage = error?.error?.code ?? 'Ein unerklärlicher Fehler ist aufgetreten.';
      }
    });
  }

  onRegister(){
    this.router.navigate(['/register']);
  }

}
