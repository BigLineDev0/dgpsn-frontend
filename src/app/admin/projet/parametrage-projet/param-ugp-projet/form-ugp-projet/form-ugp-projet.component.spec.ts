import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUgpProjetComponent } from './form-ugp-projet.component';

describe('FormUgpProjetComponent', () => {
  let component: FormUgpProjetComponent;
  let fixture: ComponentFixture<FormUgpProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormUgpProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormUgpProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
