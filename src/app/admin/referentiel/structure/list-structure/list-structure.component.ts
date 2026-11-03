import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, TemplateRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'primeng/api';
import { StructureService } from 'src/app/services/structure/structure.service';
import { Alertes } from 'src/app/util/alerte';
import { FormRegionComponent } from '../../region/form-region/form-region.component';
import { FormSecteuractiviteComponent } from '../../secteuractivite/form-secteuractivite/form-secteuractivite.component';
import { CreateOrUpdateStructureComponent } from '../create-or-update-structure/create-or-update-structure.component';

@Component({
  selector: 'app-list-structure',
  templateUrl: './list-structure.component.html',
  styleUrls: ['./list-structure.component.scss'],
    standalone : true,
  imports : [
    CommonModule,
    SpinnerComponent,
    MaterialModule,
    SharedModule,
    NgbPaginationModule,
    NgbAccordionModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    NgbNavModule,
   CreateOrUpdateStructureComponent

   
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ListStructureComponent implements OnInit {
  indicatorType: any;
  structureToUpdate: any;
  structureToDetail: any;
  displayedColumns: string[] = [
    'code',
    'nom',
    'typeStructure',
    'address',
    'telephone',
    'email',
    'sartDateCooperation',
    'actions'
  ];

  pageOptions: any = {
    page: 0,
    size: 20
  }
  datasource: any;
  loading = true;
  structure: any

  constructor(
    private modalService: NgbModal,
    private structureService: StructureService
    ){
  }

  ngOnInit(): void {
    this.getAllStructure();
  }

  getAllStructure() {
    this.loading = true;
    this.structureService.readStructures(this.pageOptions).subscribe({
      next: response => {
        this.datasource = response;
        this.loading = false;
      },
      error: response => {},
      complete: () => this.loading = false 
    })
  }

  openDialog(content: TemplateRef<any>, modalSize: any, structure?: any) {
    this.structureToUpdate = structure;
    this.modalService.open(content, {size:'xl', backdrop: 'static'}).result.then((result) => {
    }).catch((res) => {});
  }

  deleteStructure(structureId: any) {
    Alertes.confirmAction('Etes-vous sûr de vouloire supprimer ?',
      '',
      () =>  { 
        this.structureService.deleteStructure(structureId).subscribe({
          next: response => {},
          error: response => {
            console.error("Une erreur s'est produite lors de la suppression de la structure :");
            // Afficher un message d'erreur à l'utilisateur
            // Vous pouvez remplacer alert par un mécanisme d'affichage de message plus sophistiqué
            alert("Une erreur s'est produite lors de la suppression de la structure. la suppression de cet element impacte une perte d'autres donnees. Veuillez réessayer plus tard.");
          },
          complete: () => {
            this.getAllStructure();
          }
        });
      }
    )
  }

  getDetailOperation(content: TemplateRef<any>, modalSize: any, structure?: any){
    this.structureToDetail = structure;
    localStorage.setItem('structure',(structure))
    console.log('structure:',structure)  
    this.modalService.open(content, {size:'xl', backdrop: 'static'}).result.then((result) => {
    }).catch((res) => {});     
  }

  doSearch(data:any){
    this.pageOptions=data;
    this.pageOptions.size=20;
    this.pageOptions.page=0;
    this.getAllStructure()
  }


  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllStructure();
  }

  close() {
    this.modalService.dismissAll();
    this.getAllStructure();
  }

}
