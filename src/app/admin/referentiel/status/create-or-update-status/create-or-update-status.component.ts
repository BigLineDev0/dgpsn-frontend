import { LabelService } from '@/app/services/labelService/label-service';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'primeng/api';
import { StatutService } from 'src/app/services/statut/statut.service';
import { Alertes } from 'src/app/util/alerte';
import { FormRegionComponent } from '../../region/form-region/form-region.component';
import { FormSecteuractiviteComponent } from '../../secteuractivite/form-secteuractivite/form-secteuractivite.component';

@Component({
  selector: 'app-create-or-update-status',
  templateUrl: './create-or-update-status.component.html',
  styleUrls: ['./create-or-update-status.component.scss'],
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
export class CreateOrUpdateStatusComponent {
  form!:FormGroup
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() statutToUpdate:any;
  @Input() referentielType: any;
  @Input() isSearch: any
  statutTypes : any = [{name: 'PROJECT'},{name: 'ISSUELOG'},{name: 'RISK'}]
  // uinites: any


  constructor(private statutService: StatutService, private modalService: NgbModal,
    private labelService: LabelService) { }

    ngOnInit(): void {
      this.getStatutTypes();
      this.form = new FormGroup(
        {
          code: new FormControl("", Validators.required),
          libelle: new FormControl("", Validators.required),
          statusType: new FormControl(null),
        }
      );
      this.loadFileds()
    }
  
    loadFileds() {
      if(this.statutToUpdate !== undefined) {
        this.form.get('code')?.setValue(this.statutToUpdate.code);
        this.form.get('libelle')?.setValue(this.statutToUpdate.libelle);
        this.form.get('statusType')?.setValue(this.statutToUpdate.statusType.name);
      }
    }
  
    
  
    save(){
      if(this.statutToUpdate === undefined){
        this.create()
      }else{
        this.update()
      }
    }
  
    create() {
      let statut = this.form.value;
     // indicateur.referentielType = this.referentielType.name;
      console.log("statut ",statut);
      this.statutService.createStatut(statut).subscribe({
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
      let statut = this.form.value;
      statut.referentielType = this.referentielType.name;
      this.statutService.updateStatut(this.statutToUpdate.id, statut).subscribe({
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
  
    getStatutTypes(){
      let req = {page: 0, size: 3, referentielType: 'TYPE_STATUS'}
      this.labelService.readLabels(req).subscribe({
        next: response => {
          this.statutTypes = response.content;
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
    doSearch(){
      this.search.emit(this.form.value)
    }
  
    
}
