import { LabelService } from '@/app/services/labelService/label-service';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'primeng/api';
import { GeographicalLocationService } from 'src/app/services/geographical-location/geographical-location.service';
import { Alertes } from 'src/app/util/alerte';
import { CreateOrUpdateNatureSpecifiqueComponent } from '../../natureSpecifique/create-or-update-nature-specifique/create-or-update-nature-specifique.component';

@Component({
  selector: 'app-create-or-update-plangeo',
  templateUrl: './create-or-update-plangeo.component.html',
  styleUrls: ['./create-or-update-plangeo.component.scss'],
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

   
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CreateOrUpdatePlangeoComponent {
  form!:FormGroup
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Input() planToUpdate:any;
  @Input() referentielType: any;
  projets: any = [{code: 'PROJECT'},{code: 'ISSUELOG'},{code: 'RISK'}]
  cadrelogiques : any = [{libelle: 'PROJECT'},{libelle: 'ISSUELOG'},{libelle: 'RISK'}]
  // uinites: any


  constructor(private geographicalLocationService: GeographicalLocationService, private modalService: NgbModal,
    private labelService: LabelService) { }

    ngOnInit(): void {
      this.getProjet();
      this.getCadreLogique();
      this.form = new FormGroup(
        {
          projet: new FormControl(null),
          cadreLogique: new FormControl(null),
        }
      );
      this.loadFileds()
    }
  
    loadFileds() {
      if(this.planToUpdate !== undefined) {
        this.form.get('projetId')?.setValue(this.planToUpdate?.projet?.id);
      this.form.get('cadreLogiqueId')?.setValue(this.planToUpdate?.cadreLogique?.id);
      }
    }
  
    // getReferentielType() {
    //   this.referentielType = localStorage.getItem('referentielType')!;
    //   this.referentielType = JSON.parse(this.referentielType);
    // }
  
    save(){
      if(this.planToUpdate === undefined){
        this.create()
      }else{
        this.update()
      }
    }
  
    create() {
      let geographicalLocation = this.form.value;
     // indicateur.referentielType = this.referentielType.name;
      console.log("geographicalLocation ", geographicalLocation);
      this.geographicalLocationService.creategeographicalLocation(geographicalLocation).subscribe({
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
      let geographicalLocation = this.form.value;
      geographicalLocation.referentielType = this.referentielType.name;
      this.geographicalLocationService.updategeographicalLocation(this.planToUpdate.id, geographicalLocation).subscribe({
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
  
    getProjet(){
      let req = {page: 0, size: 20, referentielType: 'PROJET'}
      this.labelService.readLabels(req).subscribe({
        next: response => {
          this.projets = response.content;
        },
        error: response => {},
        
      })
    }
    getCadreLogique(){
      let req = {page: 0, size: 20, referentielType: 'CADRELOGIQUE'}
      this.labelService.readLabels(req).subscribe({
        next: response => {
          this.cadrelogiques = response.content;
        },
        error: response => {},
        
      })
    }
    close(){
      this.modalService.dismissAll();
    }
}
