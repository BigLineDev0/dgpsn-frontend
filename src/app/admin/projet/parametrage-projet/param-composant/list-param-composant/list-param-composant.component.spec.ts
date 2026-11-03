import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListParamComposantComponent } from './list-param-composant.component';

describe('ListParamComposantComponent', () => {
  let component: ListParamComposantComponent;
  let fixture: ComponentFixture<ListParamComposantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListParamComposantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListParamComposantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
