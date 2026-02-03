import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { ApiService } from '../../api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-image-viewer-dialog',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, TranslatePipe, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './image-viewer-dialog.component.html',
  styleUrls: ['./image-viewer-dialog.component.scss']
})
export class ImageViewerDialogComponent {
  imagePath: string = '';
  imageDescription: string | null = null;
  imageDate: Date | null = null;
  imageDateString: string = '';  // Add this for the input binding
  isDescriptionEdited: boolean = false;
  isDateEdited: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ImageViewerDialogComponent>,
    private apiService: ApiService,
  ) {
    if (data) {
      this.imagePath = data.imagePath || '';
      this.imageDescription = data.description || null;
      this.imageDate = data.datetime ? new Date(data.datetime) : null;
      this.imageDateString = this.imageDate ? this.formatDateToInput(this.imageDate) : '';
    }
  }

  // Helper to format Date to yyyy-MM-dd string
  private formatDateToInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  closeDialog() {
    this.dialogRef.close();
    window.location.reload();
  }

  deleteTreeImage() {
    this.apiService.deleteTreeImage(this.data.imageId).subscribe({
      next: () => {
        console.log('Image deleted successfully');
        this.closeDialog();
      },
      error: (error) => {
        console.error('Error deleting image:', error);
      }
    });
  }

  toggleEditImageDescription() {
    this.isDescriptionEdited = !this.isDescriptionEdited;
  }

  toggleEditImageDate() {
    this.isDateEdited = !this.isDateEdited;
    // Reset to current value when entering edit mode
    if (this.isDateEdited && this.imageDate) {
      this.imageDateString = this.formatDateToInput(this.imageDate);
    }
  }

  saveDescription() {
    if (!this.imageDescription) return;

    const formData = new FormData();
    formData.append('newDescription', this.imageDescription);

    this.apiService.updateTreeImage(this.data.imageId, formData).subscribe({
      next: () => {
        console.log('Image description updated successfully');
        this.toggleEditImageDescription();
      },
      error: (error: any) => {
        console.error('Error updating image description:', error);
      }
    });
  }

  saveDate() {
    if (!this.imageDateString) return;

    // Convert string back to Date object
    const dateObj = new Date(this.imageDateString);
    
    if (isNaN(dateObj.getTime())) {
      console.error('Invalid date');
      return;
    }

    const formData = new FormData();
    formData.append('newDatetime', dateObj.toISOString());

    this.apiService.updateTreeImage(this.data.imageId, formData).subscribe({
      next: () => {
        console.log('Image date updated successfully');
        this.imageDate = dateObj;  // Update the display date
        this.toggleEditImageDate();
      },
      error: (error: any) => {
        console.error('Error updating image date:', error);
      }
    });
  }

  cancelEditDescription() {
    this.imageDescription = this.data.description || null;
    this.toggleEditImageDescription();
  }

  cancelEditDate() {
    this.imageDate = this.data.datetime ? new Date(this.data.datetime) : null;
    this.imageDateString = this.imageDate ? this.formatDateToInput(this.imageDate) : '';
    this.toggleEditImageDate();
  }
}