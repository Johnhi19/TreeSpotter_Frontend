import { Component, DestroyRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-upload-tree-image',
  imports: [FormsModule, TranslatePipe],
  templateUrl: './upload-tree-image.component.html',
  styleUrl: './upload-tree-image.component.scss'
})
export class UploadTreeImageComponent {
  selectedFile: File | null = null;
  description: string = '';
  treeId: number | null = null;
  private destroyRef = inject(DestroyRef);

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.treeId = idParam ? Number(idParam) : null;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] || null;
  }

  onUpload() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('treeImage', this.selectedFile);
      formData.append('description', this.description);

      this.apiService.uploadImage(this.treeId!, formData)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response) => {
            console.log('Image uploaded successfully', response);
            this.router.navigate(['/trees', this.treeId]);
          },
          error: (error) => console.error('Error uploading image', error)
        });
    }
  }

  onCancel() {
    this.router.navigate(['/trees', this.treeId]);
  }
}
