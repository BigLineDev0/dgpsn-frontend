import { LabelService } from '@/app/services/labelService/label-service';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { SharedModule } from 'primeng/api';
import { Alertes } from 'src/app/util/alerte';
import { CreateOrUpdateCadrelogiqueComponent } from '../../cadrelogiques/create-or-update-cadrelogique/create-or-update-cadrelogique.component';
import { RegionComponent } from '../../cadrelogiques/region/region.component';

@Component({
  selector: 'app-form-label',
  templateUrl: './form-label.component.html',
  styleUrls: ['./form-label.component.scss'],
    standalone:true,
    imports: [
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
    CreateOrUpdateCadrelogiqueComponent,
    RegionComponent,
    NgbNavModule,
   
  ],
})
export class FormLabelComponent {
  form!: FormGroup;
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Input() labelToUpdate:any;
  @Input() referentielType: any;

  constructor(private labelService: LabelService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        code: new FormControl("", Validators.required),
        libelle: new FormControl("", Validators.required)
      }
    );
    this.loadFileds()
  }

  loadFileds() {
    if(this.labelToUpdate !== undefined) {
      this.form.get('code')?.setValue(this.labelToUpdate.code);
      this.form.get('libelle')?.setValue(this.labelToUpdate.libelle);
    }
  }

  save(){
    if(this.labelToUpdate === undefined){
      this.create()
    }else{
      this.update()
    }
  }

  create() {
    let label = this.form.value;
    label.referentielType = this.referentielType.name;
    console.log(label);
    this.labelService.createLabel(label).subscribe({
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
    let label = this.form.value;
    label.referentielType = this.referentielType.name;
    this.labelService.updateLabel(this.labelToUpdate.id, label).subscribe({
      next:(data) =>{
        Alertes.alerteAddSuccess('Modification reussi');
        this.emitSubmit()
      },
      error:(error)=>{
        Alertes.alerteAddDanger(error.error.message)
      }
    })
  }
  emitSubmit(){
    this.submit.emit(true);
  }
}
