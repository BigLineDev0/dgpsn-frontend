import { Component, Input, TemplateRef } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import saveAs from 'file-saver';
import { DocumentService } from 'src/app/services/document/document.service';
import { EvaluationfinanciereService } from 'src/app/services/evaluationfinanciere/evaluationfinanciere.service';
import { EvaluationperformanceService } from 'src/app/services/evaluationperformance/evaluationperformance.service';
import { ProjetEntrepriseService } from 'src/app/services/projet-entreprise/projet-entreprise.service';
import { Alertes } from 'src/app/util/alerte';
import { RESPONSE_STATUS } from 'src/app/util/response-status';
import { ResponseApi } from 'src/app/util/response.model';

@Component({
  selector: 'app-list-projet-entreprise',
  templateUrl: './list-projet-entreprise.component.html',
  styleUrls: ['./list-projet-entreprise.component.scss']
})
export class ListProjetEntrepriseComponent {

  @Input() projectToUpdate: any;
  @Input()projectId: any;
  @Input() category: any
  @Input() categoryId: any
  @Input() inputAgent: boolean
  evaluationFinanciere: any;
  evaluationPerformances: any;
  notationNotationValue:any;
  iconColorClass:any
  // colorIconPov:any
  @Input() statut: any
  loadingIndicator = true;
  datasource: any
  metadata: any
  agents:any
  pageOptions: any = { page: 0, size: 5};
  displayedColumns: string[] = [
    'entreprise',
    'role',
    'statut',
    'actions'
  ];
  // Contient les évaluations par entreprise
  document: any;
  documentId: any;
  modalRef: NgbModalRef;
  constructor(
    private projetEntrepriseService: ProjetEntrepriseService,
    private evaluationfinancementService: EvaluationfinanciereService,
    private evaluationPerformanceService: EvaluationperformanceService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
     this.getEntreprises()
  }

  openBasicModal(content: TemplateRef<any>, size?: any, entreprise?: any) {
    // this.projectId = entreprise
    this.projectToUpdate = entreprise
    console.log("this.projectId ", this.projectId )
    this.modalRef = this.modalService.open(content, {size: size, backdrop: 'static'});
  }


  deleteDocument(agentId: any) {
    Alertes.confirmAction(
      'Voulez-vous supprimé ?',
      'Cet element sera definitivement supprimé',
      () => {
        this.projetEntrepriseService.deletePropjetEntreprise(agentId).subscribe({
          next: response => {
            Alertes.alerteDeleteSuccess()
          },
          error: err => Alertes.errorPopPup('Suppression échouée',err?.error?.message),
          complete: () => this.getEntreprises()
          });
        });
   
  }
 
  refresh(event: boolean) {
    if (event) {
      this.getEntreprises()
    }
  }


getEntreprises() {
  this.loadingIndicator = false;
  let param = this.pageOptions;
  param.projectId = this.projectId;
  
  this.projetEntrepriseService.readProjetEntreprises(param).subscribe({
    next: response => {
      this.datasource = response?.content;
      this.metadata = response?.metadata;

      // Fetch evaluations for each entreprise automatically
      this.datasource.forEach((entreprise: any) => {
        this.showEvaluations(entreprise);
      });
    },
    error: err => this.loadingIndicator = false,
    complete: () => this.loadingIndicator = false
  });
}

showEvaluations(entreprise: any) {
  console.log();
  
  const entrepriseId = entreprise.entreprise.id;
  let param = { page: 0, size: 10000, entrepriseId: entrepriseId };

  this.evaluationfinancementService.readEvaluationfinancieres(param).subscribe({
    next: response => {
      const evaluations = response?.payload || [];
      if (evaluations.length > 0) {
        // Filtrer pour obtenir l'évaluation la plus récente par date de fin
        const evaluationRecent = evaluations.reduce((latest: any, current: any) => {
          const currentFinDate = new Date(current.datefin).getTime();
          const latestFinDate = new Date(latest.datefin).getTime();
          return currentFinDate > latestFinDate ? current : latest;
        });

        this.evaluationFinanciere = evaluationRecent;
        console.log(" this.evaluationFinanciere ", this.evaluationFinanciere);

        this.calculateNotation(entreprise, this.evaluationFinanciere, this.evaluationPerformances);
      }
    }
  });

  this.evaluationPerformanceService.readEvaluationperformances(param).subscribe({
    next: response => {
      const evaluations = response?.payload || [];
      if (evaluations.length > 0) {
        // Filtrer pour obtenir l'évaluation de performance la plus récente par date de fin
        const evaluationRecentPerformance = evaluations.reduce((latest: any, current: any) => {
          const currentFinDate = new Date(current.datefin).getTime();
          const latestFinDate = new Date(latest.datefin).getTime();
          return currentFinDate > latestFinDate ? current : latest;
        });

        this.evaluationPerformances = evaluationRecentPerformance;
        console.log(" this.evaluationPerformances", this.evaluationPerformances);
        
        this.calculateNotation(entreprise, this.evaluationFinanciere, this.evaluationPerformances);
      }
    }
  });
}

calculateNotation(entreprise: any, evaluationFinanciere: any, evaluationPerformances: any) {
  if (evaluationFinanciere && evaluationPerformances) {
    const financialNotation = evaluationFinanciere?.notation || 0;
    const performanceNotation = evaluationPerformances?.notation || 0;
    const notation = (financialNotation + performanceNotation) / 2;

    entreprise.iconColorClass = this.getIconColorStatut(notation);
    entreprise.colorIconPov = this.getIconColorPopov(notation);
  }
}

getIconColorStatut(notation: number): string {
  if (notation >= 60 && notation <= 100) {
    return 'bg-success'; 
  } else if (notation >= 30 && notation < 60) {
    return 'bg-warning-custom'; 
  } else {
    return 'bg-danger'; 
  }
}

getIconColorPopov(notation: number): string {
  if (notation >= 0 && notation <= 30) {
    return 'text-danger'; 
  } else if (notation > 31 && notation <= 60) {
    return 'text-warning-custom'; 
  } else if (notation > 60 && notation <= 100) {
    return 'text-success';
  }
   return '';  
}

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getEntreprises()
  }

}