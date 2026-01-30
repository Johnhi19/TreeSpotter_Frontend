import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-image-viewer-dialog',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, TranslatePipe],
  template: `
    <button mat-icon-button class="close-button" (click)="closeDialog()">
      <mat-icon>close</mat-icon>
    </button>
    <div class="image-viewer-dialog">
      <img [src]="imagePath" alt="Tree Image" class="viewer-image" />
      <div *ngIf="imageDescription" class="image-description">
        <strong>{{ 'labels.DESCRIPTION' | translate }}:</strong> {{ imageDescription }}
      </div>
      <div *ngIf="imageDate" class="image-date">
        <strong>{{ 'labels.DATE' | translate }}:</strong> {{ imageDate }}
      </div>
    </div>
  `,
  styleUrls: ['./image-viewer-dialog.component.scss']
})
export class ImageViewerDialogComponent {
  imagePath: string = '';
  imageDescription: string | null = null;
  imageDate: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ImageViewerDialogComponent>
  ) {
    if (data) {
      this.imagePath = data.imagePath || '';
      this.imageDescription = data.description || null;
      this.imageDate = data.datetime || null;
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
