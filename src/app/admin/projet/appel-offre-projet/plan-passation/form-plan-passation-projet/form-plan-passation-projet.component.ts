import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
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
import { RoutingAppelOffreProjetComponent } from '../../../routimg-projet/routing-appel-offre-projet/routing-appel-offre-projet.component';
import { PlanPassationService } from '@/app/services/plan-passation/plan-passation.service';
import { StructureService } from '../../../../../services/structure/structure.service';

@Component({
  selector: 'app-form-plan-passation-projet',
  templateUrl: './form-plan-passation-projet.component.html',
  styleUrls: ['./form-plan-passation-projet.component.scss'],
  standalone:true,
  imports:[
        CommonModule,
    NgbTooltipModule,
    NgbDropdownModule,
    MatIconModule,
    // FeatherIconModule,
    NgbTooltipModule,
    MatTableModule,
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
    RoutingAppelOffreProjetComponent,
    SpinnerComponent,
  ]
})
export class FormPlanPassationProjetComponent implements OnInit {

  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Input() label!: string;
  @Input() projetId: any;
  @Input() selectedActor: any;
  @Input() planToUpdate: any;
  @Input() isSearch!: boolean;
  managementUnitId:any
  typeEntites: any; 
  // = [
  //   { id: '', code: 'ETAT', libelle: 'Ministère de l\'Agriculture et de l\'Equipement rural et de la Souveraineté alimentaire' },
  //   { id: '', code: 'COLL', libelle: 'Ministère de l\'Artisanat et de la Transformation du Secteur informel' },
  //   { id: '', code: 'EP', libelle: 'Ministère de l\'Eau et de l\'Assainissement' },
  //   { id: '', code: 'SNSPM', libelle: 'Ministère de l\'Education nationale (MEN)' },
  //   { id: '', code: 'AGENCE', libelle: 'Agence Régionale de Developpement (ARD) de THIES' },
  //   { id: '', code: 'SD', libelle: 'Centre de Formation professionnelle et technique (CFPT Senegal-Japon)\t\n' },
  //   { id: '', code: 'AUTRE', libelle: 'Laboratoire National d\'Analyses et de Contrôle (LANAC)\t\n' },
  // ]
  annees: { id: number, year: number }[] = [];

  form!: FormGroup;
  constructor(
    private planpassaionservice: PlanPassationService,
    private structureService :StructureService

  ) {


  }

  ngOnInit(): void {
    this.initForm();
    this.listannee();
    this.editForm()
    this.getManagementUnitId()
    this.getStructure();

  }


   getManagementUnitId(){
    this.managementUnitId =localStorage.getItem("projetId")
   }
  initForm() {
    this.form = new FormGroup(
      {
        reference: new FormControl('', Validators.required),
        libelle: new FormControl('', Validators.required),
        structureId: new FormControl('', Validators.required),
        yearPublication: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),

      }
    );
  }

  editForm() {
    if (this.planToUpdate !== undefined) {
      this.form.get('reference')?.setValue(this.planToUpdate?.reference);
      this.form.get('libelle')?.setValue(this.planToUpdate?.libelle);
      this.form.get('yearPublication')?.setValue(this.planToUpdate?.yearPublication);
      this.form.get('description')?.setValue(this.planToUpdate?.description);

    }
  }

  save() {
    //L'id du projet doit etre recupere en localstorage by laye
    //L'id de la structure  doit etre recupere au niveau du formulaire by laye
    const valueForm = this.form.value;
    valueForm.managementUnitId = this.managementUnitId;
    valueForm.structureId = 1;
    const year = this.form.get('yearPublication')?.value
    var t= valueForm.yearPublication = this.annees[year]
    var dat=new Date()
    dat.setFullYear(t.year)
    valueForm.yearPublication=dat

    if (this.planToUpdate === undefined) {
      this.create(valueForm);
    } else {
      this.update(this.planToUpdate.id,valueForm);
    }
  }

  create(value: any) {
    this.planpassaionservice.createPlanPassation(value).subscribe({
      next:(value) => {
        Alertes.alerteAddSuccess('Plan de Passation ajoute avec succes');
      },
      error:(value) => {
        Alertes.alerteAddDanger(value.error.message)
      },
      complete:()=>{
        this.close()
      }
    
    });
    
  }

  update(id: any, value: any) {
    this.planpassaionservice.updatePlanPassation(id, value).subscribe({
      next:(value) => {
        Alertes.alerteUpdateSuccess('Acteur');
      },
      error:(value) => {
        Alertes.alerteUpdateDanger(value.error.message)
      },
      complete:()=>{
        this.close();
      }
      });
  }

  close() {
    this.submit.emit(true);
  }

  doSearch() {
    this.search.emit(this.form.value);
  }

   getStructure(){
    this.structureService.readStructures().subscribe({
      next: response => {
      console.log('abel',response);
        this.typeEntites = response.content;
      },
      error: response => {},
      
    })
  }


  listannee() {
    const currentYear = new Date().getFullYear();
    for (let i = 1960; i <= currentYear; i++) {
      this.annees.push({ id: i - 1960, year: i });
    }
  }
}
