import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CessationComponent } from './cessation.component';

describe('CessationComponent', () => {
  let component: CessationComponent;
  let fixture: ComponentFixture<CessationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CessationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CessationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
