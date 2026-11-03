import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeParticipantAtelierComponent } from './liste-participant-atelier.component';

describe('ListeParticipantAtelierComponent', () => {
  let component: ListeParticipantAtelierComponent;
  let fixture: ComponentFixture<ListeParticipantAtelierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeParticipantAtelierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeParticipantAtelierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
