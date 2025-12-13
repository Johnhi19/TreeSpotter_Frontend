import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Meadow } from '../../models/meadow';
import { CommonModule } from '@angular/common';
import { Tree } from '../../models/tree';
import { forkJoin } from 'rxjs';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-meadow-detail',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './meadow-detail.component.html',
  styleUrl: './meadow-detail.component.scss'
})
export class MeadowDetailComponent {
  meadowId: number | null = null;
  meadow: Meadow | null = null;
  cells: Tree[][] | null = null;
  treesOfMeadow: Tree[] = [];
  gridColumns: number = 0;
  gridRows: number = 0;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router, private dialog: MatDialog) {}

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

        this.gridRows = this.meadow?.size[0] || 0;
        this.gridColumns = this.meadow?.size[1] || 0;

        // Initialize empty grid
        this.cells = Array(this.gridRows)
          .fill(null)
          .map(() => Array(this.gridColumns).fill(null));

        // Populate grid with trees
        this.treesOfMeadow.forEach((tree) => {

          if (tree.position.x !== undefined && tree.position.y !== undefined) {

            console.log(`Placing tree with id ${tree.id} at position: (${tree.position.x}, ${tree.position.y})`);

            if (tree.position.x >= this.gridRows || tree.position.y >= this.gridColumns) {

              console.warn(`Tree position out of bounds: (${tree.position.x}, ${tree.position.y})`);
              return;

            }
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

  navigateToHome() {
    this.router.navigate(['/']);
  }

  deleteMeadow() {

    if (!this.meadowId) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        title: 'Wiese löschen',
        message: 'Möchten Sie diese Wiese mit allen Bäumen wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.'
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.apiService.deleteMeadow(this.meadowId!).subscribe({
          next: () => {
            console.log('Meadow deleted successfully');
            this.navigateToHome();
          },
          error: (error) => {
            console.error('Error deleting meadow:', error);
            alert('Fehler beim Löschen der Wiese');
          }
        });
      }
    });
  }
}
