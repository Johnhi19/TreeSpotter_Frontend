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
    <form #form="ngForm" (ngSubmit)="onSubmit()">
      <div class="dialog-card">
        <div class="dialog-header">
          <h2>{{ 'labels.EDIT' | translate }} {{ data.label }}</h2>
        </div>

        <div class="dialog-content">
          <mat-form-field appearance="outline">
            <mat-label>Zeile</mat-label>
            <input 
              matInput 
              type="number"
              min="1"
              [max]="data.maxRow"
              inputmode="numeric"
              pattern="[0-9]*"
              onkeydown="return !['e','E','+','-','.'].includes(event.key)"
            [(ngModel)]="data.value.x" 
            name="dataX">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Spalte</mat-label>
            <input 
              matInput 
              type="number"
              min="1"
              [max]="data.maxCol"
              inputmode="numeric"
              pattern="[0-9]*"
              onkeydown="return !['e','E','+','-','.'].includes(event.key)"
              [(ngModel)]="data.value.y" 
              name="dataY" 
            />
          </mat-form-field>
        </div>
      
        <div class="dialog-actions">
          <button type="button" class="cancel-button" (click)="cancel()">{{ 'labels.CANCEL' | translate }}</button>
          <button type="submit" class="confirm-button" (click)="save()">{{ 'labels.SUBMIT' | translate }}</button>
        </div>
      </div>
    </form>
  `,
  styleUrl: './edit-tree-dialog.component.scss'
})
export class EditTreePositionDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<EditTreePositionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      label: string;
      value: { x: number; y: number };
      maxRow: number;
      maxCol: number;
    }
  ) {}

  onSubmit() {
    this.save();
  }

  save() {
    this.dialogRef.close(this.data.value);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
