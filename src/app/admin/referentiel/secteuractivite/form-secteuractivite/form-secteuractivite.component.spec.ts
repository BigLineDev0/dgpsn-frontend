import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormSecteuractiviteComponent } from './form-secteuractivite.component';

describe('FormSecteuractiviteComponent', () => {
  let component: FormSecteuractiviteComponent;
  let fixture: ComponentFixture<FormSecteuractiviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSecteuractiviteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSecteuractiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
