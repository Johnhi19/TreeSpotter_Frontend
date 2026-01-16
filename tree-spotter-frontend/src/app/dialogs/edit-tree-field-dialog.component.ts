import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-tree-field-dialog',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, TranslatePipe],
  template: `
    <div class="dialog-card">
      <div class="dialog-header">
        <h2>{{ 'labels.EDIT' | translate }} {{ data.label }}</h2>
      </div>

      <div class="dialog-content">
        <mat-form-field appearance="outline">
          <input matInput [(ngModel)]="data.value" />
        </mat-form-field>
      </div>
    
      <div class="dialog-actions">
        <button class="cancel-button" (click)="cancel()">{{ 'labels.CANCEL' | translate }}</button>
        <button class="confirm-button" (click)="save()">{{ 'labels.SUBMIT' | translate }}</button>
      </div>
    </div>
  `,
  styleUrl: './edit-tree-dialog.component.scss'
})
export class EditTreeFieldDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<EditTreeFieldDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      label: string;
      value: any;
    }
  ) {}

  save() {
    this.dialogRef.close(this.data.value);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
