import { Component } from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Tree } from '../../models/tree';
import { ApiService } from '../../api.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog.component';
import { EditTreeFieldDialogComponent } from '../../dialogs/edit-tree-field-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TranslatePipe } from '@ngx-translate/core';
import { EditTreeDateDialogComponent } from '../../dialogs/edit-tree-date-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { EditTreePositionDialogComponent } from '../../dialogs/edit-tree-pos-dialog.component';

@Component({
  selector: 'app-trees',
  imports: [RouterOutlet, CommonModule, MatDialogModule, TranslatePipe],
  templateUrl: './trees.component.html',
  styleUrl: './trees.component.scss'
})
export class TreesComponent {
  tree: Tree | null = null;
  treeId: number | null = null;

  maxRow: number = 0;
  maxCol: number = 0;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router, private dialog: MatDialog, private translate: TranslateService) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.treeId = idParam ? Number(idParam) : null;

    this.maxCol = Number(this.route.snapshot.queryParamMap.get('maxCol')) || 0;
    this.maxRow = Number(this.route.snapshot.queryParamMap.get('maxRow')) || 0;

    if (this.treeId){
      console.log(`Fetching data for tree ID: ${this.treeId}`);
      this.apiService.getTreeById(this.treeId).subscribe((data) => { this.tree = data; });
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

  editField(label: string, field: string, currentValue: any) {
    const translatedLabel = this.translate.instant(label);

    let dialogRef;

    if (field === 'plantDate' && currentValue) {
      
      dialogRef = this.dialog.open(EditTreeDateDialogComponent, {
        data: {
          label: translatedLabel,
          value: structuredClone(currentValue) // avoid mutating original until save
        }
      });

    } else if (field === 'position') {

      dialogRef = this.dialog.open(EditTreePositionDialogComponent, {
        data: {
          label: translatedLabel,
          value: { x: currentValue.x + 1, y: currentValue.y + 1 },
          maxRow: this.maxRow,
          maxCol: this.maxCol
        }
      });
    
    } else {
      dialogRef = this.dialog.open(EditTreeFieldDialogComponent, {
        data: {
          label: translatedLabel,
          value: structuredClone(currentValue) // avoid mutating original until save
        }
      });

    }

    dialogRef.afterClosed().subscribe(newValue => {
      if (!newValue || !this.tree) return; // user cancelled or no tree

      // 1️⃣ Update the local tree object
      if (field === 'plantDate') {
        newValue = new Date(newValue);
      } else if (field === 'position') {
        newValue = { x: newValue.x - 1, y: newValue.y - 1 };
        if (newValue.x < 0 || newValue.x >= this.maxRow || newValue.y < 0 || newValue.y >= this.maxCol) {
          alert(`Ungültige Position. Zeile muss zwischen 1 und ${this.maxRow} liegen, Spalte zwischen 1 und ${this.maxCol}.`);
          return;
        }
      }
      (this.tree as any)[field] = newValue;

      // 2️⃣ Send the WHOLE updated tree to backend
      this.apiService.updateTree(this.tree).subscribe({
        next: () => console.log('Tree updated'),
        error: err => console.error(err)
      });
    });

  }

  goBackToMeadow() {
    if (this.tree?.meadowId) {
      this.router.navigate(['/meadow', this.tree.meadowId]);
    } else {
      this.router.navigate(['/']);
    }
  }
}
