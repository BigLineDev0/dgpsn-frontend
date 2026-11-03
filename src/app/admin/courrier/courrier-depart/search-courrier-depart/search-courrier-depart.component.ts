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
  selector: 'app-search-courrier-depart',
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
  templateUrl: './search-courrier-depart.component.html',
  styleUrl: './search-courrier-depart.component.scss'
})
export class SearchCourrierDepartComponent {
  searchForm!: FormGroup;

  // Types de courriers pour la recherche
  typeCourriers: any = [
    {name: "OFFICIEL", description: "Courrier Officiel"},
    {name: "ADMINISTRATIF", description: "Courrier Administratif"},
    {name: "COMMERCIAL", description: "Courrier Commercial"},
    {name: "PARTENARIAT", description: "Partenariat"},
    {name: "INVITATION", description: "Invitation"},
    {name: "REPONSE", description: "Réponse"},
    {name: "AUTRES", description: "Autres"}
  ]

  // Niveaux d'urgence
  niveauxUrgence: any = [
    {name: "NORMALE", description: "Normale"},
    {name: "IMPORTANT", description: "Important"},
    {name: "URGENT", description: "Urgent"}
  ]

  // Statuts spécifiques aux courriers départ
  statutsCourrier: any = [
    {name: "BROUILLON", description: "Brouillon"},
    {name: "EN_PREPARATION", description: "En préparation"},
    {name: "ENVOYE", description: "Envoyé"},
    {name: "ANNULE", description: "Annulé"},
    {name: "ARCHIVE", description: "Archivé"}
  ]

  // Modes d'envoi
  modesEnvoi: any = [
    {name: "COURRIER", description: "Courrier postal"},
    {name: "EMAIL", description: "Email"},
    {name: "MESSAGERIE", description: "Messagerie interne"},
    {name: "RECOMMANDE", description: "Recommandé"},
    {name: "EXPRESS", description: "Express"}
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
  @Output() submit: EventEmitter<boolean> = new EventEmitter();

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {
    this.initSearchForm();
  }

  initSearchForm() {
    this.searchForm = this.fb.group({
      // Critères de base
      reference: [''],
      destinataire: [''],
      objet: [''],
      typeCourrier: [''],
      urgence: [''],
      statut: [''],
      modeEnvoi: [''],

      // Critères de date
      operateurDateDepart: ['EGAL'],
      dateDepartDebut: [''],
      dateDepartFin: [''],

      operateurDateEnvoi: ['EGAL'],
      dateEnvoiDebut: [''],
      dateEnvoiFin: [''],

      // Critères avancés
      description: [''],
      numeroSuivi: [''],
      serviceEmetteur: [''],
      contactDestinataire: [''],
      adresseDestinataire: [''],

      // Options de recherche
      rechercheExacte: [false],
      inclureArchives: [false]
    });
  }

  onSearch() {
    if (this.searchForm.valid) {
      const searchCriteria = this.buildSearchCriteria();
      this.search.emit(searchCriteria);
      this.submit.emit(true);
    }
  }

  onCancel() {
    this.submit.emit(false);
  }

  onReset() {
    this.searchForm.reset({
      operateurDateDepart: 'EGAL',
      operateurDateEnvoi: 'EGAL',
      rechercheExacte: false,
      inclureArchives: false
    });
  }

  private buildSearchCriteria(): any {
    const formValue = this.searchForm.value;
    
    const criteria: any = {
      // Critères de base
      reference: formValue.reference || null,
      destinataire: formValue.destinataire || null,
      objet: formValue.objet || null,
      typeCourrier: formValue.typeCourrier || null,
      urgence: formValue.urgence || null,
      statut: formValue.statut || null,
      modeEnvoi: formValue.modeEnvoi || null,

      // Dates de départ
      dateDepartOperateur: formValue.operateurDateDepart,
      dateDepartDebut: formValue.dateDepartDebut || null,
      dateDepartFin: formValue.dateDepartFin || null,

      // Dates d'envoi
      dateEnvoiOperateur: formValue.operateurDateEnvoi,
      dateEnvoiDebut: formValue.dateEnvoiDebut || null,
      dateEnvoiFin: formValue.dateEnvoiFin || null,

      // Critères avancés
      description: formValue.description || null,
      numeroSuivi: formValue.numeroSuivi || null,
      serviceEmetteur: formValue.serviceEmetteur || null,
      contactDestinataire: formValue.contactDestinataire || null,
      adresseDestinataire: formValue.adresseDestinataire || null,

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
  showDateDepartFin(): boolean {
    return this.searchForm.get('operateurDateDepart')?.value === 'ENTRE';
  }

  showDateEnvoiFin(): boolean {
    return this.searchForm.get('operateurDateEnvoi')?.value === 'ENTRE';
  }

  // Méthode pour générer un exemple de recherche
  remplirExemple() {
    this.searchForm.patchValue({
      reference: 'CRD-2025',
      destinataire: 'Ministère',
      typeCourrier: 'OFFICIEL',
      urgence: 'IMPORTANT',
      statut: 'ENVOYE',
      modeEnvoi: 'RECOMMANDE',
      operateurDateDepart: 'APRES',
      dateDepartDebut: '2025-01-01'
    });
  }
}