import { AgentService } from '@/app/services/agent/agent.service';
import { CriticityService } from '@/app/services/criticity/criticity.service';
import { DelayImpactService } from '@/app/services/delay-impact/delay-impact.service';
import { FinancialImpactService } from '@/app/services/financial-impact/financial-impact.service';
import { IssueLogService } from '@/app/services/issue-log/issue-log.service';
import { LabelService } from '@/app/services/labelService/label-service';
import { NatureService } from '@/app/services/nature/nature.service';
import { RiskService } from '@/app/services/risk/risk.service';
import { StatutService } from '@/app/services/statut/statut.service';
import { StructureService } from '@/app/services/structure/structure.service';
import { Alertes } from '@/app/util/alerte';
import { Helper } from '@/app/util/helper';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
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
import { NgbTooltipModule, NgbDropdownModule, NgbPaginationModule, NgbAccordionModule, NgbNavModule, NgbProgressbarModule, NgbCarouselModule, NgbTimepickerModule, NgbPopoverModule, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { event } from 'jquery';
import { ListboxModule } from 'primeng/listbox';
import { RoutingAvancementProjetComponent } from '../../../routimg-projet/routing-avancement-projet/routing-avancement-projet.component';
import { FormRisqueProjetComponent } from '../../avanc-risque-projet/form-risque-projet/form-risque-projet.component';
import { NatureSpecifiqueService } from '@/app/services/natureSpecifique/nature-specifique.service';
import { SousCategorieService } from '@/app/services/sousCategorie/sous-categorie.service';
import { SourceService } from '@/app/services/source/source.service';
import { IssuelogStructureService } from '@/app/services/issuelogStructure/issuelog-structure.service';
import { IssuelogResolveChannelService } from '@/app/services/issuelogResolveChannel/issuelog-resolve-channel.service';
import { ResolveChannelService } from '@/app/services/resolveChannel/resolve-channel.service';

@Component({
  selector: 'app-form-probleme-projet',
  templateUrl: './form-probleme-projet.component.html',
  styleUrls: ['./form-probleme-projet.component.scss'],
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
    RoutingAvancementProjetComponent,
    FormRisqueProjetComponent
   ]
})
export class FormProblemeProjetComponent implements OnInit {

  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();

  @Input() problemeRiskToUpdate: any;
  @Input() isSearch!: boolean;
  @Input() projetId: any;

  form!: FormGroup;

  impactFinanciers: any;
  criticities: any;
  natures: any;
  sousCategorie:any;
  sources:any;
  specificNature:any;
  statuts: any;
  agent:any;
  structure:any;
  selectedRisque:any;
  value!: number;
  ministereStructure:any;
  criticite!: string;
  impactDelais: any;
  risques: any = [];

  //issa-sow
  financialWeight: any = 0;
  delayWeight: any = 0;
  criticityCode: any;
  otherSupervisors: any = [];
  resolveChannles: any = [];


  constructor(private statutService: StatutService, private natureService: NatureService, private delayImpactService: DelayImpactService,
              private financialImpactService: FinancialImpactService, private criticityService: CriticityService, private modalService: NgbModal,
              private riskService: RiskService, private fb: FormBuilder, private issueLogRiskService: IssueLogService,
              private SpecificNatureService: NatureSpecifiqueService,private SousCategorieService: SousCategorieService,private SourceService:SourceService,
              private agentService: AgentService, private structureService: StructureService, private issuelogStructureService: IssuelogStructureService,
              private resolveChannelService: ResolveChannelService, private issuelogResolveChannelService: IssuelogResolveChannelService, private labelService: LabelService) { }

  ngOnInit(): void {
    this.projetId = localStorage.getItem("projetId")!;
    this.readCriticities();
    this.readDelayImpacts();
    this.readFinancialImpacts();
    // this.readNatures();
    this.readStatus();
    this.readRisks();
    this.readSpecificNature();
    this.readSource();
    this.readSousCategorie();
    this.readAgent();
    this.readMinistere();
    this.readStructures();
    this.readOtherSuppervisors();
    this.readResolveChannles();
    this.initForm();

    this.editForm();
  }

  initForm() {
    this.form = this.fb.group({
      libelle: [null, Validators.required],
      description: [null],
      impact: [null],
      identificationDate: [''],
      deadline: [''],
      resolutionDate: [''],
      criticityCode: [null],
      delayImpact: [null],
      financialImpact: [null],
      statusId: [null],
      specificNatureId : [null],
      subCategoryId: [null],
      supervisorId: [null],
      dseppSupervisorId: [null],
      sourceId: [null],
      ministerId: [null],
      risqueFinancier: [],
      comment: [''],
      risksIds: [],
      structuresIds: [],
      // otherSuppervisorsId: [],
      resolveChannelsIds: []
    })
  }

