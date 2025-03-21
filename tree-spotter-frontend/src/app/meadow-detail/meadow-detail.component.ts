import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { Meadow } from '../models/meadow';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-meadow-detail',
  imports: [CommonModule],
  templateUrl: './meadow-detail.component.html',
  styleUrl: './meadow-detail.component.scss'
})
export class MeadowDetailComponent {
  meadowId: number | null = null;
  meadow: Meadow | null = null;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.meadowId = idParam ? Number(idParam) : null;

    if (this.meadowId) {
      this.apiService.getMeadowById(this.meadowId).subscribe((data: Meadow) => {
        this.meadow = data;
      });
    }
  }
}
