import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRubriqueComponent } from './add-rubrique.component';

describe('AddRubriqueComponent', () => {
  let component: AddRubriqueComponent;
  let fixture: ComponentFixture<AddRubriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRubriqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRubriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
