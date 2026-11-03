import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvancRisqueProjetComponent } from './avanc-risque-projet.component';

describe('AvancRisqueProjetComponent', () => {
  let component: AvancRisqueProjetComponent;
  let fixture: ComponentFixture<AvancRisqueProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvancRisqueProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvancRisqueProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
