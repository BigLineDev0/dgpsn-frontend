import { RoleService } from '@/app/services/role/role.service';
import { Alertes } from '@/app/util/alerte';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import {Component, EventEmitter, OnInit, Output, TemplateRef} from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import {NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';


@Component({
  selector: 'app-document-reception-dossier',
  templateUrl: './document-reception-dossier.component.html',
  styleUrls: ['./document-reception-dossier.component.scss'],
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
export class DocumentReceptionDossierComponent implements OnInit{

  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  pageOptions: any = {page: 0, size: 20};
  datasource: any;
  roleToEdit:any;
  roles!: MatTableDataSource<any>;
  loadingIndicator = true;
  showErrorMessage= false;
  file!: File;
  documents: any[] = [
    {
      code: '1',
      libelle: 'Lettre de soumission',
      type: 'DOC1',
      dateAjout: '2022-05-04'
    },
    {
      code: '2',
      libelle: 'KBIS Entreprise XYZ',
      type: 'DOC3',
      dateAjout: '2022-05-04'
    },
    {
      code: '3',
      libelle: 'Offre financière',
      type: 'DOC8',
      dateAjout: '2022-05-04'
    },
    {
      code: '4',
      libelle: 'Références clients',
      type: 'DOC6',
      dateAjout: '2022-05-04'
    },
    {
      code: '5',
      libelle: 'Catalogue de services',
      type: 'DOC9',
      dateAjout: '2022-05-04'
    }
  ];

  type: any[] = [
    { code: 'DOC1', libelle: 'Lettre de soumission' },
    { code: 'DOC2', libelle: 'Déclaration sur l\'honneur' },
    { code: 'DOC3', libelle: 'Extrait KBIS' },
    { code: 'DOC4', libelle: 'Attestations fiscales et sociales' },
    { code: 'DOC5', libelle: 'Garantie bancaire de soumission' },
    { code: 'DOC6', libelle: 'Références et qualifications' },
    { code: 'DOC7', libelle: 'Offre technique détaillée' },
    { code: 'DOC8', libelle: 'Offre financière' },
    { code: 'DOC9', libelle: 'Catalogues et documentations' },
    { code: 'DOC10', libelle: 'Certificats et accréditations'},
    { code: 'DOC11', libelle: 'Statuts et procuration du signataire'}
  ];

  displayedColumns: string[] = [
    'code',
    'name',
    'type',
    'dateAjout',
    'addBy',
    // 'action',
  ];
  constructor(private roleService: RoleService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.readRoles();
  }


  readRoles() {
    this.roleService.readRoles(this.pageOptions).subscribe({
      next:data=>{
        this.datasource = data;
        this.roles = data.content;
        this.showErrorMessage = false;
        this.loadingIndicator = false;
      },
      error:erreur =>{
        this.showErrorMessage = false;
        this.loadingIndicator = true;
      },
      complete: () => {
        this.loadingIndicator = false;
      }
    })
  }

  openBasicModal(content: TemplateRef<any>,role?:any) {
    this.roleToEdit=role;
    this.modalService.open(content, {size: 'xl'}).result.then((result) => {
    }).catch((res) => {});
  }

  close(event: boolean){
    if(event){
      this.modalService.dismissAll();
      this.readRoles()
    }
  }
  doSearch(data:any){
    this.pageOptions = data;
    this.pageOptions.size = 20;
    this.pageOptions.page = 0;
    this.readRoles()
  }
  deleteRoles(id: any) {
    Alertes.confirmAction(
      "Suppression",
      "Voulez-vous vraiment executer cette action",
      () => {
        this.roleService.deleteRole(id).subscribe(data => {
          Alertes.alerteDeleteSuccess("Role")
          this.readRoles()
        })
      })
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.readRoles();
  }

  fileChange(event: any){
    this.file = event.target.files;
  }
}



