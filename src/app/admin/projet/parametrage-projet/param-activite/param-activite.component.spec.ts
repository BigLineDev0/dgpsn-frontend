import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamActiviteComponent } from './param-activite.component';

describe('ParamActiviteComponent', () => {
  let component: ParamActiviteComponent;
  let fixture: ComponentFixture<ParamActiviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamActiviteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParamActiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
