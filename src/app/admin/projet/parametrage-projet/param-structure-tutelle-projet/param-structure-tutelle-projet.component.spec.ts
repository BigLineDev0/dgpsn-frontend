import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamStructureTutelleProjetComponent } from './param-structure-tutelle-projet.component';

describe('ParamStructureTutelleProjetComponent', () => {
  let component: ParamStructureTutelleProjetComponent;
  let fixture: ComponentFixture<ParamStructureTutelleProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamStructureTutelleProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParamStructureTutelleProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
