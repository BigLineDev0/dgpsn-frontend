import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCourrierArriverComponent } from './detail-courrier-arriver.component';

describe('DetailCourrierArriverComponent', () => {
  let component: DetailCourrierArriverComponent;
  let fixture: ComponentFixture<DetailCourrierArriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailCourrierArriverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailCourrierArriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
