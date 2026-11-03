import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateStatusComponent } from './create-or-update-status.component';

describe('CreateOrUpdateStatusComponent', () => {
  let component: CreateOrUpdateStatusComponent;
  let fixture: ComponentFixture<CreateOrUpdateStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrUpdateStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
