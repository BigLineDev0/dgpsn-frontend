import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAlerteComponent } from './edit-alerte.component';

describe('EditAlerteComponent', () => {
  let component: EditAlerteComponent;
  let fixture: ComponentFixture<EditAlerteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAlerteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAlerteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
