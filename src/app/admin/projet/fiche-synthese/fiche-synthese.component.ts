// import {Component, Input, TemplateRef, ViewChild} from '@angular/core';
// import {DomSanitizer} from '@angular/platform-browser';
// import {NgbCalendar, NgbDate, NgbDateParserFormatter, NgbModal} from '@ng-bootstrap/ng-bootstrap';
// import {ActeurProjetService} from 'src/app/services/acteur-projet/acteur-projet.service';
// import {AssignmentService} from 'src/app/services/assignment/assignment.service';
// import {ComponentService} from 'src/app/services/component/component.service';
// import {ConditionnalityService} from 'src/app/services/conditionnality/conditionnality.service';
// import {DocumentService} from 'src/app/services/document/document.service';
// import {FundingService} from 'src/app/services/funding/funding.service';
// import {GeographicalLocationService} from 'src/app/services/geographical-location/geographical-location.service';
// import {IssueLogService} from 'src/app/services/issue-log/issue-log.service';
// import {IssueLogComponentService} from 'src/app/services/issueLogComponent/issue-log-component.service';
// import {MediathequeService} from 'src/app/services/mediatheque/mediatheque.service';
// import {MilestoneService} from 'src/app/services/milestone/milestone.service';
// import {PreparationService} from 'src/app/services/preparation/preparation.service';
// import {QueryService} from 'src/app/services/query/query.service';
// import {RecommendationService} from 'src/app/services/recommendation/recommendation.service';
// import {ReviewService} from 'src/app/services/review/review.service';
// import {RiskService} from 'src/app/services/risk/risk.service';
// import {StatusQueryService} from 'src/app/services/status-query/status-query.service';
// import {UgpService} from 'src/app/services/ugp/ugp.service';
// import {ValueIndicatorService} from 'src/app/services/value-indicator/value-indicator.service';
// import {DisbursementrateService} from "../../../../services/disbursementrate/disbursementrate.service";
// import {ManangementUnitService} from "../../../../services/manangement-unit/manangement-unit.service";
// import {ImpactObjetifService} from "../../../../services/impact-objectif/impact-objetif.service";
// import {FinancementActivityService} from "../../../../services/financementActivity/financement-activity.service";
// import {FormControl, FormGroup} from "@angular/forms";
// import {HistoryFlagService} from "../../../../services/history-flag/history-flag.service";

// import {
//   ApexAxisChartSeries,
//   ApexChart,
//   ApexDataLabels,
//   ApexGrid,
//   ApexLegend,
//   ApexMarkers,
//   ApexStroke,
//   ApexTitleSubtitle,
//   ApexXAxis,
//   ApexYAxis,
//   ChartComponent
// } from "ng-apexcharts";
// import {CompletionRateService} from "../../../../services/completionRate/completion-rate.service";

// export type ChartOptions = {
//   series: ApexAxisChartSeries;
//   chart: ApexChart;
//   xaxis: ApexXAxis;
//   stroke: ApexStroke;
//   dataLabels: ApexDataLabels;
//   markers: ApexMarkers;
//   colors: string[];
//   yaxis: ApexYAxis;
//   grid: ApexGrid;
//   legend: ApexLegend;
//   title: ApexTitleSubtitle;
// };

// @Component({
//   selector: 'app-fiche-synthese',
//   templateUrl: './fiche-synthese.component.html',
//   styleUrls: ['./fiche-synthese.component.scss']
// })
// export class FicheSyntheseComponent {

//   @ViewChild("chart", { static: false }) chart: ChartComponent;
//   public chartOptions: Partial<ChartOptions> | any;

//   hoveredDate: NgbDate | null = null;
//   fromDate: NgbDate | null;
//   toDate: NgbDate | null;
//   form:FormGroup;
//   formTaux:FormGroup;
//   @Input() projetId: any;
//   projet: any;
//   recommandations: any = [];
//   imageUrl: any;
//   acteurs: any;
//   dates: any;
//   localisations: any;
//   budgets: any;
//   risques: any;
//   problemes: any;
//   indicateurs: any;
//   images: any;
//   annees: any;
//   videos: any;
//   documents: any;
//   ugps: any;
//   tauxAvancements: any;
//   previsions: any;
//   realisations: any;
//   loadingChart: boolean=true;
//   objectifsSpecifiques: any;
//   impactAttendus: any;
//   urls: any = [];
//   budget: number = 0;

//   components: any = [];
//   pointvigilances: any = [];
//   taux: any;


