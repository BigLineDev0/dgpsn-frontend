import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeSousCompteComponent } from './liste-sous-compte.component';

describe('ListeSousCompteComponent', () => {
  let component: ListeSousCompteComponent;
  let fixture: ComponentFixture<ListeSousCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeSousCompteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeSousCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
