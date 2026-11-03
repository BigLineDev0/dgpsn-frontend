import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { NgbTooltipModule, NgbDropdownModule, NgbPaginationModule, NgbAccordionModule, NgbNavModule, NgbProgressbarModule, NgbCarouselModule, NgbTimepickerModule, NgbPopoverModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';


interface Activite {
  id: number;
  nom: string;
  budget: number;
  depense: number;
  tauxExecution?: number;
}

interface Produit {
  id: number;
  nom: string;
  activites: Activite[];
  budget?: number;
  depense?: number;
  tauxExecution?: number;
}

interface Resultat {
  id: number;
  nom: string;
  produits: Produit[];
  budget?: number;
  depense?: number;
  tauxExecution?: number;
}

interface Composant {
  id: number;
  nom: string;
  resultats: Resultat[];
  budget?: number;
  depense?: number;
  tauxExecution?: number;
}

interface Projet {
  id: number;
  nom: string;
  composants: Composant[];
  budget?: number;
  depense?: number;
  tauxExecution?: number;
}

@Component({
  selector: 'app-avanc-financement',
  templateUrl: './avanc-financement.component.html',
  styleUrls: ['./avanc-financement.component.scss'],
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
export class AvancFinancementComponent implements OnInit {
  projets: Projet[] = [];
  projetSelectionne: Projet | null = null;
  niveauAffichage: 'composant' | 'resultat' | 'produit' | 'activite' = 'activite';

  // Options pour les filtres
  niveauxAffichage = [
    { value: 'composant', label: 'Composants' },
    { value: 'resultat', label: 'Résultats' },
    { value: 'produit', label: 'Produits' },
    { value: 'activite', label: 'Activités' }
  ];

  constructor() { }

  ngOnInit(): void {
    // Chargement des données pour démo
    this.chargerDonneesDemo();
  }

  chargerDonneesDemo() {
    // Création d'un projet de démonstration
    const activites: Activite[] = [
      { id: 1, nom: 'Reboisement zone A', budget: 50000, depense: 35000 },
      { id: 2, nom: 'Formation des agents', budget: 30000, depense: 28000 },
      { id: 3, nom: 'Sensibilisation communautaire', budget: 45000, depense: 20000 },
      { id: 4, nom: 'Installation de capteurs', budget: 70000, depense: 65000 },
      { id: 5, nom: 'Étude hydrologique', budget: 60000, depense: 55000 }
    ];

    const produits: Produit[] = [
      { id: 1, nom: 'Zones reboisées', activites: [activites[0]] },
      { id: 2, nom: 'Personnel formé', activites: [activites[1]] },
      { id: 3, nom: 'Communautés sensibilisées', activites: [activites[2]] },
      { id: 4, nom: 'Système de surveillance', activites: [activites[3], activites[4]] }
    ];

    const resultats: Resultat[] = [
      { id: 1, nom: 'Restauration des écosystèmes', produits: [produits[0]] },
      { id: 2, nom: 'Renforcement des capacités', produits: [produits[1], produits[2]] },
      { id: 3, nom: 'Surveillance environnementale', produits: [produits[3]] }
    ];

    const composants: Composant[] = [
      { id: 1, nom: 'Protection de la biodiversité', resultats: [resultats[0]] },
      { id: 2, nom: 'Gestion durable des ressources', resultats: [resultats[1], resultats[2]] }
    ];

    this.projets = [
      {
        id: 1,
        nom: 'Projet de préservation des zones humides',
        composants: composants
      }
    ];

    this.projetSelectionne = this.projets[0];
    this.calculerTotaux();
  }

  calculerTotaux() {
    if (!this.projetSelectionne) return;

    // Calculer les totaux pour chaque niveau
    for (const composant of this.projetSelectionne.composants) {
      let budgetComposant = 0;
      let depenseComposant = 0;

      for (const resultat of composant.resultats) {
        let budgetResultat = 0;
        let depenseResultat = 0;

        for (const produit of resultat.produits) {
          let budgetProduit = 0;
          let depenseProduit = 0;

          for (const activite of produit.activites) {
            budgetProduit += activite.budget;
            depenseProduit += activite.depense;
            // Calcul du taux d'exécution pour l'activité
            activite.tauxExecution = (activite.depense / activite.budget) * 100;
          }

          produit.budget = budgetProduit;
          produit.depense = depenseProduit;
          produit.tauxExecution = (depenseProduit / budgetProduit) * 100;

          budgetResultat += budgetProduit;
          depenseResultat += depenseProduit;
        }

        resultat.budget = budgetResultat;
        resultat.depense = depenseResultat;
        resultat.tauxExecution = (depenseResultat / budgetResultat) * 100;

        budgetComposant += budgetResultat;
        depenseComposant += depenseResultat;
      }

      composant.budget = budgetComposant;
      composant.depense = depenseComposant;
      composant.tauxExecution = (depenseComposant / budgetComposant) * 100;
    }

    // Calcul des totaux pour le projet
    let budgetProjet = 0;
    let depenseProjet = 0;

    for (const composant of this.projetSelectionne.composants) {
      budgetProjet += composant.budget || 0;
      depenseProjet += composant.depense || 0;
    }

    this.projetSelectionne.budget = budgetProjet;
    this.projetSelectionne.depense = depenseProjet;
    this.projetSelectionne.tauxExecution = (depenseProjet / budgetProjet) * 100;
  }

  changerNiveauAffichage(niveau: 'composant' | 'resultat' | 'produit' | 'activite') {
    this.niveauAffichage = niveau;
  }

  obtenirClasse(tauxExecution: number): string {
    if (tauxExecution >= 90) return 'tres-bon';
    if (tauxExecution >= 70) return 'bon';
    if (tauxExecution >= 50) return 'moyen';
    return 'faible';
  }

  formaterMontant(montant: number): string {
    return new Intl.NumberFormat('fr-SN', { style: 'currency', currency: 'XOF' }).format(montant);
  }
}
