import { Component, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

export interface ConfirmDialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, TranslatePipe],
  template: `
    <div class="dialog-card">
      <div class="dialog-header">
        <h2>{{ data.title }}</h2>
      </div>
      <div class="dialog-content">
        <p>{{ data.message }}</p>
      </div>
      <div class="dialog-actions">
        <button class="cancel-button" (click)="onCancel()">{{ 'labels.CANCEL' | translate }}</button>
        <button class="confirm-button" (click)="onConfirm()">{{ 'labels.DELETE' | translate }}</button>
      </div>
    </div>
  `,
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}