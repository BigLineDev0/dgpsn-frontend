import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { SharedModule } from 'primeng/api';
import { NatureSpecifiqueService } from 'src/app/services/natureSpecifique/nature-specifique.service';
import { Alertes } from 'src/app/util/alerte';
import { CreateOrUpdateCadrelogiqueComponent } from '../../cadrelogiques/create-or-update-cadrelogique/create-or-update-cadrelogique.component';
import { RegionComponent } from '../../cadrelogiques/region/region.component';
import { LabelService } from '@/app/services/labelService/label-service';

@Component({
  selector: 'app-create-or-update-nature-specifique',
  templateUrl: './create-or-update-nature-specifique.component.html',
  styleUrls: ['./create-or-update-nature-specifique.component.scss'],
    standalone : true,
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
    CreateOrUpdateCadrelogiqueComponent,
    RegionComponent,
    NgbNavModule,

   
  ],
})
export class CreateOrUpdateNatureSpecifiqueComponent {
  form!:FormGroup
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() natureSpecifiqueToUpdate:any;
  @Input() referentielType: any;
  @Input() isSearch: any
  natureSpecifiqueTypes : any
  natures: any;

  constructor(
    private natureSpecifiqueService: NatureSpecifiqueService, 
    private modalService: NgbModal,
    private labelService: LabelService) { }
  
    ngOnInit(): void {
      this.getNatures();
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
            Validators.minLength(2)
          ]),
          natureId: new FormControl(null)
        }
      );
      this.loadFileds()
    }
  
    loadFileds() {
      if(this.natureSpecifiqueToUpdate !== undefined) {
        this.form.get('code')?.setValue(this.natureSpecifiqueToUpdate.code);
        this.form.get('libelle')?.setValue(this.natureSpecifiqueToUpdate.libelle);
        this.form.get('natureId')?.setValue(this.natureSpecifiqueToUpdate?.nature?.id);
      }
    }

    save(){
      if(this.natureSpecifiqueToUpdate === undefined){
        this.create()
      }else{
        this.update()
      }
    }
  
    create() {
      let natureSpecifique = this.form.value;
      console.log("natureSpecifique ",natureSpecifique);
      this.natureSpecifiqueService.createnatureSpecifique(natureSpecifique).subscribe({
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
      let natureSpecifique = this.form.value;
      this.natureSpecifiqueService.updatenatureSpecifique(this.natureSpecifiqueToUpdate.id, natureSpecifique).subscribe({
        next:(data) =>{
          Alertes.alerteAddSuccess('Modification reussi');
          this.emitSubmit()
        },
        error:(error)=>{
          Alertes.alerteAddDanger(error.error.message)
        }
      })
    }

    getNatures(){
      let req = {page: 0, size: 20, referentielType: 'NATURE'}
      this.labelService.readLabels(req).subscribe({
        next: response => {
          this.natures = response.content;
        },
        error: response => {},
        
      })
    }

    doSearch(){
      this.search.emit(this.form.value)
    }
  
    close(){
      this.modalService.dismissAll();
  
    }

    emitSubmit(){
      this.submit.emit(true);
    }

}
