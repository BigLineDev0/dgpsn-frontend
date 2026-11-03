import { LabelService } from '@/app/services/labelService/label-service';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbAccordionModule, NgbModal, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { log } from 'console';
import { SharedModule } from 'primeng/api';
import { AgentService } from 'src/app/services/agent/agent.service';
import { DirectionService } from 'src/app/services/direction/direction.service';
import { StructureService } from 'src/app/services/structure/structure.service';
import { Alertes } from 'src/app/util/alerte';

@Component({
  selector: 'app-form-agent',
  templateUrl: './form-agent.component.html',
  styleUrls: ['./form-agent.component.scss'],
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
    HasAnyAuthorityDirective
  ],
})
export class FormAgentComponent {
  form!:FormGroup
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() agentToUpdate:any;
  @Input() referentielType: any;
  @Input() isSearch: any;
  indicatorTypes : any
  structures: any
  fonctions: any
  dircections: any;
 
  file!:File;

  constructor(private agentService: AgentService,
     private modalService: NgbModal, private structureService: StructureService, 
    private labelService: LabelService, private directionService: DirectionService) { }

  ngOnInit(): void {
    this.getStructure();
    this.getFonction();
    this.getDirection();
    this.form = new FormGroup(
      {
        matricule: new FormControl("", Validators.required),
        nom: new FormControl("", Validators.required),
        prenom: new FormControl("", Validators.required),
        adresse: new FormControl(""),
        email: new FormControl(""),
        telephone: new FormControl("", [ 
                                    Validators.minLength(7),
                                       Validators.maxLength(9)  ] ),
      
        structureId: new FormControl(null),
        fonctionId: new FormControl(null),
        directionId: new FormControl(null, Validators.required)
      }
    );
    this.loadFileds()
  }

  loadFileds() {
    if(this.agentToUpdate !== undefined) {
      this.form.get('matricule')?.setValue(this.agentToUpdate.matricule);
      this.form.get('nom')?.setValue(this.agentToUpdate.nom);
      this.form.get('prenom')?.setValue(this.agentToUpdate.prenom);
      this.form.get('adresse')?.setValue(this.agentToUpdate.adresse);
      this.form.get('email')?.setValue(this.agentToUpdate.email);
      this.form.get('telephone')?.setValue(this.agentToUpdate.telephone);
      this.form.get('structureId')?.setValue(this.agentToUpdate?.structure?.id);
      this.form.get('fonctionId')?.setValue(this.agentToUpdate?.fonction?.id);
      this.form.get('directionId')?.setValue(this.agentToUpdate?.direction?.id);
    }
  }

  save(){
    if(this.agentToUpdate === undefined){
      this.create()
    }else{
      this.update()
    }
  }

  create() {
    if (!this.form.valid) {
      // Vérifiez si le champ nom est vide
      if (!this.form.get('matricule')?.value) {
        this.form.get('matricule')?.setErrors({ required: true });
      }
      if (!this.form.get('nom')?.value) {
        this.form.get('nom')?.setErrors({ required: true });
      }
      if (!this.form.get('prenom')?.value) {
        this.form.get('prenom')?.setErrors({ required: true });
      }
      if (!this.form.get('adresse')?.value) {
        this.form.get('adresse')?.setErrors({ required: true });
      }if (!this.form.get('email')?.value) {
        this.form.get('email')?.setErrors({ required: true });
      }
      if (!this.form.get('telephone')?.value) {
        this.form.get('telephone')?.setErrors({ required: true });
      }
      if (!this.form.get('fonction')?.value) {
        this.form.get('fonction')?.setErrors({ required: true });
      }
      if (!this.form.get('structure')?.value) {
        this.form.get('structure')?.setErrors({ required: true });
      }
            // Affichez un message d'erreur approprié
      Alertes.alerteAddDanger('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    let agent = this.form.value;
    console.log(agent);
    this.agentService.createAgent(agent).subscribe({
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
    let agent = this.form.value;
    this.agentService.updateAgent(this.agentToUpdate.id, agent,this.file).subscribe({
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
  
  getStructure(){
    this.structureService.readStructures().subscribe({
      next: response => {
      console.log('abel',response);
        this.structures = response.content;
      },
      error: response => {},
      
    })
  }

  getFonction(){
    let req = {referentielType: 'FONCTION'}
    this.labelService.readLabels(req).subscribe({
      next: response => {
      console.log('abel',response);
        this.fonctions = response.content;
      },
      error: response => {},
      
    })
  }

  getDirection(){
    this.directionService.readDirections(null, 0, 100).subscribe({
      next: response => {
      console.log('directions',response);
        this.dircections = response.content;
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



