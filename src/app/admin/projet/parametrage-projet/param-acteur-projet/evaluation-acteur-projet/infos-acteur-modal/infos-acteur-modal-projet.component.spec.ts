import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosActeurModalProjetComponent } from './infos-acteur-modal-projet.component';

describe('InfosActeurModalComponent', () => {
  let component: InfosActeurModalProjetComponent;
  let fixture: ComponentFixture<InfosActeurModalProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfosActeurModalProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfosActeurModalProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
