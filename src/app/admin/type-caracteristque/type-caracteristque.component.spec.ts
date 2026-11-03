import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeCaracteristqueComponent } from './type-caracteristque.component';

describe('TypeCaracteristqueComponent', () => {
  let component: TypeCaracteristqueComponent;
  let fixture: ComponentFixture<TypeCaracteristqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeCaracteristqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeCaracteristqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
