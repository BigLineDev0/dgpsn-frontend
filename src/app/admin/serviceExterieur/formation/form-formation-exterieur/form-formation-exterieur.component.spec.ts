import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFormationExterieurComponent } from './form-formation-exterieur.component';

describe('FormFormationExterieurComponent', () => {
  let component: FormFormationExterieurComponent;
  let fixture: ComponentFixture<FormFormationExterieurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFormationExterieurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFormationExterieurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
