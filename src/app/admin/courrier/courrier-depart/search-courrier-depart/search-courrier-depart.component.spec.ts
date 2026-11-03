import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCourrierDepartComponent } from './search-courrier-depart.component';

describe('SearchCourrierDepartComponent', () => {
  let component: SearchCourrierDepartComponent;
  let fixture: ComponentFixture<SearchCourrierDepartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchCourrierDepartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCourrierDepartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
