import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateStructureComponent } from './create-or-update-structure.component';

describe('CreateOrUpdateStructureComponent', () => {
  let component: CreateOrUpdateStructureComponent;
  let fixture: ComponentFixture<CreateOrUpdateStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateStructureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrUpdateStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
