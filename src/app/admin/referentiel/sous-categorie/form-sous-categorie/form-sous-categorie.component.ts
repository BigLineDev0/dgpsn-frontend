import { LabelService } from '@/app/services/labelService/label-service';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'primeng/api';
import { IndicateurService } from 'src/app/services/indicateur/indicateur.service';
import { SousCategorieService } from 'src/app/services/sousCategorie/sous-categorie.service';
import { Alertes } from 'src/app/util/alerte';
import { FormRegionComponent } from '../../region/form-region/form-region.component';
import { CategoryService } from '@/app/services/category/category.service';


@Component({
  selector: 'app-form-sous-categorie',
  templateUrl: './form-sous-categorie.component.html',
  styleUrls: ['./form-sous-categorie.component.scss'],
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
    FormRegionComponent

   
  ],
})
export class FormSousCategorieComponent {
  form!:FormGroup
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Input() sousCategorieToUpdate:any;
  @Input() referentielType: any;
  
  category: any;

  constructor(private sousCategorieService: SousCategorieService, private modalService: NgbModal,
    private labelService: LabelService,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategorie()
    this.form = new FormGroup(
      {
        code: new FormControl("", Validators.required),
        libelle: new FormControl("", Validators.required),
        categoryId: new FormControl(null),
      }
    );              
    this.loadFileds()
  }

  loadFileds() {
    if(this.sousCategorieToUpdate !== undefined) {
      this.form.get('code')?.setValue(this.sousCategorieToUpdate.code);
      this.form.get('libelle')?.setValue(this.sousCategorieToUpdate.libelle);
    }
  }

  // getReferentielType() {
  //   this.referentielType = localStorage.getItem('referentielType')!;
  //   this.referentielType = JSON.parse(this.referentielType);
  // }

  save(){
    if(this.sousCategorieToUpdate === undefined){
      this.create()
    }else{
      this.update()
    }
  }

  create() {
    let sousCategorie = this.form.value;
   // indicateur.referentielType = this.referentielType.name;
    console.log("sousCategorie ",sousCategorie);
    this.sousCategorieService.createSousCategorie(sousCategorie).subscribe({
      next:(data) =>{
        Alertes.alerteAddSuccess('Enregistrement reussi');
        this.emitSubmit()
      },
      error:(error)=>{
        Alertes.alerteAddDanger(error.error.message)
      },
      complete:() => {
        this.close()
      },
    })
  }

  update(){
    let sousCategorie = this.form.value;
    sousCategorie.referentielType = this.referentielType.name;
    this.sousCategorieService.updateSousCategorie(this.sousCategorieToUpdate.id, sousCategorie).subscribe({
      next:(data) =>{
        Alertes.alerteAddSuccess('Modification reussi');
        this.emitSubmit()
      },
      error:(error)=>{
        Alertes.alerteAddDanger(error.error.message)
      }
    })
  }

  getCategorie(){
    let req = {page: 0, size: 20, referentielType: 'CATEGORIE'}
    this.labelService.readLabels(req).subscribe({
      next: response => {
        this.category = response.content;
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