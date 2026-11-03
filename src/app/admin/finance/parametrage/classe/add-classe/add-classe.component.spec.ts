import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParametrageComponent } from './add-classe.component';

describe('AddParametrageComponent', () => {
  let component: AddParametrageComponent;
  let fixture: ComponentFixture<AddParametrageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddParametrageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddParametrageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
