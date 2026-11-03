import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCourrierArriverComponent } from './update-courrier-arriver.component';

describe('UpdateCourrierArriverComponent', () => {
  let component: UpdateCourrierArriverComponent;
  let fixture: ComponentFixture<UpdateCourrierArriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCourrierArriverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCourrierArriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
