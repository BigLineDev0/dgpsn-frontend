import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadImageProjetComponent } from './read-image-projet.component';

describe('ReadImageProjetComponent', () => {
  let component: ReadImageProjetComponent;
  let fixture: ComponentFixture<ReadImageProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadImageProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadImageProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
