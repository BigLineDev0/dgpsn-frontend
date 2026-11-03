import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdatePlangeoComponent } from './create-or-update-plangeo.component';

describe('CreateOrUpdatePlangeoComponent', () => {
  let component: CreateOrUpdatePlangeoComponent;
  let fixture: ComponentFixture<CreateOrUpdatePlangeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrUpdatePlangeoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrUpdatePlangeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
