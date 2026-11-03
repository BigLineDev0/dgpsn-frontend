import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {NgbAccordionModule, NgbCollapseModule, NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import { Authority } from 'src/app/util/Authority';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { DetailsAlerteComponent } from '../../details-alerte/details-alerte.component';
import { EditAlerteComponent } from '../../edit-alerte/edit-alerte.component';
import { TemplateService } from '@/app/services/template/template.service';
import { Alertes } from '@/app/util/alerte';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-liste-config-alerte',
  templateUrl: './liste-config-alerte.component.html',
  styleUrls: ['./liste-config-alerte.component.scss'],
  standalone: true,
    imports:[
    CommonModule,
        NgbDropdownModule,
        NgbDatepickerModule,
        ReactiveFormsModule,
        NgbAccordionModule,
        NgSelectModule, // Ng-select
        ReactiveFormsModule,
        NgbPaginationModule,
        NgbTooltipModule,
        NgbNavModule,
        NgbCollapseModule,
        NgbAccordionModule,
        HasAnyAuthorityDirective,
        MatTableModule,
        MatMenuModule,
        MatIconModule,
        // MatRippleModule,
      SpinnerComponent,
        ListboxModule,
        FormsModule,
        MultiSelectModule,
        MaterialModule,
       EditAlerteComponent,
       SpinnerComponent
  ]
  
})
export class ListeConfigAlerteComponent implements OnInit{
 templates: any = [];
  @Input () categorieName: any;
  templateToUpdate: any;
  profiles: any = [];
  priorites: any;
  pageOptions: any = { page: 0, size: 20 };
  loadingIndicator = true;

  update = Authority.EDIT_TEMPLATE;
  delete = Authority.DELETE_TEMPLATE;
  
  // update ="";
  // delete = "";
  categorie: any;
  cat: any;
  descCategorie: any;
  typeAlertes: any;

  displayedColumns: string[] = [
    'type',
    'priorite',
    'profils',
    'actions'
  ];

  constructor(
    private modalService: NgbModal,
    private templateService: TemplateService,

  ) {
  }

  ngOnInit() {
    this.getAllTemplates();
  }

  refresh() {
    this.getAllTemplates();
  }

  getAllTemplates() {
    this.pageOptions.categorieAlerte = this.categorieName
    this.templateService.readTemplates(this.pageOptions).subscribe({
      next: value => {
        this.templates = value;
        this.loadingIndicator = false;
      },
      error: err => {
        this.loadingIndicator = false;
      },
      complete: () => {
        this.loadingIndicator = false;
      }
    })
  }

  deleteTemplate(templateId: any) {
    Alertes.confirmAction(
      "Suppression",
      "Voulez-vous vraiment supprimer",
      () => {
        this.templateService.deleteTemplate(templateId).subscribe({
          next: (value) => {
            Alertes.alerteDeleteSuccess();
            this.getAllTemplates();
          },
          error: value => { Alertes.alerteDeleteDanger(value.error.message) }
        })
      })

  }



  getSeverity(name: any) {
    if (name === 'HAUTE') return 'badge bg-danger';
    else if (name === 'BASSE') return 'badge bg-primary';
    else return 'badge bg-warning'
  }

  openBasicModal(content: TemplateRef<any>, typeAlertes?: any, template?: any,description?:any) {
    this.descCategorie = description;
    this.typeAlertes = typeAlertes;
    this.templateToUpdate = template;
    console.log('templateToUpdate : ', this.templateToUpdate);

    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
    }).catch((res) => { });
  }

  close(event: boolean) {
    if (event) {
      this.modalService.dismissAll();
      this.getAllTemplates();
    }
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllTemplates();
  }
}
