import { Component } from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Tree } from '../../models/tree';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-trees',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './trees.component.html',
  styleUrl: './trees.component.scss'
})
export class TreesComponent {
  tree: Tree | null = null;
  treeId: number | null = null;
  meadowId: number | null = null;


  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.treeId = idParam ? Number(idParam) : null;

    // Get meadowId from query params
    this.route.queryParams.subscribe(params => {
      this.meadowId = params['meadowId'] ? Number(params['meadowId']) : null;
    });

    if (this.treeId){
      console.log(`Fetching data for tree ID: ${this.treeId}`);
      this.apiService.getTreeById(this.treeId).subscribe((data) => { this.tree = data; });
    }
  }

  goBackToMeadow() {
    if (this.meadowId) {
      this.router.navigate(['/meadow', this.meadowId]);
    } else {
      this.router.navigate(['/']);
    }
  }
}
