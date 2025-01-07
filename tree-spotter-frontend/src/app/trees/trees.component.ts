import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Tree } from '../models/tree';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-trees',
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './trees.component.html',
  styleUrl: './trees.component.scss'
})
export class TreesComponent {
  tree: Tree | null = null;

  constructor(private apiService: ApiService) {}
  

  fetchData(): void {
    this.apiService.getTreeById(1).subscribe((data) => { this.tree = data; });
  }
}
