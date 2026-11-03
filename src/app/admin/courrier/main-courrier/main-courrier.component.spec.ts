import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCourrierComponent } from './main-courrier.component';

describe('MainCourrierComponent', () => {
  let component: MainCourrierComponent;
  let fixture: ComponentFixture<MainCourrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainCourrierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainCourrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