  editForm() {
    if(this.problemeRiskToUpdate !== undefined) {

      this.setComplexFormControl(this.problemeRiskToUpdate.id);

      this.form.get('libelle')?.setValue(this.problemeRiskToUpdate.libelle);
      this.form.get('description')?.setValue(this.problemeRiskToUpdate.description);
      this.form.get('impact')?.setValue(this.problemeRiskToUpdate.impact);
      this.form.get('subCategoryId')?.setValue(this.problemeRiskToUpdate.subCategory?.id);
      this.form.get('identificationDate')?.setValue(Helper.editDate(this.problemeRiskToUpdate.identificationDate));
      this.form.get('deadline')?.setValue(Helper.editDate(this.problemeRiskToUpdate.deadline));
      this.form.get('resolutionDate')?.setValue(Helper.editDate(this.problemeRiskToUpdate.resolutionDate))
      this.form.get('criticityId')?.setValue(this.problemeRiskToUpdate.criticity?.id);
      this.form.get('delayImpactPoids')?.setValue(this.problemeRiskToUpdate.delayImpact?.id);
      this.form.get('financialImpactPoids')?.setValue(this.problemeRiskToUpdate.financialImpact?.id);
      this.form.get('statusId')?.setValue(this.problemeRiskToUpdate.status?.id);
      this.form.get('specificNatureId')?.setValue(this.problemeRiskToUpdate.specificNature?.id);
      this.form.get('comment')?.setValue(this.problemeRiskToUpdate.comment);
      this.form.get('risqueFinancier')?.setValue(this.problemeRiskToUpdate.risqueFinancier);
      this.form.get('ministerId')?.setValue(this.problemeRiskToUpdate.minister?.id);
      this.form.get('sourceId')?.setValue(this.problemeRiskToUpdate.source?.id);
      this.form.get('dseppSupervisorId')?.setValue(this.problemeRiskToUpdate.dseppSupervisor?.id);
      this.form.get('supervisorId')?.setValue(this.problemeRiskToUpdate.supervisor?.id);

      console.log(this.form.value)


      this.financialWeight = this.problemeRiskToUpdate.financialImpact?.poids;
      this.delayWeight = this.problemeRiskToUpdate.delayImpact?.poids;

      this.setCriticity();
    }
  }


  doSearch(){
    let issueLog=this.form.value
    issueLog.projetId = this.projetId;
    this.search.emit(issueLog)
  }

  readStatus(){
    this.statutService.readstatut({statusType: 'ISSUELOG'}).subscribe(data=>{
      this.statuts = data.content;
      this.sortItems(this.statuts)

    })
  }
  readNatures(){
    this.natureService.readnatures().subscribe(data=>{
      this.natures = data.content;
      this.sortItems(this.natures)

    })
  }

  readSpecificNature(){
    this.SpecificNatureService.readnaturesSpecifiques().subscribe(data=>{
      this.specificNature =data.content
      this.sortItems(this.specificNature)
    })
  }
  readStructures(){
    let req = {
      // typeStructure: "Execution",
      page: 0,
      size: 100000,
      sortBy: 'nom',
      ascending: true
    }
    this.structureService.readStructures(req).subscribe(data=>{
      this.structure =data.content
    })
  }

  readOtherSuppervisors(){
    let req = {
      // typeStructure: "Execution",
      page: 0,
      size: 100000,
      sortBy: 'nom',
      ascending: true
    }
    this.structureService.readStructures(req).subscribe(data=>{
      this.otherSupervisors = data.content
    })
  }

  readMinistere(){
    let req = {
      typeStructure: "Ministere",
      page: 0,
      size: 100000,
      sortBy: 'nom',
      ascending: true
    }
    // const req = { typeStructure: 'Ministere' }
    this.structureService.readStructures(req).subscribe(data=>{
      this.ministereStructure =data.content
      this.sortStructure(this.ministereStructure)
    })
  }
  readAgent(){
    this.agentService.getAllAgents().subscribe(data=>{
      this.agent = data.content;
      this.agent = this.agent.map((a:any) =>  {
        return {id: a.id, fullname: a.prenom+' '+a.nom}
      })
      this.sortAgent(this.agent)
    })
  }
  readSousCategorie(){
    this.SousCategorieService.readSCategories().subscribe(data=>{
      this.sousCategorie =data.content
      this.sortItems(this.sousCategorie)
    })
  }

  readSource(){
    this.labelService.readLabels({referentielType: 'SOURCE', page: 0, size: 100000}).subscribe(data=>{
      this.sources =data.content
      this.sortItems(this.sources)
    })
  }
  readDelayImpacts(){
    this.labelService.readLabels({referentielType: 'DELAY_IMPACT', page: 0, size: 100000}).subscribe(data=>{
      this.impactDelais = data.content;
      this.sortItems(this.impactDelais)

    })
  }
  readFinancialImpacts(){
    this.labelService.readLabels({referentielType: 'FINANCIAL_IMPACT', page: 0, size: 100000}).subscribe(data=>{
      this.impactFinanciers = data.content;
      this.sortItems(this.impactFinanciers) 
    })
  }

