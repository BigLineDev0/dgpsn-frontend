import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourrierArriverComponent } from './add-courrier-arriver.component';

describe('AddCourrierArriverComponent', () => {
  let component: AddCourrierArriverComponent;
  let fixture: ComponentFixture<AddCourrierArriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCourrierArriverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCourrierArriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
