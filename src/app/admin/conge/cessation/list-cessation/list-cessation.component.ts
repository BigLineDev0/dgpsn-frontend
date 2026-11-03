import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FeatherIconDirective } from '@core/feather-icon/feather-icon.directive';
import { NgbAccordionModule, NgbAlertModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { QuillModule } from 'ngx-quill';
import { PriseServiceService } from 'src/app/services/cessation/prise-service.service';
import { CongeService } from 'src/app/services/conge/conge.service';
import { Alertes } from 'src/app/util/alerte';
import { Authority } from 'src/app/util/Authority';
import { AddDemandeComponent } from '../../demande-conge/add-demande/add-demande.component';
import { FormCessationComponent } from '../form-cessation/form-cessation.component';
import { CessationComponent } from '../cessation/cessation.component';

@Component({
  selector: 'app-list-cessation',
  templateUrl: './list-cessation.component.html',
  styleUrls: ['./list-cessation.component.scss'],
   imports: [
    CommonModule,
    CessationComponent,
     NgbPaginationModule,
        NgbDropdownModule,
        SpinnerComponent,
        MatTabsModule,
        NgbAccordionModule,
        MatDialogModule,
        MatTableModule,
        NgbTooltipModule,
        MatMenuModule,
        MatIconModule,
        MatDialogModule,
        FeatherIconDirective,
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
        FormCessationComponent
  ],
})
export class ListCessationComponent {
  isValidationToggled: boolean = false;
  documentPath: any;
  basicModalCloseResult!: string;
  cessationToUpdate: any;
  loadingIndicator = true;
  pageOptions: any = { page: 0, size: 20 };
  dataSource: any;
  soldeAnnuel: number = 0;
  soldeTotale: number = 0;
  congeId: any
  congeAgentName: any
  matricule: string | null = null;
  object: any;
  showAlert: boolean = false;
  alertType: string = '';
  alertMessage: string = '';
  add = "";
  updated = "";
  deleted ="";
  generer_decision = "";
  generer_demande ="";
  conge: any
  displayedColumns: string[] = [
    'nombreDeJoursdemande',
    'dateDemande',
    'libelle',
    'objet',
    // 'piece',
    'actions',
  ];
  constructor(
    private modalService: NgbModal,
    private cessationService: PriseServiceService,
    private congeService: CongeService
  ) {
  }

  ngOnInit() {
    this.congeId = localStorage.getItem('congeId');
    this.getAllCessation();
    this.getCongeId();

  }

  getAllCessation() {
    this.loadingIndicator = true;
    const params = this.pageOptions;
    params.congeId = this.congeId
    this.cessationService.readAll(params).subscribe({
      next: response => {
        console.log('response', response);
        this.dataSource = response;
        this.object = response?.payload[0];
        console.log('this.object:', this.object);
      },
      error: response => console.log(response),
      complete: () => this.loadingIndicator = false
    })

    this.getSoldeAnnuel(this.congeId);
    this.getSoldeTotalConge(this.congeId);



  }

  openBasicModal(content: TemplateRef<any>, size?: any, cessation?: any) {
    this.cessationToUpdate = cessation;
    this.conge = cessation
    console.log('CESSATION', this.cessationToUpdate);

    this.modalService.open(content, { size: size, backdrop: 'static' }).result.then((result) => {

    }).catch((res) => {
    });
  }

  close(event: boolean) {
    if (event) {
      this.modalService.dismissAll();
      this.getAllCessation();
    }
  }

  getSoldeAnnuel(congeId: number) {
    this.cessationService.getSoldeAnnuel(congeId).subscribe({
      next: (solde) => {
        this.soldeAnnuel = solde;
      },
      error: (err) => {
        // console.error('Error fetching soldeAnnuel:', err);
      }
    });
  }

  getSoldeTotalConge(congeId: number) {
    this.cessationService.getSoldeTotalConge(congeId).subscribe({
      next: (solde) => {
        console.log('solde', solde)
        this.soldeTotale = solde;
      },
      error: (err) => {
        // console.error('Error fetching soldeAnnuel:', err);
      }
    });
  }


  delete(cessationId: any) {
    Alertes.confirmAction(
      'Voulez-vous supprimé ?',
      'Cet element sera definitivement supprimé',
      () => {
        this.cessationService.delete(cessationId).subscribe({
          next: response => {
            Alertes.alerteDeleteSuccess()
          },
          error: response => console.log(response),
          complete: () => this.getAllCessation()
        })
      }
    );
  }

  doSearch(data: any) {
    this.pageOptions = data;
    this.pageOptions.page = 0;
    this.pageOptions.size = 20;
    this.getAllCessation();
  }
  paginate($event: any) {
    this.loadingIndicator = true;
    this.pageOptions.page = $event - 1;
    this.getAllCessation();
  }

  exportExcel() {
  }

  exportPdf() {

  }




  validateDemande(agent: any) {
    Alertes.confirmAction(
      'Voulez-vous valider les congés pour cet agent ?',
      'Cet agent sera marqué comme validé pour ses congés.',
      () => {
        agent.isValidated = !agent.isValidated;
      }
    );
  }


  getBadgeClass(statut: any) {
    switch (statut.name) {
      case 'ACCEPTER':
        return 'badge text-bg-success';
      case 'REFUSER':
        return 'badge text-bg-danger';
      default:
        return 'badge text-bg-secondary';
    }

  }

  showAlertMessage(type: string, message: string) {
    this.alertType = type;
    this.alertMessage = message;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 5000);
  }

  alerteCessationCreated(event: any) {
    this.showAlertMessage('success', 'Vous avez ajouté une nouvelle cessation.');
    this.getAllCessation();
  }
  getCongeId() {
    this.congeService.readConge(this.congeId).subscribe({
      next: data => {
        this.conge = data?.body?.payload
        console.log("this.conger",this.conge);
        
      }
    })
  }

}



