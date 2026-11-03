import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAtelierComponent } from './liste-atelier.component';

describe('ListeAtelierComponent', () => {
  let component: ListeAtelierComponent;
  let fixture: ComponentFixture<ListeAtelierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeAtelierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeAtelierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
