import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateIndicateurComponent } from './create-or-update-indicateur.component';

describe('CreateOrUpdateIndicateurComponent', () => {
  let component: CreateOrUpdateIndicateurComponent;
  let fixture: ComponentFixture<CreateOrUpdateIndicateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateIndicateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrUpdateIndicateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
