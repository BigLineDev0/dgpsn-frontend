
import { AgentService } from '@/app/services/agent/agent.service';
import { CongeService } from '@/app/services/conge/conge.service';
import { Alertes } from '@/app/util/alerte';
import { Helper } from '@/app/util/helper';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { FeatherIconDirective } from '@core/feather-icon/feather-icon.directive';
import { NgbAccordionModule, NgbAlertModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { QuillModule } from 'ngx-quill';
import { AgentMatriculeComponent } from '../agent-matricule/agent-matricule.component';

@Component({
  selector: 'app-add-demande',
  imports: [
    CommonModule,
     NgbPaginationModule,
        NgbDropdownModule,
        MatTabsModule,
        NgbAccordionModule,
        MatDialogModule,
        MatTableModule,
        NgbTooltipModule,
        MatMenuModule,
        MatIconModule,
        MatDialogModule,
        MatRippleModule,
        ReactiveFormsModule,
        NgSelectModule,
        MatButtonModule,
        QuillModule,
        MatRadioModule,
        NgbNavModule,
        MatCardModule,
        FormsModule,
        MatPaginatorModule,
        MatSelectModule,
        NgbAlertModule,
        HasAnyAuthorityDirective,
        NgbPopoverModule,
        AgentMatriculeComponent
  ],
  // schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './add-demande.component.html',
  styleUrl: './add-demande.component.scss'
})
export class AddDemandeComponent {
  form!: FormGroup;
  typeConges:any =[
    {name:"ANNUEL",description:"Conge Annuel"},
     {name:"MATERNITE",description:"Conge Maternite"},
     {name:"MALADIE",description:"Conge Maladie"},
      {name:"AUTRES",description:"Autre Conge"},
  ]
  formAnnee!: FormGroup;
  @Input() isAnnee!: boolean;
  @Input() isSearch!: boolean;
  @Input() demandeToUpdate: any;
   @Input() typeConge:any;
  agentID:any
  @Input() isCongeAgentRoute: boolean = false;
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Output() submit: EventEmitter<boolean> = new EventEmitter();


  pageOptions:any ={
    page:0,
    size:30
  }
  agents: any;
  selectedAgentName: string = '';
  anneeCessation:any
  filteredMatricules: string[] = [];
  loadingAgents: boolean = false;


  constructor(private readonly modalService: NgbModal, private readonly fb: FormBuilder,
              private readonly congeService: CongeService, private readonly agentService: AgentService,
              private readonly router: Router,
  ) {}

  ngOnInit() {
     this.getAgent();
    this.getIdAgent();
    this.initform();
    this.onFormChanges();
  }

  initform() {
    const currentDate = new Date().toISOString().slice(0, 10);
    const formattedDate = currentDate.split('/').reverse().join('/');
    this.form = this.fb.group({
      libelle: [''],
      dateDemande: [formattedDate, Validators.required],
      dateDebut: ['',],
      dateDepart: [{ value: '', disabled: true }],
      dateReprise: [''],
      description: [''],
      statutProfessionnel:[],
      numeroDecision:[],
      typeConge:[this.isCongeAgentRoute ? this.typeConge : ''],
      agentId: [this.isCongeAgentRoute ? this.agentID : ''],
      duree: [''],


    })
    this.formAnnee = this.fb.group({
      annee: ['', Validators.required],
    })
    this.loadFields();
    this.form.get('dateDebut')?.valueChanges.subscribe((value) => {
      if (this.form.get('dateDepart')) {
        this.form.get('dateDepart')?.setValue(value, { emitEvent: false });
      }
    });

  }

  loadFields() {
    if (this.demandeToUpdate !== undefined) {
      this.form.get('libelle')?.setValue(this.demandeToUpdate.libelle);
      this.form.get('dateDemande')?.setValue(Helper.editDate(this.demandeToUpdate.dateDemande));
      this.form.get('dateDebut')?.setValue(Helper.editDate(this.demandeToUpdate.dateDebut));
      this.form.get('dateDepart')?.setValue(Helper.editDate(this.demandeToUpdate.dateDepart));
      this.form.get('dateReprise')?.setValue(Helper.editDate(this.demandeToUpdate.dateReprise));
      this.form.get('description')?.setValue(this.demandeToUpdate.description);
      this.form.get('agentId')?.setValue(this.demandeToUpdate.agent?.id);
       this.form.get('numeroDecision')?.setValue(this.demandeToUpdate?.numeroDecision);
      this.form.get('duree')?.setValue(this.demandeToUpdate.duree);

    }
  }
  getIdAgent() {
    if(this.isCongeAgentRoute){
      this.agentID = localStorage.getItem('idAgent');
      console.log("IdAgent", this.agentID)
    }
  }

  save() {
    this.form.get('dateDepart')?.enable();
    let conge = this.form.value;
    conge.typeConge = this.typeConge
    if (this.isCongeAgentRoute) {
      conge.agentId = this.agentID
     }
    if (this.demandeToUpdate === undefined) {
      this.create(conge)
    } else {
      this.update(conge)
    }
  }



  create(conge: any) {
    this.congeService.createConge(conge).subscribe({
      next: response => {
        if (response?.status == "BAD_REQUEST") {
          Alertes.errorPopPup('Ajout échoué', response?.message)
        } else {
          Alertes.alerteAddSuccess();
          this.close();
        }
      },
      error: (error) => {
        console.log('error', error);
      }
    });
  }


  close() {
    this.submit.emit(true);
  }


  update(conge: any) {
    let congeId = this.demandeToUpdate.id
    this.congeService.updateConge(congeId, conge).subscribe({
      next: response => Alertes.alerteAddSuccess(),
      error: response => Alertes.alerteUpdateSuccess(),
      complete: () => this.close()
    })


  }

  doSearch() {
    const conge = this.form.value;
    conge.TypeConge = this.typeConge;
    this.search.emit(conge);
  }


  getAgent() {
    this.loadingAgents = true;
    let req={
      pageOptions:this.pageOptions
    }
    this.agentService.getAllAgents(req).subscribe({
      next: res => {
        this.agents = res.content;
         console.log('log', this.agents);
        this.loadingAgents = false;
      }
    })
  }

  // getAddressConge() {
  //   this.labelService.readLabels(REFERENTIEL_TYPE.COUNTRY).subscribe({
  //     next: response => {
  //       this.contry = response.content;
  //     }
  //   })
  // }

  openBasicModal(content: TemplateRef<any>, fieldName: string) {
    const dialogRef = this.modalService.open(content, {size: 'lg', backdrop: 'static'});
    dialogRef.result.then((result) => {
      if (result) {
        if (result.event === 'save') {
          this.agents = [];
          this.agents.push(result.data);
          this.form.controls[fieldName]?.setValue(result.data.id);
          this.selectedAgentName = `${result.data.matricule} - ${result.data.prenom} - ${result.data.nom}`;
          console.log("Valeur de res :",  this.selectedAgentName );
        }
      }
    }).catch((res) => {
      // console.log("Valeur de res :", res);
    });
  }




  onInputDuration() {
    const dureeControl = this.form.get('duree');
    if (dureeControl && dureeControl?.value > 90) {
      dureeControl.setValue(90);
    }
  }

  onFormChanges(): void {
    this.form.get('duree')?.valueChanges.subscribe(() => {
      this.calculateDateReprise();
    });
    this.form.get('dateDepart')?.valueChanges.subscribe(() => {
      this.calculateDateReprise();
    });
  }

  calculateDateReprise() {
    const dateDepartStr = this.form.get('dateDepart')?.value;
    const duree = parseInt(this.form.get('duree')?.value, 10);
    if (dateDepartStr && duree && !isNaN(duree)) {
      const dateDepart = new Date(dateDepartStr);
      const yearsToAdd = Math.floor(duree / 30);
      dateDepart.setFullYear(dateDepart.getFullYear() + yearsToAdd);
      const formattedDate = dateDepart.toISOString().slice(0, 10);
      this.form.get('dateReprise')?.setValue(formattedDate);
    } else {
      this.form.get('dateReprise')?.setValue('');
    }
    this
  }






  activeMenuForAgentProfile(): boolean {
    // const hideMenu = localStorage.getItem('hideSuiviMenu');
    // return hideMenu == 'true' ? false : true;
    const isInAgentLayout = this.router.url.includes('/agent');
    const isInMySpaceLayout = this.router.url.includes('/mon-espace');
    const isInSuiviAgentLayout = this.router.url.includes('/liste-agents/suivie');

    const hideMenu = isInAgentLayout || isInMySpaceLayout || isInSuiviAgentLayout;
    return !hideMenu;
  }

  //  getCongeId() {
  //   this.congeService.readConge(this.congeId).subscribe({
  //     next: data => {
  //       this.conge = data?.body?.payload
  //       console.log("this.conger",this.conge);
        
  //     }
  //   })
  // }
}

