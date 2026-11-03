import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTypecontatComponent } from './list-typecontat.component';

describe('ListTypecontatComponent', () => {
  let component: ListTypecontatComponent;
  let fixture: ComponentFixture<ListTypecontatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTypecontatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTypecontatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
