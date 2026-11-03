import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributionMarcheComponent } from './attribution-marche.component';

describe('AttributionMarcheComponent', () => {
  let component: AttributionMarcheComponent;
  let fixture: ComponentFixture<AttributionMarcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributionMarcheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttributionMarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
