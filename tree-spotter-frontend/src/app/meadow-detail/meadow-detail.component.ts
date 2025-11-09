import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Meadow } from '../models/meadow';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Tree } from '../models/tree';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-meadow-detail',
  imports: [CommonModule],
  templateUrl: './meadow-detail.component.html',
  styleUrl: './meadow-detail.component.scss'
})
export class MeadowDetailComponent {
  meadowId: number | null = null;
  meadow: Meadow | null = null;
  cells: Tree[][] | null = null;
  treesOfMeadow: Tree[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.meadowId = idParam ? Number(idParam) : null;

    if (this.meadowId) {
      forkJoin({
        meadow: this.apiService.getMeadowById(this.meadowId),
        trees: this.apiService.getTreesOfMeadow(this.meadowId)
      }).subscribe(({ meadow, trees }) => {
        this.meadow = meadow;
        this.treesOfMeadow = trees;

        this.cells = Array(this.meadow?.size[0])
          .fill(null)
          .map(() => Array(this.meadow?.size[1]).fill(null));

        this.treesOfMeadow.forEach((tree) => {
          if (tree.position.x !== undefined && tree.position.y !== undefined) {
            this.cells![tree.position.x][tree.position.y] = tree;
          }
        });
      });
    }
  }

  onTreeClick(id: number) {
    this.router.navigate([`/trees/${id}`]);
  }

  navigateToAddTree(row: number, col: number) {
    this.router.navigate(['/add-tree', this.meadowId], {
      queryParams: { row: row, col: col }
    });
  }
}
