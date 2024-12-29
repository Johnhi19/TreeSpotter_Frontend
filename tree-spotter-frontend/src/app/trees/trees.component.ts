import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trees',
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './trees.component.html',
  styleUrl: './trees.component.scss'
})
export class TreesComponent {
  // tree$: Observable<any> = new Observable();
  // constructor(private apiService: ApiService) {
  //   console.log('Reached Trees Component');
  //   // this.tree$ = this.apiService.getTreeById(1);
  //   // this.tree$.subscribe((data) => console.log('Fetched tree:', data));
  // }

  // ngOnInit(): void {
  //   this.tree$ = this.apiService.getTreeById(1);
  // }
}
