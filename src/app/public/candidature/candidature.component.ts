import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Alertes } from '@/app/util/alerte';

@Component({
  selector: 'app-candidature',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatBadgeModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './candidature.component.html',
  styleUrl: './candidature.component.scss'
})
export class CandidatureComponent implements OnInit {
  
  recrutements: any[] = [];
  loading = false;
  candidatureForm!: FormGroup;
  selectedRecrutement: any = null;
  
  // Données de test - à remplacer par un service
  mockRecrutements = [
    {
      id: 1,
      libelle: 'Développeur Full Stack Senior',
      typeContrat: 'CDI',
      dateLimite: '2025-11-30',
      datePublication: '2025-10-01',
      statut: 'OUVERT',
      nbCandidatures: 15,
      description: 'Nous recherchons un développeur full stack expérimenté pour concevoir et développer des applications web innovantes. Vous travaillerez sur des projets stratégiques et collaborerez avec une équipe technique passionnée.',
      characteristics: [
        {
          categorieCaracteristique: 'NDE',
          caracteristique: { libelle: 'Master II' },
          exige: true
        },
        {
          categorieCaracteristique: 'EXP',
          caracteristique: { libelle: '5 ans' },
          exige: true
        },
        {
          categorieCaracteristique: 'NDE',
          caracteristique: { libelle: 'Doctorat' },
          exige: false
        }
      ]
    },
    {
      id: 2,
      libelle: 'Gestionnaire des Ressources Humaines',
      typeContrat: 'CDD',
      dateLimite: '2025-11-15',
      datePublication: '2025-10-05',
      statut: 'OUVERT',
      nbCandidatures: 8,
      description: 'Poste de gestionnaire RH pour gérer l\'administration du personnel, le recrutement et la formation. Contrat de 12 mois renouvelable.',
      characteristics: [
        {
          categorieCaracteristique: 'NDE',
          caracteristique: { libelle: 'Licence' },
          exige: true
        },
        {
          categorieCaracteristique: 'EXP',
          caracteristique: { libelle: '3 ans' },
          exige: true
        },
        {
          categorieCaracteristique: 'EXP',
          caracteristique: { libelle: '5 ans' },
          exige: false
        }
      ]
    },
    {
      id: 3,
      libelle: 'Comptable',
      typeContrat: 'CDI',
      dateLimite: '2025-12-10',
      datePublication: '2025-10-10',
      statut: 'OUVERT',
      nbCandidatures: 22,
      description: 'Recherche d\'un comptable qualifié pour assurer la gestion complète de la comptabilité générale et analytique de l\'entreprise.',
      characteristics: [
        {
          categorieCaracteristique: 'NDE',
          caracteristique: { libelle: 'Master I' },
          exige: true
        },
        {
          categorieCaracteristique: 'EXP',
          caracteristique: { libelle: '4 ans' },
          exige: true
        },
        {
          categorieCaracteristique: 'NDE',
          caracteristique: { libelle: 'Master II' },
          exige: false
        }
      ]
    },
    {
      id: 4,
      libelle: 'Assistant(e) Marketing Digital',
      typeContrat: 'INTERIM',
      dateLimite: '2025-10-25',
      datePublication: '2025-10-12',
      statut: 'OUVERT',
      nbCandidatures: 5,
      description: 'Mission d\'intérim de 3 mois pour assister l\'équipe marketing dans la mise en œuvre des stratégies digitales.',
      characteristics: [
        {
          categorieCaracteristique: 'NDE',
          caracteristique: { libelle: 'BAC+2' },
          exige: true
        },
        {
          categorieCaracteristique: 'EXP',
          caracteristique: { libelle: '1 ans' },
          exige: false
        },
        {
          categorieCaracteristique: 'EXP',
          caracteristique: { libelle: '2 ans' },
          exige: false
        }
      ]
    },
    {
      id: 5,
      libelle: 'Chef de Projet IT',
      typeContrat: 'CDI',
      dateLimite: '2025-12-01',
      datePublication: '2025-10-15',
      statut: 'OUVERT',
      nbCandidatures: 12,
      description: 'Nous recherchons un chef de projet IT pour piloter nos projets de transformation digitale et coordonner les équipes techniques.',
      characteristics: [
        {
          categorieCaracteristique: 'NDE',
          caracteristique: { libelle: 'Master II' },
          exige: true
        },
        {
          categorieCaracteristique: 'EXP',
          caracteristique: { libelle: '+ 5 ans' },
          exige: true
        },
        {
          categorieCaracteristique: 'NDE',
          caracteristique: { libelle: 'Doctorat' },
          exige: false
        }
      ]
    }
  ];

