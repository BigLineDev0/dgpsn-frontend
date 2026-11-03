import { LabelService } from '@/app/services/labelService/label-service';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'primeng/api';
import { StructureService } from 'src/app/services/structure/structure.service';
import { Alertes } from 'src/app/util/alerte';
import { FormRegionComponent } from '../../region/form-region/form-region.component';
import { FormSecteuractiviteComponent } from '../../secteuractivite/form-secteuractivite/form-secteuractivite.component';

@Component({
  selector: 'app-create-or-update-structure',
  templateUrl: './create-or-update-structure.component.html',
  styleUrls: ['./create-or-update-structure.component.scss'],
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
export class CreateOrUpdateStructureComponent {
  form!:FormGroup
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() structureToUpdate:any;
  @Input() indicatorType: any;
  @Input() isSearch: any;
  structureTypes : any
  countries: any;
  typeStructure: any = [{name:'Ministere'},{name:'Execution'},{name:'Partenaire'}]  

  constructor(
    private structureService: StructureService, 
    private modalService: NgbModal,
    private labelService: LabelService) { }
  
    ngOnInit(): void {
      this.getCountries();
      this.form = new FormGroup(
        {
          code: new FormControl("",
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10),
            Validators.pattern(/^[a-zA-Z0-9]*$/)
          ]),
          nom: new FormControl("",
          [
            Validators.required,
            Validators.minLength(2),
          ]),
          city: new FormControl("",
          [
            Validators.minLength(2),
          ]),
          address: new FormControl("",
          [
            Validators.minLength(2),
          ]),
          telephone: new FormControl("",[
            Validators.pattern('^[\s0-9+() -]*$'),
            Validators.minLength(7),
          ]),
          email: new FormControl("", [Validators.email]),
          webSite: new FormControl("",
          [ 
            Validators.pattern('^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w .-]*)*/?$')]),
          sartDateCooperation: new FormControl(""),
          mechanismOfIntervention: new FormControl("",
          [
            Validators.minLength(2),
          ]),
          responsable: new FormControl("",
          [
            Validators.minLength(2),
          ]),
          typeStructure: new FormControl(null, Validators.required),
          countryId: new FormControl(""),
          fax: new FormControl(null),
          etat: new FormControl(null)
        }
      );
      this.loadFileds()
    }
  
    loadFileds() {
      if(this.structureToUpdate !== undefined) {
        this.form.get('code')?.setValue(this.structureToUpdate.code);
        this.form.get('nom')?.setValue(this.structureToUpdate.nom);
        this.form.get('city')?.setValue(this.structureToUpdate.city);
        this.form.get('address')?.setValue(this.structureToUpdate.address);
        this.form.get('telephone')?.setValue(this.structureToUpdate.telephone);
        this.form.get('email')?.setValue(this.structureToUpdate.email);
        this.form.get('webSite')?.setValue(this.structureToUpdate.webSite);
        this.form.get('sartDateCooperation')?.setValue(this.structureToUpdate.sartDateCooperation);
        this.form.get('mechanismOfIntervention')?.setValue(this.structureToUpdate.mechanismOfIntervention);
        this.form.get('responsable')?.setValue(this.structureToUpdate.responsable);
        this.form.get('typeStructure')?.setValue(this.structureToUpdate.typeStructure);
        this.form.get('countryId')?.setValue(this.structureToUpdate?.country?.id);
        this.form.get('fax')?.setValue(this.structureToUpdate.fax);
        this.form.get('etat')?.setValue(this.structureToUpdate.etat); 
      }
    }

    save(){
      if(this.structureToUpdate === undefined){
        this.create()
      }else{
        this.update()
      }
    }
  
    create() {
      let structure = this.form.value;
      console.log("structure ",structure);
      this.structureService.createStructure(structure).subscribe({
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
      let structure = this.form.value;
      this.structureService.updateStructure(this.structureToUpdate.id, structure).subscribe({
        next:(data) =>{
          Alertes.alerteAddSuccess('Modification reussi');
          this.emitSubmit()
        },
        error:(error)=>{
          Alertes.alerteAddDanger(error.error.message)
        }
      })
    }

    getCountries(){
      let req = {page: 0, size: 20, referentielType: 'PAYS'}
      this.labelService.readLabels(req).subscribe({
        next: response => {
          console.log('contry',response);
          
          this.countries = response.content;
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
