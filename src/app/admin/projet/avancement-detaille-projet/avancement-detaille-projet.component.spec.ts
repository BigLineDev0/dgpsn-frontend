import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvancementDetailleProjetComponent } from './avancement-detaille-projet.component';

describe('AvancementDetailleProjetComponent', () => {
  let component: AvancementDetailleProjetComponent;
  let fixture: ComponentFixture<AvancementDetailleProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvancementDetailleProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvancementDetailleProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
