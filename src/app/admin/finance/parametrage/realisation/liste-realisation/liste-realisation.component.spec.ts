import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRealisationComponent } from './liste-realisation.component';

describe('ListeRealisationComponent', () => {
  let component: ListeRealisationComponent;
  let fixture: ComponentFixture<ListeRealisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeRealisationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeRealisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
