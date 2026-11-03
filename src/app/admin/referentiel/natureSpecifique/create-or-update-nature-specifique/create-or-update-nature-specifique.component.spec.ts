import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateNatureSpecifiqueComponent } from './create-or-update-nature-specifique.component';

describe('CreateOrUpdateNatureSpecifiqueComponent', () => {
  let component: CreateOrUpdateNatureSpecifiqueComponent;
  let fixture: ComponentFixture<CreateOrUpdateNatureSpecifiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateNatureSpecifiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrUpdateNatureSpecifiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