  constructor(
    private modalService: NgbModal,
  ) {}

  ngOnInit() {
    this.initCandidatureForm();
    this.loadRecrutements();
  }

  initCandidatureForm() {
    this.candidatureForm = new FormGroup({
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      telephone: new FormControl('', Validators.required),
      niveauEtude: new FormControl('', Validators.required),
      experience: new FormControl('', Validators.required),
      cv: new FormControl(null, Validators.required),
      lettreMotivation: new FormControl(''),
      message: new FormControl('')
    });
  }

  loadRecrutements() {
    this.loading = true;
    // Simuler un appel API
    setTimeout(() => {
      this.recrutements = this.mockRecrutements;
      this.loading = false;
    }, 800);
  }

  getTypeContratLabel(typeContrat: string): string {
    const types: any = {
      'CDD': 'CDD',
      'CDI': 'CDI',
      'INTERIM': 'Intérim',
      'CONTRAT_APRENTISSAGE': "Contrat d'apprentissage",
      'CONTRAT_ENGAGEMENT_ESSAI': "Contrat d'engagement à l'essai"
    };
    return types[typeContrat] || typeContrat;
  }

  getCategorieLabel(categorieName: string): string {
    const categories: any = {
      'NDE': "Niveau d'études",
      'EXP': 'Expérience professionnelle'
    };
    return categories[categorieName] || categorieName;
  }

  getJoursRestants(dateLimite: string): number {
    const today = new Date();
    const limite = new Date(dateLimite);
    const diffTime = limite.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  getCaracteristiquesExigees(recrutement: any): any[] {
    return recrutement?.characteristics?.filter((char: any) => char.exige);
  }

  getCaracteristiquesSouhaitees(recrutement: any): any[] {
    return recrutement?.characteristics?.filter((char: any) => !char.exige);
  }

  openCandidatureModal(content: any, recrutement: any) {
    this.selectedRecrutement = recrutement;
    this.candidatureForm.reset();
    this.modalService.open(content, { 
      size: 'xl', 
      backdrop: 'static',
      centered: true,
      scrollable: true
    });
  }

  onFileChange(event: any, fieldName: string) {
    const file = event.target.files[0];
    if (file) {
      // Vérifier la taille du fichier (max 5 Mo)
      const maxSize = 5 * 1024 * 1024; // 5 Mo en octets
      if (file.size > maxSize) {
        Alertes.alerteAddDanger('Le fichier ne doit pas dépasser 5 Mo');
        event.target.value = '';
        return;
      }

      // Vérifier le type de fichier
      if (file.type !== 'application/pdf') {
        Alertes.alerteAddDanger('Seuls les fichiers PDF sont acceptés');
        event.target.value = '';
        return;
      }

      this.candidatureForm.patchValue({
        [fieldName]: file
      });

      // Mettre à jour le label
      const label = event.target.nextElementSibling;
      if (label) {
        const span = label.querySelector('span');
        if (span) {
          span.textContent = file.name;
        }
      }
    }
  }

  submitCandidature() {
    if (this.candidatureForm.valid && this.selectedRecrutement) {
      this.loading = true;
      
      const candidature = {
        ...this.candidatureForm.value,
        recrutementId: this.selectedRecrutement.id,
        recrutementLibelle: this.selectedRecrutement.libelle,
        dateDepot: new Date().toISOString()
      };

      console.log('Candidature à soumettre:', candidature);

      // Simuler l'envoi API
      setTimeout(() => {
        this.loading = false;
        Alertes.alerteAddSuccess('Votre candidature a été envoyée avec succès!');
        this.modalService.dismissAll();
        this.selectedRecrutement = null;
        
        // Incrémenter le nombre de candidatures (simulation)
        const index = this.recrutements.findIndex(r => r.id === candidature.recrutementId);
        if (index !== -1) {
          this.recrutements[index].nbCandidatures++;
        }
      }, 1500);
    } else {
      Alertes.alerteAddDanger('Veuillez remplir tous les champs obligatoires');
    }
  }

  closeModal() {
    this.modalService.dismissAll();
    this.selectedRecrutement = null;
    this.candidatureForm.reset();
  }
}