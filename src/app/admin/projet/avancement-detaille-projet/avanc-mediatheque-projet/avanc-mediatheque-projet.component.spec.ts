import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvancMediathequeProjetComponent } from './avanc-mediatheque-projet.component';

describe('AvancMediathequeProjetComponent', () => {
  let component: AvancMediathequeProjetComponent;
  let fixture: ComponentFixture<AvancMediathequeProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvancMediathequeProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvancMediathequeProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
