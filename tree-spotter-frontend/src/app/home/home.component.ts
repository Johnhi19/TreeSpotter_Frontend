import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Meadow } from '../models/meadow';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  meadowList: Meadow[] | null = null;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(){
    this.apiService.getBasicMeadowInfo().subscribe((data) => { this.meadowList = data; });
  }

  navigateToMeadow(id: number) {
    this.router.navigate([`/meadow/${id}`]);
  }
}
