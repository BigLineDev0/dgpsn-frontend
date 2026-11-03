import { TypecontratService } from '@/app/services/typecontrat/typecontrat.service';
import { Alertes } from '@/app/util/alerte';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbPaginationModule, NgbAccordionModule, NgbTooltipModule, NgbNavModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'primeng/api';
import { FormTypecontatComponent } from '../form-typecontat/form-typecontat.component';

@Component({
  selector: 'app-list-typecontat',
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
    ListTypecontatComponent,
    FormTypecontatComponent,
   
  ],  templateUrl: './list-typecontat.component.html',
  styleUrl: './list-typecontat.component.scss'
})
export class ListTypecontatComponent {


  loadingIndicator = true;
  typecontratToUpdate : any;
  typecontratId : any;
  pageOptions: any = { page: 0, size: 10 };
  dataSource: any;
  metadata: any;
  displayedColumns: string[] = [
    'code',
    'libelle',
    'actions',
  ];

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private typecontratService: TypecontratService
  ) { }

  ngOnInit() {
    this.getTypecontrats();
  }

  getTypecontrats(){
    this.loadingIndicator = true;
    const params = this.pageOptions;
    this.typecontratService.readTypecontrats(params).subscribe({
      next: response => {
        this.dataSource = response?.payload;
        this.metadata = response?.metadata;
      },
      error: err => this.loadingIndicator = false,
      complete: () => this.loadingIndicator = false
    });
  }

  delete(typecontratId:any){
    Alertes.confirmAction(
      'Voulez-vous supprimé ?',
      'Cet element sera definitivement supprimé',
      () => {
        this.typecontratService.deleteTypecontrat(typecontratId).subscribe({
      next: response => {
        Alertes.alerteDeleteSuccess()
      },
      error: err => Alertes.errorPopPup('Suppression échouée',err?.error?.message),
      complete: () => this.getTypecontrats()
      });
    })

   }

  paginate($event: any){
    this.loadingIndicator = true;
     this.pageOptions.page = $event - 1;
      this.getTypecontrats()
   }

  close(event: boolean){
    if (event) {
      this.modalService.dismissAll();
      this.getTypecontrats()
    }
  }

  doSearch(data: any){
      this.pageOptions = data;
      this.pageOptions.page = 0;
      this.pageOptions.size = 20;
      this.getTypecontrats()
      this.modalService.dismissAll();
   }

  openBasicModal(content: TemplateRef<any>, size?: any, typecontrat?: any) {
      this.typecontratToUpdate = typecontrat;
      this.typecontratId = typecontrat?.id;
      this.modalService.open(content, {size: size, backdrop: 'static'}).result.then((result) => {

      }).catch((res) => {
      });
   };

}
