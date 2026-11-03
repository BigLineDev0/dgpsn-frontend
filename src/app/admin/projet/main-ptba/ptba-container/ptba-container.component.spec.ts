import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtbaContainerComponent } from './ptba-container.component';

describe('PtbaContainerComponent', () => {
  let component: PtbaContainerComponent;
  let fixture: ComponentFixture<PtbaContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PtbaContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PtbaContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
