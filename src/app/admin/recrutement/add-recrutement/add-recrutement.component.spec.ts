import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecrutementComponent } from './add-recrutement.component';

describe('AddRecrutementComponent', () => {
  let component: AddRecrutementComponent;
  let fixture: ComponentFixture<AddRecrutementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRecrutementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRecrutementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
