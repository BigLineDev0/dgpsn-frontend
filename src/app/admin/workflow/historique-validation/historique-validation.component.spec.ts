import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueValidationComponent } from './historique-validation.component';

describe('HistoriqueValidationComponent', () => {
  let component: HistoriqueValidationComponent;
  let fixture: ComponentFixture<HistoriqueValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueValidationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
