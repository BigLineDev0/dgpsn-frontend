import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamActeurProjetComponent } from './param-acteur-projet.component';

describe('ParamActeurProjetComponent', () => {
  let component: ParamActeurProjetComponent;
  let fixture: ComponentFixture<ParamActeurProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamActeurProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParamActeurProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
