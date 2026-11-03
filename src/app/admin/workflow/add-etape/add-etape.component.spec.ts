import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEtapeComponent } from './add-etape.component';

describe('AddEtapeComponent', () => {
  let component: AddEtapeComponent;
  let fixture: ComponentFixture<AddEtapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEtapeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEtapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