//   constructor(
//     private sanitizer: DomSanitizer,
//     private projetService: ManangementUnitService,
//     private preparationService: PreparationService,
//     private conditionnalityService: ConditionnalityService,
//     private assignmentService: AssignmentService,
//     private queryService: QueryService,
//     private reviewService: ReviewService,
//     private issueLogService: IssueLogService,
//     private impactObjetifService: ImpactObjetifService,
//     private riskService: RiskService,
//     private actorProjectService: ActeurProjetService,
//     private milestoneService: MilestoneService,
//     private budgetService: FinancementActivityService,
//     private documentService: DocumentService,
//     private fundingService: FundingService,
//     private valueIndicatorService: ValueIndicatorService,
//     private mediathequeService: MediathequeService,
//     private geoService: GeographicalLocationService,
//     private recommendationService: RecommendationService,
//     private statusQueryService: StatusQueryService,
//     private ugpService: UgpService,
//     private composantesServices: ComponentService,
//     private issueLogComponentService: IssueLogComponentService,
//     private disebursememtService: DisbursementrateService,
//     private modalService: NgbModal,
//     public formatter: NgbDateParserFormatter,
//     private historyFlagService: HistoryFlagService,
//     private completionRateService: CompletionRateService,
//     private calendar: NgbCalendar

//   ) {
//     this.fromDate = calendar.getToday();
//     this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
//     this.chartOptions = {
//       series: [
//         {
//           name: "PRÉVISIONS",
//           data: []
//         },
//         {
//           name: "RÉALISATIONS",
//           data: []
//         }
//       ],
//       chart: {
//         height: 250,
//         type: "line",
//         dropShadow: {
//           enabled: true,
//           color: "#000",
//           top: 18,
//           left: 7,
//           blur: 10,
//           opacity: 0.2
//         },
//         toolbar: {
//           show: false
//         }
//       },
//       colors: ["#77B6EA", "#545454"],
//       dataLabels: {
//         enabled: true
//       },
//       stroke: {
//         curve: "smooth"
//       },
//       title: {
//         text: "",
//         align: "left"
//       },
//       grid: {
//         borderColor: "#e7e7e7",
//         row: {
//           colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
//           opacity: 0.5
//         }
//       },
//       markers: {
//         size: 1
//       },
//       xaxis: {
//         categories: ["Trim 1", "Trim 2", "Trim 3", "Trim 4"],
//         title: {
//           text: "Trimestre"
//         }
//       },
//       yaxis: {
//         title: {
//           text: "Taux"
//         },
//         min: 0,
//         max: 100
//       },
//       legend: {
//         position: "top",
//         horizontalAlign: "right",
//         floating: true,
//         offsetY: -25,
//         offsetX: -5
//       }
//     };
//   }

//   ngOnInit(): void {
//     this.annees = this.generateYears();
//     this.initForm()
//     this.readIssueLogs()
//     this.readProjet()
//     this.getAllDocumentOfProject()
//     this.getAllValueIndicatorsOfProject()
//     this.readImages()
//     this.readVideos()
//     this.getAllActorsOfProjet()
//     // this.getAllMilestoneOfProject()
//     this.readGeo()
//     this.getAllObjectifsSpec()
//     this.getAllImpactsAtten()
//     this.getAllFundingsOfProject()
//     this.readGeo();
//     this.getAllUgpsOfProjet()
//     this.readDisbursementRqte();
//     this.getTauxAvancement();

//   }

//   initForm(){
//     this.form = new FormGroup({
//       dateDebut: new FormControl(''),
//       dateFin: new FormControl(''),
//     })
//     this.formTaux = new FormGroup({
//       year: new FormControl(new Date().getFullYear()-1),
//     })
//   }

//   generateYears(): { value: number }[] {
//     const listYears: { value: number }[] = [];
//     const dateActu: Date = new Date();
//     for (let year = dateActu.getFullYear(); year >= 1960; year--) {
//       listYears.push({ value: year });
//     }
//     return listYears;
//   }




//   getTauxAvancement() {
//     this.loadingChart=true;
//       this.completionRateService.readCompletions(this.projetId, this.formTaux.value.year).subscribe({
//         next:reponse=>{
//           this.tauxAvancements = reponse.body;
//           this.previsions = this.calculTotalPrevision(this.tauxAvancements)!.map((value: number) => parseFloat(value.toFixed(2)));
//           this.realisations = this.calculTotalRealisations(this.tauxAvancements)!.map((value: number) => parseFloat(value.toFixed(2)));

