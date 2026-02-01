import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-image-viewer-dialog',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, TranslatePipe],
  templateUrl: './image-viewer-dialog.component.html',
  styleUrls: ['./image-viewer-dialog.component.scss']
})
export class ImageViewerDialogComponent {
  imagePath: string = '';
  imageDescription: string | null = null;
  imageDate: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ImageViewerDialogComponent>,
    private apiService: ApiService
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

  deleteTreeImage() {
    this.apiService.deleteTreeImage(this.data.imageId).subscribe({
      next: () => {
        console.log('Image deleted successfully');
        this.closeDialog();
        window.location.reload();
      },
      error: (error) => {
        console.error('Error deleting image:', error);
      }
    });
  }
}
