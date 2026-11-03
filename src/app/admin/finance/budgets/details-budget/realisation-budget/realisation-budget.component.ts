import { CommonModule } from '@angular/common';
import { Component, computed, ElementRef, inject, signal, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NgbModule, NgbModal, NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewMockService } from '../../../data/newmock.service';
import { BudgetService } from '../../../data/version2/budget.service';
import { Realisation } from '../../../data/version2/budget.model';
import { MockServiceVersion2 } from '../../../data/version2/finance.params.service';
import { Alertes } from '@/app/util/alerte';
import { FinancementActivityService } from '@/app/services/financementActivity/financement-activity.service';
import { environment } from '@/environments/environment';
import { HttpParams } from '@angular/common/http';
import { support } from 'pizzip';
import { Observable } from 'rxjs';
import { RealisationService } from '@/app/services/realisation/realisation.service';
import { RoutingFinancementComponent } from '@/app/admin/projet/finacement-projet/routing-financement/routing-financement.component';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { FormRealisationComponent } from './form-realisation/form-realisation.component';
import {FeatherIconDirective} from "@core/feather-icon/feather-icon.directive";
import {MatRipple} from "@angular/material/core";
import { FournisseurService } from '@/app/services/fournisseur/fournisseur.service';

export interface Fournisseurs {
  id: string;
  raisonSociale: string;
}


@Component({
  selector: 'app-realisation-ligne',
 standalone: true,
  imports: [
    CommonModule,
    NgbTooltipModule,
    NgbDropdownModule,
    MatIconModule,
    MatTableModule,
    NgbPaginationModule,
    MatMenuModule,
    NgbAccordionModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgbNavModule,
    NgbProgressbarModule,
    ListboxModule,
    FormsModule,
    NgbCarouselModule,
    NgbTimepickerModule,
    NgbPopoverModule,
    NgbDatepickerModule,
    MatButtonModule,
    HasAnyAuthorityDirective,
    SpinnerComponent,
    FormRealisationComponent,
    MatRipple,
    FeatherIconDirective,

  ],
  templateUrl: './realisation-budget.component.html',
  styleUrls: ['./realisation-budget.component.scss'],
})
export class RealisationBudgetComponent {
  @ViewChild('popoverTrigger') popoverTrigger!: ElementRef<any>;
  displayedColumns: string[] = ['code', 'libelle', 'montant', 'date', 'fournisseur', 'numeroBon', 'numeroBE', 'numeroMandat', 'description', 'actions'];
  datasource: any;
  lignebudgetId:any
  loadingIndicator = true;
  projetlibelle: any;
  realisationToUpdate: any;
  pageOptions: any = { page: 0, size: 20 };
  fournisseurs = signal<Fournisseurs[]>([])
  fournisseursInput = computed(() => this.fournisseurs())

  constructor(
    private fournisseurService: FournisseurService,
    private realisationService: RealisationService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
       this.lignebudgetId = localStorage.getItem('lignebudgetId');
    this.getAllRealisation();
    this.loadFournisseurs();
  }


  loadFournisseurs() {
    this.fournisseurService.getAllFournisseurs().subscribe({
      next: response => {
        this.fournisseurs.set(response.content);
      },
      error: err => {
        console.log(err);
      },
      complete: () => {
        this.loadingIndicator = false;
      }
    });
  }


  getAllRealisation() {
    let req = this.pageOptions
    req.ligneBudgetaireId = this.lignebudgetId
    this.realisationService.readAllRealisation(this.pageOptions).subscribe({
      next: response => {
        this.datasource = response;
        this.loadingIndicator = false;
      },
      error: err => {
        console.log(err);
        this.loadingIndicator = false;
      },
      complete: () => {
        this.loadingIndicator = false;
      }
    });
  }

  openBasicModal(content: TemplateRef<any>, realisation?: any) {
    this.realisationToUpdate = realisation;
    this.modalService
      .open(content, { size: 'lg' })
      .result.then((result) => {})
      .catch((res) => {});
  }

  close(event: boolean) {
    if (event) {
      this.modalService.dismissAll();
      this.getAllRealisation();
    }
  }

  deleteRealisation(realisationId: any) {
    Alertes.confirmAction(
      'Suppression',
      'Cet élément sera définitivement supprimé',
      () => {
        this.realisationService.deleteRealisation(realisationId).subscribe({
          next: value => Alertes.alerteDeleteSuccess('Réalisation'),
          error: value => Alertes.errorPopPup('Suppression échouée', value?.error?.message),
          complete: () => this.getAllRealisation()
        });
      }
    );
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllRealisation();
  }
}

