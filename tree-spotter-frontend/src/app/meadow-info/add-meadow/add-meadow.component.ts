import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Meadow } from '../../models/meadow';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-add-meadow',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, TranslatePipe],
  templateUrl: './add-meadow.component.html',
  styleUrl: './add-meadow.component.scss'
})
export class AddMeadowComponent {
  meadow = {
    name: '',
    location: '',
    size: [1, 1],
  };

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  onSubmit() {
    const newMeadow: Meadow = {
      id: 0,
      name: this.meadow.name,
      treeIds: [],
      size: [Number(this.meadow.size[0]), Number(this.meadow.size[1])],
      location: this.meadow.location,
    };
    
    this.apiService.insertMeadow(newMeadow).subscribe({
      next: (response: any) => {
        console.log('Meadow added successfully', response);
        this.router.navigate(['/meadow', response.id]);
      },
      error: (error: any) => {
        console.error('Error adding meadow', error);
      }
    });
  }
  
  onCancel() {
    this.router.navigate(['/']);
  }
}
