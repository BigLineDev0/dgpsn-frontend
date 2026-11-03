import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDepenseModalComponent } from './add-depense.component';

describe('AddDepenseModalComponent', () => {
  let component: AddDepenseModalComponent;
  let fixture: ComponentFixture<AddDepenseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDepenseModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDepenseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