//           const maxRealisation = Math.max(...this.realisations);
//           const maxPrevision = Math.max(...this.previsions);
//           const maxYValue = Math.ceil(Math.max(maxRealisation, maxPrevision));
//           this.chartOptions = {
//             ...this.chartOptions,
//             series: [
//                 {
//                   name: "PRÉVISIONS",
//                   data: this.previsions
//                 },
//                 {
//                   name: "RÉALISATIONS",
//                   data: this.realisations
//                 }
//             ],
//             yaxis: {
//               title: {
//                 text: "Taux"
//               },
//               min: 0,
//               max: maxYValue
//             },
//           };
//         },
//         error:err => {
//         },
//         complete:()=>{
//           this.loadingChart = false;
//         }
//       })
//   }

//   buildChart(realisations:any,previsions:any){
//     const maxRealisation = Math.max(this.realisations);
//     const maxPrevision = Math.max(this.previsions);
//     const maxYValue = Math.ceil(Math.max(maxRealisation, maxPrevision)) + 10;

//     this.chartOptions = {
//       ...this.chartOptions,
//       series: [
//         {
//           name: "PRÉVISIONS",
//           data: previsions
//         },
//         {
//           name: "RÉALISATIONS",
//           data: realisations
//         }
//       ],
//     };

//   }

//   calculTotalPrevision(project: any) {
//     let totalPrevision: any = [0, 0, 0, 0];
//     if (project.managementUnit?.formula?.name == 'SOMME') {
//       project?.children.map((item: any) => {
//         item.completionRates.map((c: any) => {
//           if (c.period.name == 'T1') {
//             totalPrevision[0] += c.targetValue
//           } else if (c.period.name == 'T2') {
//             totalPrevision[1] += c.targetValue
//           } else if (c.period.name == 'T3') {
//             totalPrevision[2] += c.targetValue
//           } else if (c.period.name == 'T4') {
//             totalPrevision[3] += c.targetValue
//           }

//         })
//       })
//       totalPrevision[0] = totalPrevision[0] / project.children.length
//       totalPrevision[1] = totalPrevision[1] / project.children.length
//       totalPrevision[2] = totalPrevision[2] / project.children.length
//       totalPrevision[3] = totalPrevision[3] / project.children.length
//     } else {
//       project?.children.map((item: any) => {
//         item.completionRates.map((c: any) => {
//           if (c.period.name == 'T1') {
//             totalPrevision[0] += c.targetValue * item.managementUnit?.poids
//           } else if (c.period.name == 'T2') {
//             totalPrevision[1] += c.targetValue * item.managementUnit?.poids
//           } else if (c.period.name == 'T3') {
//             totalPrevision[2] += c.targetValue * item.managementUnit?.poids
//           } else if (c.period.name == 'T4') {
//             totalPrevision[3] += c.targetValue * item.managementUnit?.poids
//           }

//         })
//       })
//       totalPrevision[0] = totalPrevision[0] / this.calculTotalPoids(project.children)
//       totalPrevision[1] = totalPrevision[1] / this.calculTotalPoids(project.children)
//       totalPrevision[2] = totalPrevision[2] / this.calculTotalPoids(project.children)
//       totalPrevision[3] = totalPrevision[3] / this.calculTotalPoids(project.children)
//     }

//     return totalPrevision
//   }

//   calculTotalRealisations(project: any) {
//     let totalRealisation: any = [0, 0, 0, 0];
//     if (project.managementUnit?.formula?.name == 'SOMME') {
//       project.children.map((item: any) => {
//         item.completionRates.map((c: any) => {
//           if (c.period.name == 'T1') {
//             totalRealisation[0] += c.valueReched
//           } else if (c.period.name == 'T2') {
//             totalRealisation[1] += c.valueReched
//           } else if (c.period.name == 'T3') {
//             totalRealisation[2] += c.valueReched
//           } else if (c.period.name == 'T4') {
//             totalRealisation[3] += c.valueReched
//           }
//         })
//       })
//       totalRealisation[0] = totalRealisation[0] / project.children.length
//       totalRealisation[1] = totalRealisation[1] / project.children.length
//       totalRealisation[2] = totalRealisation[2] / project.children.length
//       totalRealisation[3] = totalRealisation[3] / project.children.length
//     } else {
//       project?.children.map((item: any) => {
//         item.completionRates.map((c: any) => {
//           if (c.period.name == 'T1') {
//             totalRealisation[0] += c.valueReched * item.managementUnit?.poids
//           } else if (c.period.name == 'T2') {
//             totalRealisation[1] += c.valueReched * item.managementUnit?.poids
//           } else if (c.period.name == 'T3') {
//             totalRealisation[2] += c.valueReched * item.managementUnit?.poids
//           } else if (c.period.name == 'T4') {
//             totalRealisation[3] += c.valueReched * item.managementUnit?.poids
//           }

