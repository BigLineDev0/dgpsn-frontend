import { IndicateurService } from '@/app/services/indicateur/indicateur.service';
import { LabelService } from '@/app/services/labelService/label-service';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { SharedModule } from 'primeng/api';
import { Alertes } from 'src/app/util/alerte';

@Component({
  selector: 'app-create-or-update-indicateur',
  standalone :  true,
  imports : [
    CommonModule,
    SpinnerComponent,
    MaterialModule,
    SharedModule,
    NgbPaginationModule,
    NgbAccordionModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    HasAnyAuthorityDirective,
    NgbNavModule,
  ],
  templateUrl: './create-or-update-indicateur.component.html',
  styleUrls: ['./create-or-update-indicateur.component.scss']
})
export class CreateOrUpdateIndicateurComponent {
  form!:FormGroup
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();

  @Input() indicateurToUpdate:any;
  @Input() indicatorType: any;
  @Input() isSearch: any
  indicatorTypes : any
  unites: any;
  

  constructor(private indicateurService: IndicateurService, private modalService: NgbModal,
    private labelService: LabelService) { }

  ngOnInit(): void {
    this.getIndicatorTypes();
    this.getUnites();
    this.form = new FormGroup(
      {
        code: new FormControl("",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
          Validators.pattern(/^[a-zA-Z0-9]*$/)
        ]),
        libelle: new FormControl("",
        [
          Validators.required,
          Validators.minLength(3)]),
        indicatorTypeId: new FormControl(null),
        unitId: new FormControl(null)
      }
    );
    this.loadFileds()
  }

  loadFileds() {
    if(this.indicateurToUpdate !== undefined) {
      this.form.get('code')?.setValue(this.indicateurToUpdate?.code);
      this.form.get('libelle')?.setValue(this.indicateurToUpdate?.libelle);
      this.form.get('unitId')?.setValue(this.indicateurToUpdate?.unitId);
      this.form.get('indicatorTypeId')?.setValue(this.indicateurToUpdate?.indicatorTypeId);
      this.form.get('unitId')?.setValue(this.indicateurToUpdate?.unit?.id);
      this.form.get('indicatorTypeId')?.setValue(this.indicateurToUpdate?.indicatorType?.id);

    }
  }

  save(){
    if(this.indicateurToUpdate === undefined){
      this.create()
    }else{
      this.update()
    }
  }

  create() {
    let indicateur = this.form.value;
    console.log("indicateur ",indicateur);
    this.indicateurService.createIndicateur(indicateur).subscribe({
      next:(data) =>{
        Alertes.alerteAddSuccess('Enregistrement reussi');
        this.emitSubmit()
      },
      error:(error)=>{
        Alertes.alerteAddDanger(error.error.message)
      }
    })
  }

  update(){
    let indicateur = this.form.value;
    indicateur.indicateurTypeId = this.indicatorTypes?.indicateurTypeId;
    this.indicateurService.updateIndicateur(this.indicateurToUpdate?.id, indicateur).subscribe({
      next:(data) =>{
        Alertes.alerteAddSuccess('Modification reussi');
        this.emitSubmit()
      },
      error:(error)=>{
        Alertes.alerteAddDanger(error.error.message)
      }
    })
  }

  close(){
    this.modalService.dismissAll();
  }
  emitSubmit(){
    this.submit.emit(true);
  }

  getIndicatorTypes(){
    let req = {referentielType: 'TYPE_INDICATEUR'}
    this.labelService.readLabels(req).subscribe({
      next: response => {
        this.indicatorTypes = response.content;
      },
      error: response => {},
      
    })
  }

  doSearch(){
    this.search.emit(this.form.value)
  }

  getUnites(){
    let req = {referentielType: 'UNITE'}
    this.labelService.readLabels(req).subscribe({
      next: response => {
        this.unites = response.content;
      },
      error: response => {},
      
    })
  }
  get code(){
    return this.form.controls['code'];
  }
  get libelle(){
    return this.form.controls['libelle'];
 
}

}
