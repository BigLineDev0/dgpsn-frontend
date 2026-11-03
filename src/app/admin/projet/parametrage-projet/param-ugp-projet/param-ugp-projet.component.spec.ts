import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamUgpProjetComponent } from './param-ugp-projet.component';

describe('ParamUgpProjetComponent', () => {
  let component: ParamUgpProjetComponent;
  let fixture: ComponentFixture<ParamUgpProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamUgpProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParamUgpProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
