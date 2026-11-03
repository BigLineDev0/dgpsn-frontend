import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvancProblemeProjetComponent } from './avanc-probleme-projet.component';

describe('AvancProblemeProjetComponent', () => {
  let component: AvancProblemeProjetComponent;
  let fixture: ComponentFixture<AvancProblemeProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvancProblemeProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvancProblemeProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