//         })
//       })
//       totalRealisation[0] = totalRealisation[0] / this.calculTotalPoids(project.children)
//       totalRealisation[1] = totalRealisation[1] / this.calculTotalPoids(project.children)
//       totalRealisation[2] = totalRealisation[2] / this.calculTotalPoids(project.children)
//       totalRealisation[3] = totalRealisation[3] / this.calculTotalPoids(project.children)
//     }
//     return totalRealisation
//   }


//   calculTotalPoids(children: any) {
//     let poidsTotal = 0;
//     children.map((item: any) => {
//       poidsTotal = poidsTotal + item.managementUnit.poids
//     })
//     return poidsTotal
//   }

//   chargerDataOnPeriode(){
//     console.log("form :",this.form.value);
//   }

//   onDateSelection(date: NgbDate) {
//     if (!this.fromDate && !this.toDate) {
//       this.fromDate = date;
//       this.form.value.dateDebut = date;
//     } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
//       this.toDate = date;
//       this.form.value.dateFin = date;
//     } else {
//       this.toDate = null;
//       this.fromDate = date;
//       this.form.value.dateDebut = date;
//       this.form.value.dateFin = null;
//     }
//   }

//   isHovered(date: NgbDate) {
//     return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
//   }

//   isInside(date: NgbDate) {
//     return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
//   }

//   isRange(date: NgbDate) {
//     return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
//   }

//   validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
//     const parsed = this.formatter.parse(input);
//     return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
//   }

//   // getAllHistoriesFlags() {
//   //   let req = {page:0,size:100};
//   //   req.projectId = this.projectId;
//   //   this.historyFlagService.readHistoriesFlagProjects(this.pageOptions).subscribe({
//   //     next: value => {this.datasource = value;
//   //       this.flags=value.content
//   //     },
//   //     error: err => {
//   //       console.log(err);
//   //       this.loadingIndicator=false;
//   //
//   //     },
//   //     complete: () => {
//   //       this.loadingIndicator = false;
//   //     }
//   //   })
//   // }

//   getUniqueSectorLabels(subSectors:any){
//     if (!subSectors || subSectors.length === 0){
//       return '';
//     }else{
//       const sectorLabels = subSectors.map((secteur:any) => secteur.sector.libelle);
//       const uniqueSectorLabels = Array.from(new Set(sectorLabels));
//       return uniqueSectorLabels.join(', ');
//     }
//   }
//   readIssueLogs() {
//     const req = { projetId: this.projetId }
//     this.issueLogService.readIssuelogs(req).subscribe(data => {
//       this.problemes = data.content;
//       this.readRecommendations();
//       this.getIssueLogComponent()

//     })
//   }

//   readProjet() {
//     this.projetService.readProjet(this.projetId).subscribe(response => {
//       this.projet = response.body;
//       console.log("project ", this.projet);
//       this.budget = this.projet?.equivalence;
//     })
//   }

//   getAllObjectifsSpec() {
//     let params:any={};
//     params.managementUnitId = this.projetId;
//     params.detailType = "OBJECTIVE";
//     params.page = 0;
//     params.size = 100;
//     this.impactObjetifService.readAllImpactObjectif(params).subscribe({
//       next: (value) => {
//         this.objectifsSpecifiques = value?.content;
//       },
//       error: value => {
//       },
//       complete: () => {
//       }
//     });
//   }

//   getAllImpactsAtten() {
//     let params:any={};
//     params.managementUnitId = this.projetId;
//     params.detailType = "IMPACT";
//     params.page = 0;
//     params.size = 100;
//     this.impactObjetifService.readAllImpactObjectif(params).subscribe({
//       next: (value) => {
//         this.impactAttendus = value?.content;
//       },
//       error: value => {
//       },
//       complete: () => {
//       }
//     });
//   }


//   getAllDocumentOfProject() {
//     const req = { projetId: this.projetId };
//     this.documentService.readDocumentOfProjects(req).subscribe({
//       next: value => this.documents = value.content
//     })
//   }

