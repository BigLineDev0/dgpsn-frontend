// import {Component, Input, OnInit, ViewChild} from '@angular/core';
// import {GanttEditorComponent, GanttEditorOptions} from "ng-gantt";



// @Component({
//   selector: 'app-diagramme-gantt-jalon-projet',
//   templateUrl: './diagramme-gantt-jalon-projet.component.html',
//   styleUrls: ['./diagramme-gantt-jalon-projet.component.scss']
// })
// export class DiagrammeGanttJalonProjetComponent implements OnInit {

//   editorOptions:GanttEditorOptions;
//   data:any;
//   projetId: any;
//   jalons:any;
//   pageOptions: any = {page: 0, size: 100}

//   ngOnInit(): void {
//     this.getProjectId();
//     this.getAllJalons();
//     this.ganttDiagramme();
//   }

//   constructor(
//     private milestoneService: MilestoneService,
//   ) {
//     this.editorOptions = {
//       // vEditable:true,
//       vCaptionType: 'Complete',
//       vResources: 'Responsable',
//       vLang:'fr',
//       // vShowSelector:'Bottom',
//       vShowEndDate:false,
//       // vFormat:'Month',
//       vShowStartDate:false,
//       vShowRes:false,
//       vShowDur:false,
//       vShowComp:true,
//       vShowTaskInfoDur:false,
//       vShowTaskInfoRes:false,
//       vShowTaskInfoEndDate:false,
//       vShowTaskInfoStartDate:false,
//       vFormat: 'month',
//       // vShowTaskInfoAdditionalHeaders:true,
//       vShowTaskInfoLink: 1,
//       vQuarterColWidth: 100,
//       vAdditionalHeaders: {
//         // pLibelle: {
//         //   title: 'Libelle',
//         // },
//         pPrevue: {
//           title: 'Date prévue',
//         },
//         pReel: {
//           title: 'Date réel',
//         }
//       },
//       vColumnOrder: [
//         'vAdditionalHeaders',
//         'vShowComp'
//       ],

//     };

//     // this.data = [
//     //   {
//     //     pID: 10,
//     //     pName: "Obtention du terrain",
//     //     pLibelle: "Obtention du terrain",
//     //     pStart: "2024-01-01",
//     //     pEnd: "2024-01-01",
//     //     pPrevue: "2024-01-01",
//     //     pReel: "2023-12-20",
//     //     pClass: "",
//     //     pLink: "",
//     //     pMile: 1,
//     //     pRes: "Test",
//     //     pComp: 100,
//     //     pGroup: 0,
//     //     pParent: 0,
//     //     pOpen: 1,
//     //     pDepend: "",
//     //     pCaption: "",
//     //     pNotes: "Recherche et sélection d'un terrain adéquat pour la construction de l'école primaire."
//     //   },
//     //   {
//     //     pID: 11,
//     //     pName: "Approbation des plans",
//     //     pLibelle: "Approbation des plans",
//     //     pStart: "2024-01-30",
//     //     pEnd: "2024-01-30",
//     //     pPrevue: "2024-01-25",
//     //     pReel: "2024-01-30",
//     //     pClass: "",
//     //     pLink: "",
//     //     pMile: 1,
//     //     pRes: "Test",
//     //     pComp: 100,
//     //     pGroup: 0,
//     //     pParent: 0,
//     //     pOpen: 1,
//     //     pDepend: "",
//     //     pCaption: "",
//     //     pNotes: "Finalisation et approbation des plans architecturaux pour l'école primaire."
//     //   },
//     //   {
//     //     pID: 12,
//     //     pName: "Préparation du site",
//     //     pLibelle: "Préparation du site",
//     //     pStart: "2024-02-16",
//     //     pEnd: "2024-02-16",
//     //     pPrevue: "2024-02-10",
//     //     pReel: "2024-02-16",
//     //     pClass: "",
//     //     pLink: "",
//     //     pMile: 1,
//     //     pRes: "Test",
//     //     pComp: 100,
//     //     pGroup: 0,
//     //     pParent: 0,
//     //     pOpen: 1,
//     //     pDepend: "",
//     //     pCaption: "",
//     //     pNotes: "Nettoyage du terrain, nivellement du sol et préparation du site pour la construction."
//     //   },
//     //   {
//     //     pID: 13,
//     //     pName: "Fondations achevées",
//     //     pLibelle: "Fondations achevées",
//     //     pStart: "2024-03-27",
//     //     pEnd: "2024-03-27",
//     //     pPrevue: "2024-03-15",
//     //     pReel: "",
//     //     pClass: "",
//     //     pLink: "",
//     //     pMile: 1,
//     //     pRes: "Test",
//     //     pComp: 0,
//     //     pGroup: 0,
//     //     pParent: 0,
//     //     pOpen: 1,
//     //     pDepend: "",
//     //     pCaption: "",
//     //     pNotes: "Achèvement des travaux de fondations de l'école primaire."
//     //   },
//     //   {
//     //     pID: 14,
//     //     pName: "Structure principale achevée",
//     //     pLibelle: "Structure principale achevée",
//     //     pStart: "2024-05-07",
//     //     pEnd: "2024-05-07",
//     //     pPrevue: "2024-04-20",
//     //     pReel: "",
//     //     pClass: "",
//     //     pLink: "",
//     //     pMile: 1,
//     //     pRes: "Test",
//     //     pComp: 0,
//     //     pGroup: 0,
//     //     pParent: 0,
//     //     pOpen: 1,
//     //     pDepend: "",
//     //     pCaption: "",
//     //     pNotes: "Achèvement de la construction de la structure principale de l'école, y compris les murs extérieurs et le toit."
//     //   },
//     //   {
//     //     pID: 15,
//     //     pName: "Intérieurs terminés",
//     //     pLibelle: "Intérieurs terminés",
//     //     pStart: "2024-05-31",
//     //     pEnd: "2024-05-31",
//     //     pPrevue: "2024-05-15",
//     //     pReel: "",
//     //     pClass: "",
//     //     pLink: "",
//     //     pMile: 1,
//     //     pRes: "Test",
//     //     pComp: 0,
//     //     pGroup: 0,
//     //     pParent: 0,
//     //     pOpen: 1,
//     //     pDepend: "",
//     //     pCaption: "",
//     //     pNotes: "Achèvement des travaux intérieurs tels que l'installation électrique, la plomberie, les cloisons, les sols, etc."
//     //   },
//     //   {
//     //     pID: 16,
//     //     pName: "Aménagements extérieurs",
//     //     pLibelle: "Aménagements extérieurs",
//     //     pStart: "2024-06-30",
//     //     pEnd: "2024-06-30",
//     //     pPrevue: "2024-06-01",
//     //     pReel: "",
//     //     pClass: "",
//     //     pLink: "",
//     //     pMile: 1,
//     //     pRes: "Test",
//     //     pComp: 0,
//     //     pGroup: 0,
//     //     pParent: 0,
//     //     pOpen: 1,
//     //     pDepend: "",
//     //     pCaption: "",
//     //     pNotes: "Finalisation des aménagements extérieurs tels que les aires de jeux, les terrains de sport, les zones de stationnement, etc."
//     //   },
//     //   {
//     //     pID: 17,
//     //     pName: "Inspection finale",
//     //     pLibelle: "Inspection finale",
//     //     pStart: "2024-08-30",
//     //     pEnd: "2024-08-30",
//     //     pPrevue: "2024-07-30",
//     //     pReel: "",
//     //     pClass: "",
//     //     pLink: "",
//     //     pMile: 1,
//     //     pRes: "Test",
//     //     pComp: 0,
//     //     pGroup: 0,
//     //     pParent: 0,
//     //     pOpen: 1,
//     //     pDepend: "",
//     //     pCaption: "",
//     //     pNotes: "Inspection finale de l'école primaire pour s'assurer de sa conformité aux normes de construction et de sécurité."
//     //   },
//     //   {
//     //     pID: 18,
//     //     pName: "Remise des clés",
//     //     pLibelle: "Remise des clés",
//     //     pStart: "2024-11-30",
//     //     pEnd: "2024-11-30",
//     //     pPrevue: "2024-11-01",
//     //     pReel: "",
//     //     pClass: "",
//     //     pLink: "",
//     //     pMile: 1,
//     //     pRes: "Test",
//     //     pComp: 0,
//     //     pGroup: 0,
//     //     pParent: 0,
//     //     pOpen: 1,
//     //     pDepend: "",
//     //     pCaption: "",
//     //     pNotes: "Remise officielle de l'école primaire au client ou à l'autorité compétente."
//     //   },
//     //   {
//     //     pID: 19,
//     //     pName: "Inauguration",
//     //     pLibelle: "Inauguration",
//     //     pStart: "2024-07-30",
//     //     pEnd: "2024-07-30",
//     //     pPrevue: "2024-07-30",
//     //     pReel: "",
//     //     pClass: "",
//     //     pLink: "",
//     //     pMile: 1,
//     //     pRes: "Test",
//     //     pComp: 0,
//     //     pGroup: 0,
//     //     pParent: 0,
//     //     pOpen: 1,
//     //     pDepend: "",
//     //     pCaption: "",
//     //     pNotes: "Célébration officielle de l'achèvement et de l'ouverture de l'école primaire."
//     //   },
//     // ];

