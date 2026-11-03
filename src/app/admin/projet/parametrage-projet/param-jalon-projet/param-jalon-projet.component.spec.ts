import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamJalonProjetComponent } from './param-jalon-projet.component';

describe('ParamJalonProjetComponent', () => {
  let component: ParamJalonProjetComponent;
  let fixture: ComponentFixture<ParamJalonProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamJalonProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParamJalonProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
