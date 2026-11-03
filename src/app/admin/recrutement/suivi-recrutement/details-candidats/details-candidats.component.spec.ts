import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCandidatsComponent } from './details-candidats.component';

describe('DetailsCandidatsComponent', () => {
  let component: DetailsCandidatsComponent;
  let fixture: ComponentFixture<DetailsCandidatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsCandidatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsCandidatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
