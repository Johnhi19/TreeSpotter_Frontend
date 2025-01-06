import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@Component({
  selector: 'app-trees',
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './trees.component.html',
  styleUrl: './trees.component.scss'
})
export class TreesComponent {
  tree = {};

  constructor(private http: HttpClient) {}
  

  fetchData(): void {
    this.http.get(`/api/trees/1`).subscribe((data) => { this.tree = data; });
  }
}