//   }

//   getProjectId() {
//     this.projetId = localStorage.getItem('projectId')!;
//   }

//   getAllJalons() {
//     this.pageOptions.projectId = this.projetId;
//     this.milestoneService.readMilestoneProjects(this.pageOptions).subscribe(
//       {
//         next: response => {
//           this.jalons = response.content;

//         },
//         error: err => {
//           console.log(err);
//         },
//         complete: () => {
//         }
//       });

//   }
//   // data:any;

//   ganttDiagramme() {
//     this.pageOptions.projectId = localStorage.getItem('projectId');
//     this.milestoneService.readMilestoneProjects(this.pageOptions).subscribe({
//       next: response => {
//         this.jalons = response.content;
//         console.log("Jalons recup :",response?.content)
//         // Map jalons to Gantt data format
//         this.data = response.content.map((jalon: any) => ({
//           pID: jalon.id,
//           pName: jalon.libelle,
//           pLibelle: jalon.libelle,
//           pStart: jalon.predicatedDate? this.convertTimestampToDate(jalon.predicatedDate) : this.convertTimestampToDate(jalon.readDate),
//           pEnd: this.convertTimestampToDate(jalon.readDate),
//           pPrevue: this.convertTimestampToDate(jalon.predicatedDate),
//           pReel: this.convertTimestampToDate(jalon.readDate),
//           pClass: "",
//           pLink: "",
//           pMile: 1,
//           pRes: "",
//           pComp: 100,
//           pGroup: 0,
//           pParent: 0,
//           pOpen: 1,
//           pDepend: "",
//           pCaption: "",
//           pNotes: jalon.comment || ""
//         }));

//         console.log('Mapped jalons for Gantt:', this.data);
//       },
//       error: err => {
//         console.log(err);
//       },
//       complete: () => {}
//     });
//   }


//   convertTimestampToDate(timestamp: number): string {
//     const date = new Date(timestamp);
//     const year = date.getFullYear();
//     const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-indexed
//     const day = ('0' + date.getDate()).slice(-2);
//     return `${year}-${month}-${day}`;  // Returns date in YYYY-MM-DD format
//   }

// }
