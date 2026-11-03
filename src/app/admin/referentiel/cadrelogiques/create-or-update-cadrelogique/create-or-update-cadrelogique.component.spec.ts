import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateCadrelogiqueComponent } from './create-or-update-cadrelogique.component';

describe('CreateOrUpdateCadrelogiqueComponent', () => {
  let component: CreateOrUpdateCadrelogiqueComponent;
  let fixture: ComponentFixture<CreateOrUpdateCadrelogiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateCadrelogiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrUpdateCadrelogiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
