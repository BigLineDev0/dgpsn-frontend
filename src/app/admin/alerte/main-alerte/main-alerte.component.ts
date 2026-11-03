import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgbAccordionModule, NgbCollapseModule, NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailsAlerteComponent } from '../details-alerte/details-alerte.component';
import { routes } from '@/app/app.routes';
import { MaterialModule } from '@/app/util/material/material.module';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { QuillModule } from 'ngx-quill';
import { ListboxModule } from 'primeng/listbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { AlerteService } from '@/app/services/alerte/alerte.service';
import { TemplateService } from '@/app/services/template/template.service';


@Component({
  selector: 'app-main-alerte',
  templateUrl: './main-alerte.component.html',
  styleUrls: ['./main-alerte.component.scss'],
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
        // MatTableModule,
        // MatMenuModule,
        // MatIconModule,
        // MatRippleModule,
        SpinnerComponent,
        ListboxModule,
        FormsModule,
        MultiSelectModule,
        MaterialModule,
    DetailsAlerteComponent,
    SpinnerComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class MainAlerteComponent implements OnInit {

  displayedColumns: string[] = [
    'message',
    'priorite',
    'date',
  ];
  pageOptions: any = {page: 0, size: 20};
  loadingIndicator = true;
  alertes: any = [];

  public isAsideNavCollapsed = true;

  showDetails: boolean = false;

  form!: FormGroup;
  userName: any;
  alerte: any;

  reads: any = [{id: 1, label: 'lu', value: true}, {id: 2, label: 'Non lu', value: false}];
  criteres: any = [{id: 1, label: 'Egal', value: "Egal"}, {id: 2, label: 'Inférieur', value: "Inferieure"}, {id: 3, label: 'Supérieur', value: "Supperieure"}, {id: 4, label: 'Compris entre', value: "Comprise"}];

  priorites = [];
  isComprise: any = false;


  constructor(
    private router: Router,
    private alerteService: AlerteService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private templateService: TemplateService
  ) { }

  ngOnInit(): void {

    this.getUserName();
    this.getAlertesByProfile();
    this.getAllPriorities();

    this.initForm();
    this.form.get("critere")?.setValue("Egal");
  }

  initForm() {
    this.form = new FormGroup(
      {
        priority: new FormControl(null),
        read: new FormControl(null),
        date: new FormControl(null),
        endDate: new FormControl(null),
        critere: new FormControl(null)
        
      }
    );
  }

  getUserName() {
    this.userName =  sessionStorage.getItem('username');
    this.pageOptions.username = this.userName;
  }

  getAlertesByProfile() {
    this.alerteService.readAll(this.pageOptions).subscribe({
      next: value => {
        this.alertes = value;
        this.loadingIndicator = false;
      },
      error: err => {
        console.log(err);
        this.loadingIndicator = false;
      },
      complete: () => {
        this.loadingIndicator = false;
      }
    })
  }

  getSeverity(name: any) {
    // console.log("name ", name)
    if (name === 'HAUTE') return 'badge bg-danger';
    else if(name === 'BASSE') return 'badge bg-primary';
    else return 'badge bg-warning'
  }

  openBasicModal(content: TemplateRef<any>, alert?: any) {
    this.alerte = alert;
    this.modalService.open(content, {size: 'xl'}).result.then((result) => {
    }).catch((res) => {});
  }

  close(event: boolean){
    if(event){
      this.modalService.dismissAll();
      window.location.reload();
    }
  }

  fermer(){
    // window.location.reload();
    // this.getAlertesByProfile();
    this.modalService.dismissAll();
    window.location.reload();
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAlertesByProfile();
   
  }

  doSearch() {
    this.loadingIndicator = true;
    this.pageOptions = this.form.value;
   //console.log("pageOptions dans alerte ", this.pageOptions)
    this.pageOptions.username = this.userName;
    this.pageOptions.page = 0;
    this.pageOptions.size = 20;
   this.getAlertesByProfile();
  }

  getStyle(read:any){
    if(read == true) {
      return '';
    }else {
      return '#f1f3e6';
    }
  }
  getAllPriorities() {
    this.templateService.readAllPriorities().subscribe({
      next: value => this.priorites = value
    })
  }

  getCritere() {
    if(this.form.get("critere")?.value == 'Comprise') {
      this.isComprise = true;
    }else{
      this.isComprise = false;
      this.form.get("endDate")?.reset();
    }
  }

  getMessage(message: any) {
    return message?.substring(0, 150) + "...";
  }
}
