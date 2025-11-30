import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeadowDetailComponent } from './meadow-detail.component';

describe('MeadowDetailComponent', () => {
  let component: MeadowDetailComponent;
  let fixture: ComponentFixture<MeadowDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeadowDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeadowDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
