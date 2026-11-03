import { AgentService } from '@/app/services/agent/agent.service';
import { AxePseService } from '@/app/services/axe-pse/axe-pse.service';
import { LabelService } from '@/app/services/labelService/label-service';
import { ManangementUnitService } from '@/app/services/manangement-unit/manangement-unit.service';
import { PeriodiciteService } from '@/app/services/periodicite copy/periodicite.service';
import { SecteurService } from '@/app/services/secteur/secteur.service';
import { StatutService } from '@/app/services/statut/statut.service';
import { StructureService } from '@/app/services/structure/structure.service';
import { SubSectorService } from '@/app/services/sub-sector/sub-sector.service';
import { TagService } from '@/app/services/tag/tag.service';
import { TypeCadreLogiqueService } from '@/app/services/type-cadre-logique/type-cadre-logique.service';
import { Alertes } from '@/app/util/alerte';
import { Helper } from '@/app/util/helper';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import {Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';

import {ActivatedRoute} from "@angular/router";
import { NgbTooltipModule, NgbDropdownModule, NgbPaginationModule, NgbAccordionModule, NgbNavModule, NgbProgressbarModule, NgbCarouselModule, NgbTimepickerModule, NgbPopoverModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { SourceDeDonneesComponent } from '../finacement-projet/budget-global/source-de-donnees/source-de-donnees.component';
import { RoutingFinancementComponent } from '../finacement-projet/routing-financement/routing-financement.component';
import { FormSourceComponent } from '../finacement-projet/source-fincement/form-source/form-source.component';


@Component({
  selector: 'app-form-projets',
  templateUrl: './form-projets.component.html',
  styleUrls: ['./form-projets.component.scss'],
       standalone:true,
  imports:[
     CommonModule,
    NgbTooltipModule,
    NgbDropdownModule,
    MatIconModule,
    // FeatherIconModule,
    NgbTooltipModule,
    MatTableModule,
    SpinnerComponent,
    NgbPaginationModule,
    MatMenuModule,
    NgbAccordionModule,
    NgSelectModule,
    ReactiveFormsModule,
    MatStepperModule,
    NgbNavModule,
    NgbProgressbarModule,
    ListboxModule,
    FormsModule,
    NgbCarouselModule,
    // NgGanttEditorModule,
    NgbTimepickerModule,
    NgbPopoverModule,
    NgbDatepickerModule,
    MatCheckboxModule,
    // ProgrammeModule,
    // NgApexchartsModule,
    // DocumentModule,
    MatRippleModule,
    HasAnyAuthorityDirective,
    // TdbProjetSepecifiqueModule,
    // FoncierePubliqueModule,
    MatTreeModule,
    MatListModule,
    MatTooltipModule,
    MatButtonModule,
  ]
})
export class FormProjetsComponent implements OnInit{

  @ViewChild('searchButton') searchButton!: ElementRef;
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Input() label!: string;
  @Input() readProject!: boolean;
  @Input() projectToUpdate: any;
  @Input() isSearch!: boolean;
  @Input() toProgram!: boolean;
  types: any = [];
  beneficiaires: any = [];
  zoneExecutions: any = [];
  tags : any = [];
  selectedTags: any[] = [];
  statuts: any = [];
  programmeLibelle: any;
  formules:any =[
    {name:'SOMME',description:'Somme'},
    {name:'PONDERATION',description:'Pondération'},
  ]
  pageOptions: any = {page: 0, size: 20};
  structuresExecution: any = [];
  responsables: any = [];
  secteurs: any = [];
  subSectors: any = [];
  periodicities: any = [];
  detailsForm!: FormGroup;
  descriptionForm!: FormGroup;
  fundingForm!: FormGroup;
  fieldsToSearch: any = [];
  selectedFieldsToSearch: any = [];
  axes: any;
  programmes: any;

  tagstring:any;
  categories:any = [
    { id: 1, nom: 'Infrastructure routière' },
    { id: 2, nom: 'Éducation' },
    { id: 3, nom: 'Santé' },
    { id: 4, nom: 'Agriculture' },
    { id: 5, nom: 'Énergie' },
    { id: 6, nom: 'Environnement' },
    { id: 7, nom: 'Technologie de l\'information' },
    { id: 8, nom: 'Transport' },
    { id: 9, nom: 'Tourisme' },
    { id: 10, nom: 'Culture' }
];

  searchForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    // private projetService: ProjetService,
    private statutService: StatutService,
    private secteurService: SecteurService,
    private structureService: StructureService,
    private typeCadreLogique: TypeCadreLogiqueService,
    private subSectorService: SubSectorService,
    private axePseService: AxePseService,
    private tagService: TagService,
    private periodicityService: PeriodiciteService,
    private managementUnitService:ManangementUnitService,
    private labelService:LabelService,
    private agentService:AgentService,
  ) { }

  ngOnInit(): void {
    this.programmeLibelle = localStorage.getItem('programmeLibelle');
    this.selectedFieldsToSearch =  [
      {
        label: 'Sigle',
        checked: true
      },
      {
        label: 'Nom',
        checked: true
      },
      {
        label: 'Structure de tutelle',
        checked: false
      },
      {
        label: "Etat d'exécution",
        checked: false
      },
    ];
    console.log("projectToUpdate :",this.projectToUpdate)
    this.getAllPrograms();
    this.getAllTypeProjet();
    this.getAllStatutOfProject();
    // this.getAllSector();
    this.getAllStructuresExecution();
    // this.getAllTypeCadreLogique();
    this.getAllBeneficiaires();
    this.getAllZoneExecution();
    this.getAxesPse();
    // this. getTags();
    this.getAllSubSector();
    this.getAllAgents();
    // this.readPeriodicites();
    this.initForm();
    this.initSearchForm();
    this.initFieldsToSearh();

    if(this.projectToUpdate != undefined) {
      this.editForm();
    }
  }
  getAllAgents(){
    this.agentService.getAllAgents().subscribe({
      next:value=>{
        this.responsables = value?.content;
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.selectedFieldsToSearch = changes.selectedFieldsToSearch.currentValue;
  }

  initSearchForm() {
    this.searchForm = this.fb.group({
      code: [null],
      name: [''],
      dateDebut: [null],
      dateFin: [null],
      structureId: [null],
    });
  }

  initForm() {
    this.detailsForm = this.fb.group({
      code: [null],
      name: ['', Validators.required],
      formula: ['', Validators.required],
      poids: [0, Validators.required],
      expectedStartDate: [null, Validators.required],
      expectedEndDate: [null,  Validators.required],
      actualStartDate: ['', Validators.required],
      actualEndDate: [null, Validators.required],
      description: [null, Validators.required],
      overallObjective: [null],
      // tag: [''],
      axeId: [null],
      responsibleId: [null],
      parentId: [null],
      subSectorIds: [null],
      beneficiarieIds: [null],
      executionZoneIds: [null],
    });

    if (this.toProgram){
      // this.detailsForm.value.parentId = parseInt(atob(this.route.snapshot.queryParams.programId));
    }
  }

  editForm() {
    this.detailsForm.get('parentId')?.setValue(this.projectToUpdate.parent?.id);
    this.detailsForm.get('code')?.setValue(this.projectToUpdate.code);
    this.detailsForm.get('name')?.setValue(this.projectToUpdate.name);
    this.detailsForm.get('responsibleId')?.setValue(this.projectToUpdate.responsible?.id);
    this.detailsForm.get('axeId')?.setValue(this.projectToUpdate.axe?.id);
    const subSector: any[] = (this.projectToUpdate.subSectors as Array<any>).map((subSector:any) => subSector.id);
    this.detailsForm.get('subSectorIds')?.setValue(subSector);
    this.detailsForm.get('expectedStartDate')?.setValue(Helper.editDate(this.projectToUpdate.expectedStartDate));
    this.detailsForm.get('expectedEndDate')?.setValue(Helper.editDate(this.projectToUpdate.expectedEndDate));
    this.detailsForm.get('actualStartDate')?.setValue(Helper.editDate(this.projectToUpdate.actualStartDate));
    this.detailsForm.get('actualEndDate')?.setValue(Helper.editDate(this.projectToUpdate.actualEndDate));
    this.detailsForm.get('formula')?.setValue(this.projectToUpdate?.formula?.name);
    this.detailsForm.get('poids')?.setValue(this.projectToUpdate.poids);
    const beneficiarie: any[] = (this.projectToUpdate.beneficiaries as Array<any>).map((beneficiarie:any) => beneficiarie.id);
    this.detailsForm.get('beneficiarieIds')?.setValue(beneficiarie);
    const executionZones: any[] = (this.projectToUpdate.executionZones as Array<any>).map((executionZones:any) => executionZones.id);
    this.detailsForm.get('executionZoneIds')?.setValue(executionZones);
    this.detailsForm.get('description')?.setValue(this.projectToUpdate.description);
    this.detailsForm.get('overallObjective')?.setValue(this.projectToUpdate.overallObjective);

    // if(this.projectToUpdate.tag) {
    //   const tags = (this.projectToUpdate.tag as string).split(';');
    //   this.detailsForm.get('tag')?.setValue(tags);
    // }

  }

  // disableButton(): boolean {
  //   if(!this.detailsForm.get('type')?.valid) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  getAllTypeProjet() {
    this.types = [
      { label: 'Projet' },
      { label: 'Programme'}
    ];
  }

  getAxesPse() {
    let req = {
      page: 0,
      size: 100000,
      sortBy: 'libelle',
      ascending: true,
      referentielType : 'AXE_PSE',
    }
    this.labelService.readLabels(req).subscribe({
      next:reponse=>{
        this.axes = reponse.content;
      },
      error:erreur=> {
      },
    });

  }
  getTags() {
    this.tagService.readTags().subscribe(response => {
      this.tags = response.content;
    })
  }
  getAllStatutOfProject() {
    let req = {statusType: 'PROJECT'}
    this.statutService.readstatut(req).subscribe(response => {
      this.statuts = response.content;
    })
  }

  readPeriodicites(data?:any) {
    this.periodicityService.readPeriodicites(data).subscribe((data) => {
        this.periodicities = data.content;
      });
  }

  getAllSector() {
    this.secteurService.readSecteurs().subscribe(response => {
      this.secteurs = response.content;
    })
  }

  getSubSectors(event: any) {
    this.fundingForm.get('subSectorId')?.reset();
    if(event) {
      this.getAllSubSector(event.id);
    }
  }

  getAllSubSector(sectorId?: any) {
    if(sectorId) {
      this.subSectorService.readSubsectors({sectorId: sectorId}).subscribe(response => {
        this.subSectors = response.content;
      })
    }else {
      this.subSectorService.readSubsectors().subscribe(response => {
        this.subSectors = response.content;
      })
    }
  }

  getAllStructuresExecution() {
    this.structureService.readStructures({ structureTypeList: ['Ministere','Execution'] }).subscribe(response => {
      this.structuresExecution = response.content;
    })
  }

  // getAllTypeCadreLogique() {
  //   this.typeCadreLogique.readTypeCadreLogiques().subscribe(response => {
  //     this.zoneExecutions = response.content;
  //   })
  // }

  getAllPrograms() {
    this.managementUnitService.readAllProgrammes({type: 'PROGRAMME', page: 0, size:100000}).subscribe(
      {
        next: response => {
          this.programmes = response.content;
        },
        error: err => {
        },
        complete: () => {
        }
      })
  }

  saveProject() {
    const projetRequest = this.getProjetRequest();
    let tagform = this.detailsForm.value.tag;
    let tagsString = '';

    if(tagform){
      tagform.forEach((tag: string, index: number) => {
        tagsString += tag+';';
      });

      this.tags = tagsString.trim();

      projetRequest.tag = this.tags;
    }

    /*CODE PERMETTANT DE METTRE LE PROJET EN BROUILLON */

    // if(!this.detailsForm.valid || !this.fundingForm.valid) {
    //
    //   const errorFields: any[] = [];
    //
    //   Object.keys(this.detailsForm.controls).forEach(control => {
    //     this.extractErrorFields(this.detailsForm, control, errorFields);
    //   });
    //
    //   Object.keys(this.fundingForm.controls).forEach(control => {
    //     this.extractErrorFields(this.fundingForm, control, errorFields);
    //   });
    //
    //   Alertes.draftAction(
    //     `Les champs obligatoires suivant sont vide: `,
    //     `${errorFields.toString()}`,
    //     () => {
    //       projetRequest.disorganized = true;
    //       this.save(projetRequest);
    //     });
    //
    // }else {
    //   projetRequest.disorganized = false;
    //   this.save(projetRequest);
    // }
      projetRequest.disorganized = false;
      this.save(projetRequest);
    /*FIN CODE PERMETTANT DE METTRE LE PROJET EN BROUILLON*/

  }

  extractErrorFields(form: FormGroup, control: string, errorFileds: any[]){
    if(!form.get(control)?.valid) {
      let field = (control === 'structureId')? 'structure': control;
      errorFileds.push(field);
    }
  }

  getAllBeneficiaires(){
    let req = {
      page: 0,
      size: 100000,
      sortBy: 'libelle',
      ascending: true,
      referentielType : 'BENEFICIAIRE',
    }
    this.labelService.readLabels(req).subscribe({
      next:reponse=>{
        this.beneficiaires = reponse.content;
      },
      error:erreur=> {
      },
    });
  }
  getAllZoneExecution(){
    let req = {
      page: 0,
      size: 100000,
      sortBy: 'libelle',
      ascending: true,
      referentielType : 'ZONE_EXECUTION',
    }
    this.labelService.readLabels(req).subscribe({
      next:reponse=>{
        this.zoneExecutions = reponse.content;
      },
      error:erreur=> {
      },
    });
  }

  save(projetRequest: any) {
    if (this.toProgram){
      // projetRequest.parentId = parseInt(atob(this.route.snapshot.queryParams.programId));
    }
    if(this.projectToUpdate === undefined) {
      this.createProject(projetRequest);
    } else {
      this.updateProject(this.projectToUpdate.id, projetRequest)
    }
  }

  createProject(projetRequest: any) {
    this.managementUnitService.createProjet(projetRequest).subscribe(
      (value) => {
        Alertes.alerteAddSuccess('Projet');
        this.close();
      },
      (erreur) => {
        Alertes.errorPopPup('Ajout échouée',erreur?.error?.message)
      },
      () => {
      }
    );
  }

  updateProject(projetId: any, projetRequest: any) {
    this.managementUnitService.updateProjet(projetId, projetRequest).subscribe(
      (value) => {
        Alertes.alerteUpdateSuccess('Projet');
        this.close();
      },
      (value) => {
        Alertes.errorPopPup('Suppression échouée',value?.error?.message)
      },
      () => {
        // this.close();
      }
    );
  }

  getProjetRequest(): any {
    return this.detailsForm.value;
  }

  close() {
    this.submit.emit(true);
  }

  doSearch() {
    const projetRequest: any = this.searchForm.value;
    console.log("projetRequest ", projetRequest)
    this.search.emit(projetRequest);
  }

  activeFiled(label: any) {
    let yes = false;
    this.selectedFieldsToSearch.forEach((field:any) => {
      if(field.label === label){
        yes = true;
        return;
      }
    });
    return yes;
  }

  setEquivalence() {
    const montant = this.fundingForm.value.budget;
    const taux = this.fundingForm.value.taux;
    const equivalenceValue = montant * taux;

    this.fundingForm.get('equivalence')?.setValue(equivalenceValue);
  }

  initFieldsToSearh() {
    this.fieldsToSearch = [
      // {
      //   label: 'Type',
      //   checked: false
      // },
      {
        label: 'Sigle',
        checked: false
      },
      {
        label: 'Nom',
        checked: false
      },
      {
        label: 'Structure de tutelle',
        checked: false
      },
      {
        label: "Etat d'exécution",
        checked: false
      },
      {
        label: 'Date début',
        checked: false
      },
      {
        label: 'Date Fin',
        checked: false
      },
      {
        label: 'Tags',
        checked: false
      },
      {
        label: "Axe Strategique",
        checked: false
      },
      {
        label: "Sous secteur",
        checked: false
      },
      {
        label: 'Montant en FCFA',
        checked: false
      }
    ];

    this.selectedFieldsToSearch = [
      {
        label: 'Sigle',
        checked: true
      },
      {
        label: 'Nom',
        checked: true
      },
      {
        label: 'Structure de tutelle',
        checked: false
      },
      {
        label: "Etat d'exécution",
        checked: false
      },
    ];
  }

  isChecked(field: any) : boolean {
    this.selectedFieldsToSearch.forEach((selectedField: any) => {
      if(field.label === selectedField.label) {
        field.checked = true;
      }
    });
    return field.checked;
  }

  changeField(event: any, field: any) {
    if(event.srcElement.checked) {
      this.selectedFieldsToSearch.push(field);
    }else {
      let i=0;
      this.selectedFieldsToSearch.forEach((selectedField: any) => {
        if(field.label === selectedField.label) this.selectedFieldsToSearch.splice(i, 1);
        i++;
        return;
      })
    };
  }


}

