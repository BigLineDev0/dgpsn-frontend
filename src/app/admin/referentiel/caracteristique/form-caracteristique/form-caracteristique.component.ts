import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CaracteristiqueService } from '@/app/services/caracteristique/caracteristique.service';
import { DirectionService } from '@/app/services/direction/direction.service';
import { LabelService } from '@/app/services/labelService/label-service';
import { Alertes } from '@/app/util/alerte';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbPaginationModule, NgbAccordionModule, NgbTooltipModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { SharedModule } from 'primeng/api';
import { configLabelName } from '@/app/util/configlabel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-caracteristique',
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
  ],
  templateUrl: './form-caracteristique.component.html',
  styleUrl: './form-caracteristique.component.scss'
})
export class FormCaracteristiqueComponent {

 form!:FormGroup
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() caracteristiqueToUpdate:any;
  @Input() referentielType: any;
  @Input() isSearch: any;
  indicatorTypes : any
  fonctions: any
  dircections: any;
  typeCaracteristique: any = []  

  constructor(private caracteristiqueService: CaracteristiqueService,
     private modalService: NgbModal, private CaracteristiqueService: CaracteristiqueService, 
    private labelService: LabelService,
     private directionService: DirectionService) { }

  ngOnInit(): void {
    this.getTypeCaracteristique();
    this.getFonction();
    this.form = new FormGroup(
      {
        code: new FormControl("", Validators.required),
        libelle: new FormControl("", Validators.required),
        //  caracteristiqueTypeId: new FormControl("", Validators.required),
        }
    );
    this.loadFileds()
  }

  loadFileds() {
    if(this.caracteristiqueToUpdate !== undefined) {
      this.form.get('code')?.setValue(this.caracteristiqueToUpdate.code);
      this.form.get('libelle')?.setValue(this.caracteristiqueToUpdate.libelle);
     this.form.get('caracteristiqueType')?.setValue(this.caracteristiqueToUpdate.caracteristiqueType.id);
      
    }
  }

  // Dans les méthodes subscribe, ajoutez les types explicites :

save(): void {
  if (this.form.valid) {
    const formData = this.form.value;
    formData.caracteristiqueTypeId = localStorage.getItem('selectedTypeCaracteristiqueId');

    
    if (this.caracteristiqueToUpdate) {
      this.caracteristiqueService.updateCaracteristique(this.caracteristiqueToUpdate.id, formData).subscribe({
        next: (data: any) => {
          Alertes.alerteAddSuccess('Modification réussie');
          this.submit.emit(true);
        },
        error: (error: any) => {
          Alertes.errorPopPup('Erreur', error?.error?.message);
        }
      });
    } else {
      this.caracteristiqueService.createCaracteristique(formData).subscribe({
        next: (data: any) => {
          Alertes.alerteAddSuccess('Ajout réussi');
          this.submit.emit(true);
        },
        error: (error: any) => {
          Alertes.errorPopPup('Erreur', error?.error?.message);
        }
      });
    }
  }
}

  create() {
    if (!this.form.valid) {
      // Vérifiez si le champ libelle est vide
      if (!this.form.get('code')?.value) {
        this.form.get('code')?.setErrors({ required: true });
      }
      if (!this.form.get('libelle')?.value) {
        this.form.get('libelle')?.setErrors({ required: true });
      }
      // if (!this.form.get('caracteristiqueType')?.value) {
      //   this.form.get('caracteristiqueType')?.setErrors({ required: true });
      // }
     
   
            // Affichez un message d'erreur approprié
      Alertes.alerteAddDanger('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    let caracteristique = this.form.value;
    console.log(caracteristique);
    this.caracteristiqueService.createCaracteristique(caracteristique).subscribe({
      next:(data) =>{
        Alertes.alerteAddSuccess('Enregistrement reussi');
        this.emitSubmit()
      },
      error:(error)=>{
        Alertes.alerteAddDanger(error.error.message)

      },
      complete:()=>{
        this.close()
      }
    })
  }


  update(){
    let caracteristique = this.form.value;
    this.caracteristiqueService.updateCaracteristique(this.caracteristiqueToUpdate.id, caracteristique).subscribe({
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
 
  getTypeCaracteristique(){
    let req;
    this.labelService.readReferentielLabel(configLabelName.TYPE_CARACTERISTIQUE).subscribe({
      next: response => {
      console.log('abel',response);
        this.typeCaracteristique = response.body?.content;
      },
      error: response => {},
      
    })
  }

  getFonction(){
    let req = {referentielType: 'FONCTION'}
    this.labelService.readLabels(req).subscribe({
      next: response => {
      console.log('response',response);
        this.fonctions = response.content;
      },
      error: response => {},
      
    })
  }

  

  doSearch(){
    this.search.emit(this.form.value)
  }

  emitSubmit(){
    this.submit.emit(true);
  }
}



