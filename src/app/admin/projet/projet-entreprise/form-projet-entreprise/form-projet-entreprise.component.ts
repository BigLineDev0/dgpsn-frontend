import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EntrepriseService } from 'src/app/services/entreprise/entreprise.service';
import { LabelService } from 'src/app/services/label/label.service';
import { ProjetEntrepriseService } from 'src/app/services/projet-entreprise/projet-entreprise.service';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';
import { RESPONSE_STATUS } from 'src/app/util/response-status';
import { ResponseApi } from 'src/app/util/response.model';

@Component({
  selector: 'app-form-projet-entreprise',
  templateUrl: './form-projet-entreprise.component.html',
  styleUrls: ['./form-projet-entreprise.component.scss']
})
export class FormProjetEntrepriseComponent {

  @Input() inputAgent: boolean
  @Input() agentId: any;
  role: any;
  statut: any;
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Input() entrepriseToUpdate: any 
  form: FormGroup;
  @Input() entreprises: any;
  @Input() projectId: any;
  @Input() modal: NgbModalRef;
 

  constructor(
    private entrepriseService: EntrepriseService, 
    private projectEntrepriseService: ProjetEntrepriseService, 
    private labelService: LabelService,

  ) { }

  ngOnInit(): void {
    this.initForm()
    this.getEntreprise()
    this.getLabelFlag();
    this.getLabelRoleEntreprise(); 

   
  }

  initForm() {
    this.form = new FormGroup({
      roleEntrepriseId: new FormControl(''),
      entrepriseId: new FormControl('', Validators.required),
      flagId: new FormControl(null, Validators.required),
      coment: new FormControl(null, Validators.nullValidator),
    })

    if (this.entrepriseToUpdate) {
      this.edit()
    }
  }
  edit() {
    this.form.get('flagId')?.setValue(this.entrepriseToUpdate?.flag?.id);
    this.form.get('roleEntrepriseId')?.setValue(this.entrepriseToUpdate?.roleEntreprise?.id);
    this.form.get('entrepriseId')?.setValue(this.entrepriseToUpdate?.entreprise?.id);
    this.form.get('coment')?.setValue(this.entrepriseToUpdate.coment);
    this.getEntreprise()
  }
  save() {
    const entreprise = this.form.value;
    entreprise.projectId = this.projectId
    console.log("test savec entreprise",entreprise)
    if (this.entrepriseToUpdate === undefined) {
      // console.log("test savec entreprise",entreprise)
      this.create(entreprise)
    } else {
      this.update(entreprise);
    }

  }
 
  update(entreprise:any) {
    console.log("log",entreprise);
    
    this.projectEntrepriseService.updateProjet(this.entrepriseToUpdate.id, entreprise).subscribe({
      next: response => Alertes.alerteUpdateSuccess(),
      error: err => Alertes.alerteUpdateDanger(),
      complete: () => this.close()
    })
  }

  create(entreprise:any) {
    this.projectEntrepriseService.createProjet(entreprise).subscribe({
      next: response => Alertes.alerteAddSuccess(),
      error: err => Alertes.alerteAddDanger(),
      complete: () => this.close()
    })
  }

  getEntreprise() {
    let pageOptions = { page: 0, size: 100}
    this.entrepriseService.readEntreprises(pageOptions).subscribe({
      next: response => {
       console.log("entreprises", response)
        this.entreprises = response.payload
        console.log("entreprises", this.entreprises)
      },
      error: response => { },
    })
  }

  getLabelRoleEntreprise(){
    this.labelService.readLabels({referentielType:"ROLE_ENTREPRISE"}).subscribe({
      next: response => {
        this.role = response.content
      console.log("this.role",this.role)
      },
      error: response => { },
    })
  }
  getLabelFlag(){
    this.labelService.readLabels({referentielType:"FLAG"}).subscribe({
      next: response => {
        this.statut = response.content
      console.log("this.statut",this.statut)
      },
      error: response => { },
    })
  }
  close() {
    this.submit.emit(true);
    this.modal.close()
  }


}

