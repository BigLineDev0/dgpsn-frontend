import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainServiceExterieurComponent } from './main-service-exterieur.component';

describe('MainServiceExterieurComponent', () => {
  let component: MainServiceExterieurComponent;
  let fixture: ComponentFixture<MainServiceExterieurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainServiceExterieurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainServiceExterieurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
