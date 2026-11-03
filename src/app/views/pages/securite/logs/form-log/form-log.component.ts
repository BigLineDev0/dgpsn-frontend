import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form-log',
  templateUrl: './form-log.component.html',
  styleUrls: ['./form-log.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbModule,
    NgbAccordionModule,
  ],
  standalone: true
})
export class FormLogComponent implements OnInit {

  @Input() label: string = '';
  @Output() search: EventEmitter<any> = new EventEmitter();

  form: FormGroup = new FormGroup({});
  criteres: any = [{id: 1, label: 'Egal', value: "Egal"}, {id: 2, label: 'Inférieur', value: "Inferieure"}, {id: 3, label: 'Supérieur', value: "Supperieure"}, {id: 4, label: 'Compris entre', value: "Comprise"}];
  isComprise: any = false;
  
  constructor() { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.form = new FormGroup(
      {
        user: new FormControl(null),
        login: new FormControl(null),
        actionType: new FormControl(null),
        creationDate: new FormControl(null),
        endDate: new FormControl(null),
        critere: new FormControl(null)
        
      }
    );
  }

  getCritere() {
    if(this.form.get("critere")?.value == 'Comprise') {
      this.isComprise = true;
    }else{
      this.isComprise = false;
      this.form.get("endDate")?.reset();
    }
  }
  doSearch() {
    console.log("form value ", this.form.value)
    this.search.emit(this.form.value);
  }
///ooo
}
