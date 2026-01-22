import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-meadow-dialog',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, TranslatePipe],
  template: `
    <form #form="ngForm" (ngSubmit)="onSubmit()">
      <div class="dialog-card">
        <div class="dialog-header">
          <h2>{{ 'labels.EDIT' | translate }} {{ 'labels.MEADOW' | translate }}</h2>
        </div>

        <div class="dialog-content">
          <mat-form-field appearance="outline">
            <mat-label>Name</mat-label>
            <input 
              matInput 
              [(ngModel)]="data.name" 
              name="name" 
            />
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Standort</mat-label>
            <input 
              matInput 
              [(ngModel)]="data.location" 
              name="location" 
            />
          </mat-form-field>
          
          <mat-form-field appearance="outline">
            <mat-label>Länge</mat-label>
            <input 
                matInput 
                type="number"
                min="1"
                inputmode="numeric"
                pattern="[0-9]*"
                onkeydown="return !['e','E','+','-','.'].includes(event.key)"
                [(ngModel)]="data.size[0]" 
                name="sizeLength" 
                required>
            </mat-form-field>

            <mat-form-field appearance="outline">
            <mat-label>Breite</mat-label>
            <input 
                matInput 
                type="number"
                min="1"
                inputmode="numeric"
                pattern="[0-9]*"
                onkeydown="return !['e','E','+','-','.'].includes(event.key)"
                [(ngModel)]="data.size[1]" 
                name="sizeWidth" 
                required>
            </mat-form-field>
        </div>
      
        <div class="dialog-actions">
          <button type="button" class="cancel-button" (click)="cancel()">{{ 'labels.CANCEL' | translate }}</button>
          <button type="submit" class="confirm-button" (click)="save()">{{ 'labels.SUBMIT' | translate }}</button>
        </div>
      </div>
    </form>
  `,
  styleUrl: './edit-dialog.component.scss'
})
export class EditMeadowDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<EditMeadowDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      name: string;
      location: string;
      size: number[];
    }
  ) {}

  onSubmit() {
    this.save();
  }

  save() {
    this.dialogRef.close(this.data);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
