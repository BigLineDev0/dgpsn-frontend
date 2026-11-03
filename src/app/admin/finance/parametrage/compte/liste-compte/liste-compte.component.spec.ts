import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrageCompteComponent } from './liste-compte.component';

describe('ParametrageCompteComponent', () => {
  let component: ParametrageCompteComponent;
  let fixture: ComponentFixture<ParametrageCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParametrageCompteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametrageCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
