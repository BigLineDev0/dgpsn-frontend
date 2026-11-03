import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCourrierArriverComponent } from './search-courrier-arriver.component';

describe('SearchCourrierArriverComponent', () => {
  let component: SearchCourrierArriverComponent;
  let fixture: ComponentFixture<SearchCourrierArriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchCourrierArriverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCourrierArriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
