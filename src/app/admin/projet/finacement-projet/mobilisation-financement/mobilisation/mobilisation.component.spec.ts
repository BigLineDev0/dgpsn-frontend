import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilisationComponent } from './mobilisation.component';

describe('MobilisationComponent', () => {
  let component: MobilisationComponent;
  let fixture: ComponentFixture<MobilisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobilisationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobilisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
