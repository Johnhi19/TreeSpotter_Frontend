import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Tree } from '../../models/tree';

@Component({
  selector: 'app-add-tree',
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './add-tree.component.html',
  styleUrl: './add-tree.component.scss'
})
export class AddTreeComponent {
  meadowId: number | null = null;
  position: { row: number, col: number } = { row: 0, col: 0 };
  tree = {
    name: '',
    type: '',
    plantDate: new Date(),
  };

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.meadowId = +params['meadowId'];
    });

    this.route.queryParams.subscribe(params => {
      this.position.row = +params['row'] || 0;
      this.position.col = +params['col'] || 0;
    });
  }

  onSubmit() {
    const newTree: Tree = {
      plantDate: this.tree.plantDate,
      meadowId: this.meadowId!,
      position: { x: this.position.row, y: this.position.col },
      type: this.tree.type,
      id: 0
    };
    
    this.apiService.insertTree(newTree).subscribe({
      next: (response: any) => {
        console.log('Tree added successfully', response);
        this.router.navigate(['/meadow', this.meadowId]);
      },
      error: (error: any) => {
        console.error('Error adding tree', error);
      }
    });
  }

  onCancel() {
    this.router.navigate(['/meadow', this.meadowId]);
  }
}