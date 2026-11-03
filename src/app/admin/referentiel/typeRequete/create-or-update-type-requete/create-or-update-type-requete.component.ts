import { LabelService } from '@/app/services/labelService/label-service';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'primeng/api';
import { Alertes } from 'src/app/util/alerte';
import { FormRegionComponent } from '../../region/form-region/form-region.component';
import { FormSecteuractiviteComponent } from '../../secteuractivite/form-secteuractivite/form-secteuractivite.component';
import { TypeRequeteService } from '@/app/services/typeRequete/type-requete.service';

@Component({
  selector: 'app-create-or-update-type-requete',
  templateUrl: './create-or-update-type-requete.component.html',
  styleUrls: ['./create-or-update-type-requete.component.scss'],
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
    NgbNavModule,
    FormRegionComponent,
    FormSecteuractiviteComponent,

   
  ],
})
export class CreateOrUpdateTypeRequeteComponent {

  form!:FormGroup
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Input() typeRequeteToUpdate:any; 
  @Input() referentielType: any;
  
  sector: any;

  constructor(private typeRequete: TypeRequeteService, private modalService: NgbModal,
    private labelService: LabelService,
    ) { }

    ngOnInit(): void {
      this.getSecteur()
      this.form = new FormGroup(
        {
          code: new FormControl("", Validators.required),
          libelle: new FormControl("", Validators.required),
          categorieRequeteId: new FormControl(null),
        }
      );              
      this.loadFileds()
    }

    loadFileds() {
      if(this.typeRequeteToUpdate !== undefined) {
        this.form.get('code')?.setValue(this.typeRequeteToUpdate.code);
        this.form.get('libelle')?.setValue(this.typeRequeteToUpdate.libelle);
        this.form.get('categorieRequeteId')?.setValue(this.typeRequeteToUpdate?.categorieRequete.id);
        
      }
    }

    save(){
      if(this.typeRequeteToUpdate === undefined){
        this.create()
      }else{
        this.update()
      }
    }

    create() {
      let typeRequete = this.form.value;
      // this.sector.referentielType = this.referentielType.name;
      console.log("typeRequete ",typeRequete);
      this.typeRequete.createTypeRequete(typeRequete).subscribe({
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
      let typeRequete = this.form.value;
      typeRequete.referentielType = this.referentielType.name;
      this.typeRequete.updateTypeRequete(this.typeRequeteToUpdate.id, typeRequete).subscribe({
        next:(data) =>{
          Alertes.alerteAddSuccess('Modification reussi');
          this.emitSubmit()
        },
        error:(error)=>{
          Alertes.alerteAddDanger(error.error.message)
        }
      })
    }

    getSecteur(){
      let req = {page: 0, size: 20, referentielType: 'CATEGORY_REQUETE'}
      this.labelService.readLabels(req).subscribe({
        next: response => {
          this.sector = response.content;
        },
        error: response => {},
        
      })
    }

    close(){
      this.modalService.dismissAll();
  
    }
    emitSubmit(){
      this.submit.emit(true);
    }
  
}

