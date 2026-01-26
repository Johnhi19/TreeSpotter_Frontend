import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTreeImageComponent } from './upload-tree-image.component';

describe('UploadTreeImageComponent', () => {
  let component: UploadTreeImageComponent;
  let fixture: ComponentFixture<UploadTreeImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadTreeImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadTreeImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
