import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVideoProjetComponent } from './form-video-projet.component';

describe('FormVideoProjetComponent', () => {
  let component: FormVideoProjetComponent;
  let fixture: ComponentFixture<FormVideoProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormVideoProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormVideoProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
