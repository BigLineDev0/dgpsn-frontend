import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCourrierDepartComponent } from './detail-courrier-depart.component';

describe('DetailCourrierDepartComponent', () => {
  let component: DetailCourrierDepartComponent;
  let fixture: ComponentFixture<DetailCourrierDepartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailCourrierDepartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailCourrierDepartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
