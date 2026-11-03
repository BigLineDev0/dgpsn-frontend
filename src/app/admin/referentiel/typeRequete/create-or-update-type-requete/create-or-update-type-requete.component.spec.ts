import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateTypeRequeteComponent } from './create-or-update-type-requete.component';

describe('CreateOrUpdateTypeRequeteComponent', () => {
  let component: CreateOrUpdateTypeRequeteComponent;
  let fixture: ComponentFixture<CreateOrUpdateTypeRequeteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateTypeRequeteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrUpdateTypeRequeteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
