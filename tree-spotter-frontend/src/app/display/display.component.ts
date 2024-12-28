import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayComponent {
  response: any;

  constructor(private http: HttpClient) {}

  fetchData() {
    const apiUrl = 'http://localhost:8080/trees'; // Replace with your backend API
    this.http.get(apiUrl).subscribe({
      next: (data) => (this.response = data),
      error: (err) => console.error('Error fetching data:', err),
    });
  }
}
