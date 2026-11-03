import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainRecrutementComponent } from './main-recrutement.component';

describe('MainRecrutementComponent', () => {
  let component: MainRecrutementComponent;
  let fixture: ComponentFixture<MainRecrutementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainRecrutementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainRecrutementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
