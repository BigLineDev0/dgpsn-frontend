import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrageProjetComponent } from './parametrage-projet.component';

describe('ParametrageProjetComponent', () => {
  let component: ParametrageProjetComponent;
  let fixture: ComponentFixture<ParametrageProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametrageProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametrageProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
