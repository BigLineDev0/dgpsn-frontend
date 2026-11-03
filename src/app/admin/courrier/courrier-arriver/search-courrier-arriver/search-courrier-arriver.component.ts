import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { FeatherIconDirective } from '@core/feather-icon/feather-icon.directive';
import { NgbAccordionModule, NgbAlertModule, NgbDropdownModule, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-search-courrier-arriver',
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
  ],
  templateUrl: './search-courrier-arriver.component.html',
  styleUrl: './search-courrier-arriver.component.scss'
})
export class SearchCourrierArriverComponent {
  searchForm!: FormGroup;

  // Types de courriers pour la recherche
  typeCourriers: any = [
    {name: "OFFICIEL", description: "Courrier Officiel"},
    {name: "PRIVE", description: "Courrier Privé"},
    {name: "RECLAMATION", description: "Réclamation"},
    {name: "DEMANDE", description: "Demande"},
    {name: "AUTRES", description: "Autres"}
  ]

  // Niveaux d'urgence
  niveauxUrgence: any = [
    {name: "NORMALE", description: "Normale"},
    {name: "IMPORTANT", description: "Important"},
    {name: "URGENT", description: "Urgent"}
  ]

  // Statuts pour la recherche
  statutsCourrier: any = [
    {name: "NON_TRAITE", description: "Non traité"},
    {name: "EN_COURS", description: "En cours"},
    {name: "TRAITE", description: "Traité"},
    {name: "ARCHIVE", description: "Archivé"}
  ]

  // Opérateurs de date
  operateursDate: any = [
    {name: "EGAL", description: "Égal à"},
    {name: "APRES", description: "Après"},
    {name: "AVANT", description: "Avant"},
    {name: "ENTRE", description: "Entre"}
  ]

  @Input() typeCourrier: any;
  @Input() isSearch: boolean = true;

  @Output() search: EventEmitter<any> = new EventEmitter();
  @Output() submit: EventEmitter<boolean> = new EventEmitter(); // Pour compatibilité

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {
    this.initSearchForm();
  }

  initSearchForm() {
    this.searchForm = this.fb.group({
      // Critères de base
      reference: [''],
      expediteur: [''],
      objet: [''],
      typeCourrier: [''],
      urgence: [''],
      statut: [''],

      // Critères de date
      operateurDateArrivee: ['EGAL'],
      dateArriveeDebut: [''],
      dateArriveeFin: [''],

      operateurDateReception: ['EGAL'],
      dateReceptionDebut: [''],
      dateReceptionFin: [''],

      // Critères avancés
      description: [''],
      numeroEnregistrement: [''],
      serviceDestinataire: [''],

      // Options de recherche
      rechercheExacte: [false],
      inclureArchives: [false]
    });
  }

  onSearch() {
    if (this.searchForm.valid) {
      const searchCriteria = this.buildSearchCriteria();
      this.search.emit(searchCriteria);
      this.submit.emit(true); // Pour compatibilité avec l'ancienne interface
    }
  }

  onCancel() {
    this.submit.emit(false); // Pour compatibilité
  }

  onReset() {
    this.searchForm.reset({
      operateurDateArrivee: 'EGAL',
      operateurDateReception: 'EGAL',
      rechercheExacte: false,
      inclureArchives: false
    });
  }

  private buildSearchCriteria(): any {
    const formValue = this.searchForm.value;
    
    const criteria: any = {
      // Critères de base
      reference: formValue.reference || null,
      expediteur: formValue.expediteur || null,
      objet: formValue.objet || null,
      typeCourrier: formValue.typeCourrier || null,
      urgence: formValue.urgence || null,
      statut: formValue.statut || null,

      // Dates d'arrivée
      dateArriveeOperateur: formValue.operateurDateArrivee,
      dateArriveeDebut: formValue.dateArriveeDebut || null,
      dateArriveeFin: formValue.dateArriveeFin || null,

      // Dates de réception
      dateReceptionOperateur: formValue.operateurDateReception,
      dateReceptionDebut: formValue.dateReceptionDebut || null,
      dateReceptionFin: formValue.dateReceptionFin || null,

      // Critères avancés
      description: formValue.description || null,
      numeroEnregistrement: formValue.numeroEnregistrement || null,
      serviceDestinataire: formValue.serviceDestinataire || null,

      // Options
      rechercheExacte: formValue.rechercheExacte,
      inclureArchives: formValue.inclureArchives
    };

    // Nettoyer les critères vides
    Object.keys(criteria).forEach(key => {
      if (criteria[key] === null || criteria[key] === '') {
        delete criteria[key];
      }
    });

    return criteria;
  }

  // Méthodes pour gérer l'affichage conditionnel des dates
  showDateArriveeFin(): boolean {
    return this.searchForm.get('operateurDateArrivee')?.value === 'ENTRE';
  }

  showDateReceptionFin(): boolean {
    return this.searchForm.get('operateurDateReception')?.value === 'ENTRE';
  }

  // Méthode pour générer un exemple de recherche
  remplirExemple() {
    this.searchForm.patchValue({
      reference: 'CRR-2025',
      expediteur: 'Ministère',
      typeCourrier: 'OFFICIEL',
      urgence: 'IMPORTANT',
      statut: 'NON_TRAITE',
      operateurDateArrivee: 'APRES',
      dateArriveeDebut: '2025-01-01'
    });
  }
}