import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamPartenaireProjetComponent } from './param-partenaire-projet.component';

describe('ParamPartenaireProjetComponent', () => {
  let component: ParamPartenaireProjetComponent;
  let fixture: ComponentFixture<ParamPartenaireProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamPartenaireProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParamPartenaireProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
