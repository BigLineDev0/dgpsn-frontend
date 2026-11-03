import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateDepenseComponent } from './create-or-update-depense.component';

describe('CreateOrUpdateDepenseComponent', () => {
  let component: CreateOrUpdateDepenseComponent;
  let fixture: ComponentFixture<CreateOrUpdateDepenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateDepenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrUpdateDepenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
