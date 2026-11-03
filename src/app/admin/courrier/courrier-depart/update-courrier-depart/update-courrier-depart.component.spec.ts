import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCourrierDepartComponent } from './update-courrier-depart.component';

describe('UpdateCourrierDepartComponent', () => {
  let component: UpdateCourrierDepartComponent;
  let fixture: ComponentFixture<UpdateCourrierDepartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCourrierDepartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCourrierDepartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
