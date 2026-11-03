import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLignesChargesComponent } from './add-lignes-charges.component';

describe('AddLignesChargesComponent', () => {
  let component: AddLignesChargesComponent;
  let fixture: ComponentFixture<AddLignesChargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLignesChargesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLignesChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  }); 
});
