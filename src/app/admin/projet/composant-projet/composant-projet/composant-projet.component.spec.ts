import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposantProjetComponent } from './composant-projet.component';

describe('ComposantProjetComponent', () => {
  let component: ComposantProjetComponent;
  let fixture: ComponentFixture<ComposantProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComposantProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComposantProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
