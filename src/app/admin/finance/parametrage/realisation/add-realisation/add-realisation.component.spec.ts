import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRealisationComponent } from './add-realisation.component';

describe('AddRealisationComponent', () => {
  let component: AddRealisationComponent;
  let fixture: ComponentFixture<AddRealisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRealisationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRealisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
