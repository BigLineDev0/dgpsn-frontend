import { LabelService } from '@/app/services/labelService/label-service';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { MarketPassationService } from 'src/app/services/market-passation/market-passation.service';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';
import { RoutingAppelOffreProjetComponent } from '../../../routimg-projet/routing-appel-offre-projet/routing-appel-offre-projet.component';
import { EvaluationDossierComponent } from '../../evaluation-dossier/evaluation-dossier.component';
@Component({
  selector: 'app-form-lancement',
  templateUrl: './form-lancement.component.html',
  styleUrls: ['./form-lancement.component.scss'],
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
export class FormLancementComponent {
  @Input() projetId: any;
  @Input() label!: string;
  form!: FormGroup;
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Input() isSearch!: boolean;
  @Input() marketToUpdate: any;
  latest: boolean = false

  modePassation: any
  publique: any
  cible: any

  projets = [
    { nom: 'Projet de Développement Rural', valeur: 'developpementRural' },
    { nom: 'Projet de Santé Maternelle et Infantile', valeur: 'santeMaternelle' },
    { nom: 'Projet d\'Éducation des Enfants Défavorisés', valeur: 'educationEnfants' },
    { nom: 'Projet de Protection de l\'Environnement', valeur: 'protectionEnvironnement' },
    // Ajoutez d'autres projets selon vos besoins
  ];
  typePassation: any;
  typeMarket: any;
  pasationId: any;






  constructor( private modalService: NgbModal,
    private marketPassationService: MarketPassationService,
    private labelService: LabelService) { }
  ngOnInit(): void {
    this.form = new FormGroup(
      {
        reference: new FormControl("", Validators.required),
        libelle: new FormControl("", Validators.required),
        objectMarket: new FormControl(""),
        estimatedAmount: new FormControl(""),
        depositLocation: new FormControl(""),
        plannedStartLaunch: new FormControl(""),
        plannedRealLaunch: new FormControl(""),
        startReceiptBids: new FormControl(""),
        endReceiptBids: new FormControl(""),
        startReceiptBidsReal: new FormControl(""),
        endReceiptBidsReal: new FormControl(""),
        emailRecept: new FormControl(""),
        consultationLink: new FormControl(""),
        description: new FormControl(""),
        typeMarketId: new FormControl(""),
        typePassationId: new FormControl(""),
        cibleId: new FormControl(""),

      }
    );
    this.loadFileds();
    this.getProjetId();
    this.getCible();
    this.getTypeMarket();
    this.getTypePassation();
    this.getPlanPassationId()

  }

  getProjetId() {
    this.projetId = localStorage.getItem('projectId');
    // alert(this.projetId)
  }
  getPlanPassationId() {
    var recup = localStorage.getItem('passationPlanId')
    this.pasationId = JSON.stringify(recup)

  }
  loadFileds() {
    if (this.marketToUpdate !== undefined) {
      this.form.get('reference')?.setValue(this.marketToUpdate.reference);
      this.form.get('libelle')?.setValue(this.marketToUpdate?.libelle);
      this.form.get('objectMarket')?.setValue(this.marketToUpdate?.objectMarket);
      this.form.get('estimatedAmount')?.setValue(this.marketToUpdate?.estimatedAmount);
      this.form.get('depositLocation')?.setValue(this.marketToUpdate.depositLocation);
      this.form.get('plannedStartLaunch')?.setValue(Helper.editDate(this.marketToUpdate?.plannedStartLaunch));
      this.form.get('plannedRealLaunch')?.setValue(Helper.editDate(this.marketToUpdate?.plannedRealLaunch));
      this.form.get('startReceiptBids')?.setValue(Helper.editDate(this.marketToUpdate?.startReceiptBids));
      this.form.get('endReceiptBidsReal')?.setValue(Helper.editDate(this.marketToUpdate?.endReceiptBidsReal));
      this.form.get('endReceiptBids')?.setValue(Helper.editDate(this.marketToUpdate?.endReceiptBids));
      this.form.get('startReceiptBidsReal')?.setValue(Helper.editDate(this.marketToUpdate?.startReceiptBidsReal));
      this.form.get('emailRecept')?.setValue(this.marketToUpdate.emailRecept);
      this.form.get('consultationLink')?.setValue(this.marketToUpdate.consultationLink);
      this.form.get('description')?.setValue(this.marketToUpdate.description);
      this.form.get('typeMarketId')?.setValue(this.marketToUpdate.typeMarket.id);
      this.form.get('typePassationId')?.setValue(this.marketToUpdate.typePassation.id);
      this.form.get('cibleId')?.setValue(this.marketToUpdate.cible.id);


    }
  }

  getCible() {
    const req = {
      page: 0,
      size: 10000,
      referentielType: "CIBLE"
    }
    this.labelService.readLabels(req).subscribe({
      next: (value) => {
        this.cible = value.content

      },
      error: (value) => {

      }
    })
  }
  getTypeMarket() {
    const req = {
      page: 0,
      size: 10000,
      referentielType: "TYPE_MARCHE"
    }
    this.labelService.readLabels(req).subscribe({
      next: (value) => {
        this.typeMarket = value.content

      },
      error: (value) => {

      }
    })
  }
  getTypePassation() {
    const req = {
      page: 0,
      size: 10000,
      referentielType: "TYPE_PASSATION"
    }
    this.labelService.readLabels(req).subscribe({
      next: (value) => {
        this.typePassation = value.content

      },
      error: (value) => {

      }
    })
  }
  save() {
    const marketForm = this.form.value;
    marketForm.passationPlanId = JSON.parse(this.pasationId)

    if (this.marketToUpdate === undefined) {
      this.create(marketForm)
    } else {
      this.update(this.marketToUpdate.id, marketForm)
    }
  }


  create(componentRequest: any) {
    this.marketPassationService.createMarketPassation(componentRequest).subscribe({
      next: value => {
        Alertes.alerteAddSuccess('Enregistrement reussi');
      },
      error: value => {
        Alertes.alerteAddDanger(value.error.message)
      },
      complete: () => {
        this.close();
      }
    })
  }
  update(componentId: any, componentRequest: any) {
    // console.log("log:",componentRequest);
    this.marketPassationService.updateMarketPassation(componentId, componentRequest).subscribe({
      next: value => {
        Alertes.alerteAddSuccess('Modification reussi');
      },
      error: value => {
        Alertes.alerteAddDanger(value.error.message)
      },
      complete: () => {
        this.close();
      }
    })
  }
  close() {
    this.submit.emit(true);
  }

  doSearch() {
    this.search.emit(this.form.value);
  }
  selectionChange(event: any) {
    console.log(event)
    if (event) {
      this.latest = true
      this.modePassation = 'Appel d\'offres ouvert'
      this.publique = 'Fournitures'
      this.cible = 'Communautaire'
    }
  }
  dataPassation =
    [
      {
        ref: 'PP-SENE-001',
        libelle: 'Construction d\'une nouvelle école primaire',
        realisation: '12 mois',
        lancement: '20 Juin 2024',
        attribution: '28 Mai 2025',
      },
      {
        ref: 'PP-SENE-002',
        libelle: 'Achat de fournitures médicales pour les hôpitaux publics',
        realisation: '6 mois',
        lancement: '12 Janvier 2024',
        attribution: '25 Juillet 2024',
      },
      {
        ref: 'PP-SENE-003',
        libelle: 'Fourniture de matériel informatique pour les écoles publiques',
        realisation: '4 mois',
        lancement: '06 Septembre 2023',
        attribution: ' 31 Janvier 2024',
      },
      {
        ref: 'PP-SENE-004',
        libelle: 'Réhabilitation d\'un réseau routier urbain',
        realisation: '18 mois',
        lancement: '26 Mars 2023',
        attribution: '20 Novembre 2024',
      },
      {
        ref: 'PP-SENE-005',
        libelle: 'Mise en place d\'un système de gestion des déchets dans une municipalité',
        realisation: '9 mois',
        lancement: '11 Août 2023',
        attribution: '10 Avril 2024',
      },
      {
        ref: 'PP-SENE-006',
        libelle: 'Construction d\'un centre de santé dans une zone rurale',
        realisation: '14 mois',
        lancement: '07 Novembre 2023',
        attribution: '19 Janvier 2025',
      },
      {
        ref: 'PP-SENE-007',
        libelle: 'Fourniture de véhicules de transport pour une agence gouvernementale',
        realisation: '5 mois',
        lancement: '14 Avril 2024',
        attribution: '22 Septembre 2024',
      },
      {
        ref: 'PP-SENE-008',
        libelle: 'Construction d\'un centre culturel municipal',
        realisation: '10 mois',
        lancement: '12 Juillet 2023',
        attribution: '13 Mai 2024',
      },
      {
        ref: 'PP-SENE-009',
        libelle: 'Réhabilitation d\'un réseau d\'adduction d\'eau dans une région semi-urbaine',
        realisation: '8 mois',
        lancement: '02 Février 2024',
        attribution: '27 Octobre 2024',
      },
      {
        ref: 'PP-SENE-010',
        libelle: 'Achat de fournitures scolaires pour les écoles publiques',
        realisation: '3 mois',
        lancement: '06 Mai 2024',
        attribution: '26 Août 2024',
      }
    ]

}
