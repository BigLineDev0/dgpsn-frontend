import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvancMissionProjetComponent } from './avanc-mission-projet.component';

describe('AvancMissionProjetComponent', () => {
  let component: AvancMissionProjetComponent;
  let fixture: ComponentFixture<AvancMissionProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvancMissionProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvancMissionProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
