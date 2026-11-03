import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AddCourrierDepartComponent } from "./add-courrier-depart.component";

describe("AddCourrierDepartComponent", () => {
  let component: AddCourrierDepartComponent;
  let fixture: ComponentFixture<AddCourrierDepartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCourrierDepartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCourrierDepartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