//   getAllFundingsOfProject() {
//     const req = { managementUnitId: this.projetId };
//     this.budgetService.readAllSource(req).subscribe(
//       {
//         next: response => {
//           this.budgets = response.content;
//         },
//         error: err => {
//           console.log(err);
//         },
//         complete: () => {
//         }
//       })
//   }

//   getAllValueIndicatorsOfProject() {
//     const req = { projectId: this.projetId, page: 0, size: 20};
//     this.valueIndicatorService.readValueIndicatorProjects(req).subscribe({
//       next:reponse=>{
//         this.indicateurs = reponse?.content;
//         console.log("this.indicateurs :",reponse)
//       },
//       error:err=>{
//         console.log("error recup indicateur :",err);
//       }

//     })
//   }

//   readImages() {
//     const req = {
//       projectId: this.projetId,
//       mediathequeType: "IMAGE"
//     };
//     // console.log("req ", req)
//     this.mediathequeService.readMediathequeOfProjects(req).subscribe({
//       next: value => {
//         this.images = value.content!;
//         this.getUrlImage();
//       }

//     })
//   }

//   openImage(content: TemplateRef<any>, url: any) {
//     this.imageUrl = url;
//     this.modalService.open(content, { size: 'lg' }).result.then((result) => {
//     })
//       .catch((res) => { });
//   }

//   getUrlImage() {
//     console.log("images ", this.images)
//     this.images.forEach((element: any) => {
//       this.mediathequeService.readFile(element.id).subscribe(data => {
//         if (data) {
//           var file = new Blob([data], { type: 'image/jpg' });
//           this.urls.push(URL.createObjectURL(file));
//         }
//       })
//     });

//   }

//   readVideos() {
//     const req = {
//       projectId: this.projetId,
//       mediathequeType: "VIDEO"
//     };

//     this.mediathequeService.readMediathequeOfProjects(req).subscribe({
//       next: value => this.videos = value.content
//     })
//   }

//   getAllActorsOfProjet() {
//     const req = { projectId: this.projetId }

//     this.actorProjectService.readActorProjects(req).subscribe(response => {
//       this.acteurs = response.content;
//     })
//   }

//   getAllMilestoneOfProject() {
//     const req = { projectId: this.projetId };

//     this.milestoneService.readMilestoneProjects(req).subscribe(reponse => {
//       this.dates = reponse.content;
//     })
//   }

//   readGeo() {
//     const req = { projetId: this.projetId }
//     this.geoService.readgeographicalLocations(req).subscribe(data => {
//       this.localisations = data.content;

//     })
//   }

//   readRecommendations() {
//     let req = {projectId: this.projetId}
//     this.recommendationService.readRecommendations(req).subscribe(data => {
//       this.recommandations = data.content;

//     })
//   }

//   getRecommandations(idProbleme: any) {
//     let recommandations: any[] = [];
//     this.recommandations.forEach((item: any) => {
//       if (item.issueLog?.id === idProbleme) {
//         recommandations.push(item)
//       }
//     });
//     return recommandations;
//   }

//   getRecommandationsByRisk(idRisk: any) {
//     let recommandations: any[] = [];
//     this.recommandations.forEach((item: any) => {
//       if (item.risk?.id === idRisk) {
//         recommandations.push(item)
//       }
//     });
//     return recommandations;
//   }

//   getAllUgpsOfProjet() {
//     const req = {
//       projectId: this.projetId,

//     }
//     this.ugpService.readUgpProjects(req).subscribe(response=> {
//       this.ugps = response.content;
//     })
//   }

//   getComponents(issueLogId: any) {
//     let componentAffecteds: any[] = [];
//     this.components.forEach((item: any) => {
//       if (item.issueLog?.id === issueLogId) {
//         componentAffecteds.push(item.component)
//       }
//     });
//     return componentAffecteds;
//   }

//   getIssueLogComponent(){
//     let req = {projectId: this.projetId}
//     this.issueLogComponentService.readissuelogComponents(req).subscribe(data=>{
//       this.components = data.content;
//       // console.log("components ", this.components)
//     })
//   }

//   readDisbursementRqte() {
//     // const req = { projetId: this.projetId }
//     this.disebursememtService.readdisbursementRateForFiche(this.projetId).subscribe({
//       next:data=>{
//         this.taux = data.body;
//         console.log("taux ", this.taux)
//       },
//       error:err => {
//         console.log("error taux ", err)
//       }
//     })
//   }

// }
