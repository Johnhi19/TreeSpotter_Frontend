import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeadowComponent } from './add-meadow.component';

describe('AddMeadowComponent', () => {
  let component: AddMeadowComponent;
  let fixture: ComponentFixture<AddMeadowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMeadowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMeadowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
