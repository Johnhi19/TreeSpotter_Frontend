import { Component } from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Tree } from '../../models/tree';
import { ApiService } from '../../api.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-trees',
  imports: [RouterOutlet, CommonModule, MatDialogModule],
  templateUrl: './trees.component.html',
  styleUrl: './trees.component.scss'
})
export class TreesComponent {
  tree: Tree | null = null;
  treeId: number | null = null;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.treeId = idParam ? Number(idParam) : null;

    if (this.treeId){
      console.log(`Fetching data for tree ID: ${this.treeId}`);
      this.apiService.getTreeById(this.treeId).subscribe((data) => { this.tree = data; });
    }
  }

  goBackToMeadow() {
    if (this.tree?.meadowId) {
      this.router.navigate(['/meadow', this.tree.meadowId]);
    } else {
      this.router.navigate(['/']);
    }
  }

  deleteTree() {
    if (!this.treeId) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        title: 'Baum löschen',
        message: 'Möchten Sie diesen Baum wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.'
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.apiService.deleteTree(this.treeId!).subscribe({
          next: () => {
            console.log('Tree deleted successfully');
            this.goBackToMeadow();
          },
          error: (error) => {
            console.error('Error deleting tree:', error);
            alert('Fehler beim Löschen des Baums');
          }
        });
      }
    });
  }
}
