import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormJalonProjetComponent } from './form-jalon-projet.component';

describe('FormJalonProjetComponent', () => {
  let component: FormJalonProjetComponent;
  let fixture: ComponentFixture<FormJalonProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormJalonProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormJalonProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
