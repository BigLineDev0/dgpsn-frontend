import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListSecteuractiviteComponent } from './list-secteuractivite.component';

describe('ListSecteuractiviteComponent', () => {
  let component: ListSecteuractiviteComponent;
  let fixture: ComponentFixture<ListSecteuractiviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSecteuractiviteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSecteuractiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