  readCriticities(){
    this.criticityService.readcriticities().subscribe(data=>{
      this.criticities = data.body;
      console.log('criticites: ', this.criticities)
      this.sortItems(this.criticities)
    })
  }

  readResolveChannles(){
    this.labelService.readLabels({referentielType: 'CANAL_RESOLUTION', page: 0, size: 100000}).subscribe(data=>{
      this.resolveChannles = data.content;
      this.sortItems(this.resolveChannles)
    })
  }

  readRisks(){
    const req = { projetId: this.projetId, page: 0,
      size: 100000, }
    this.riskService.readRisks(req).subscribe(data=>{
      this.risques = data.content;
      this.sortItems(this.risques)
    })
  }

  save() {
    const issueLog = this.form.value;
    issueLog.projetId = this.projetId!;
    issueLog.criticity = this.criticityCode;

    // const issueLogRisk = {
    //   issueLog: issueLog,
    //   risks: this.form.value.risks,
    //   otherSuppervisorsId: this.form.value.otherSuppervisorsId,
    //   resolveChannelsIds: this.form.value.resolveChannlesId
    // }

    // console.log('to save: ', issueLogRisk)
    if(this.problemeRiskToUpdate === undefined) {
      this.create(issueLog);
    } else {
      this.update(this.problemeRiskToUpdate.id, issueLog);
    }
  }

  create(issueLogRisk: any){
    // console.log("teste add ", issueLogRisk)
    this.issueLogRiskService.createIssueLog(issueLogRisk).subscribe({
      next: value => Alertes.alerteAddSuccess('Problème'),
      error: value => Alertes.alerteAddDanger(value.error.message),
      complete: () => this.close()
    })
  }

  update(issueLogId: any, issueLogRisk: any) {
    console.log(issueLogRisk)
    this.issueLogRiskService.updateIssuelogRisk(issueLogId, issueLogRisk).subscribe({
      next: value => Alertes.alerteUpdateSuccess(),
      error: value => Alertes.alerteUpdateDanger(value.error.message),
      complete: () => this.close()
    })
  }

  close(){
    this.submit.emit(true);
  }

  setCriticity() {
    this.value = this.financialWeight + this.delayWeight;

    console.log(this.value);

    if(this.value <= 40){
      this.criticite = 'Faible';
      this.criticityCode = 'FAIBLE';
    }else if(this.value <= 70 && this.value > 40) {
      this.criticite = 'Moyen';
      this.criticityCode = 'MOYEN';
    }else{
      this.criticite = 'Elevé';
      this.criticityCode = 'ELEVE';
    }
  }

  getFinancialWeight(event: any) {
    this.financialWeight = event.poids;
    console.log('financialWeight: ', this.financialWeight)

    this.setCriticity();
  }

  getDelayWeight(event: any) {
    this.delayWeight = event.poids;

    console.log('financialWeight: ', this.delayWeight)

    this.setCriticity();
  }

  setComplexFormControl(issueLogId: any) {
    this.setRisksControle(issueLogId);

    this.setOtherSuppervisorsIdControle(issueLogId);

    this.setResolveChannlesIdControle(issueLogId);
  }

  setRisksControle(issueLogId: any) {
    this.riskService.readRiskByIssueLog(issueLogId).subscribe({
      next: value => {
        const risksId = value.body.map((res: any) => res.id);
        this.form.get('risks')?.setValue(risksId);
      },
      error: value => console.log(value.error.message)
    })
  }

  setOtherSuppervisorsIdControle(issueLogId: any) {
    this.issuelogStructureService.readStructureByIssuelog(issueLogId).subscribe({
      next: value => {
        const otherSuppervisorsId = value.body.map((res: any) => res.id);
        this.form.get('otherSuppervisorsId')?.setValue(otherSuppervisorsId);
      }
    })
  }

  setResolveChannlesIdControle(issueLogId: any) {
    this.issuelogResolveChannelService.readResolveChannelByIssuelog(issueLogId).subscribe({
      next: value => {
        const resolveChannlesId = value.body.map((res: any) => res.id);
        this.form.get('resolveChannlesId')?.setValue(resolveChannlesId);
      }
    })
  }

  onChangeOtherSuervisors(event: any) {
    if(event) {
      console.log('Events: ', event)
    }
  }

  sortItems(labels: any) {
    labels.sort((a: any, b: any) => {
      if (a.libelle < b.libelle) {
        return -1;
      } else if (a.libelle > b.libelle) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  sortAgent(labels: any) {
    labels.sort((a: any, b: any) => {
      if (a.fullname < b.fullname) {
        return -1;
      } else if (a.fullname > b.fullname) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  sortStructure(labels: any) {
    labels.sort((a: any, b: any) => {
      if (a.nom < b.nom) {
        return -1;
      } else if (a.nom > b.nom) {
        return 1;
      } else {
        return 0;
      }
    });
  }


}
