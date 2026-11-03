import { ImpactObjetifService } from '@/app/services/impact-objectif/impact-objetif.service';
import { Alertes } from '@/app/util/alerte';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
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
import { RoutingAvancementProjetComponent } from '../../../routimg-projet/routing-avancement-projet/routing-avancement-projet.component';
import { ImageMediaProjetComponent } from '../../avanc-mediatheque-projet/image-media-projet/image-media-projet.component';
import { VideoMediaProjetComponent } from '../../avanc-mediatheque-projet/video-media-projet/video-media-projet.component';

@Component({
  selector: 'app-form-impact-attendu-projet',
  templateUrl: './form-impact-attendu-projet.component.html',
  styleUrls: ['./form-impact-attendu-projet.component.scss'],
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
export class FormImpactAttenduProjetComponent implements OnInit{

  form!: FormGroup;
  @Input() impactToUpdate:any;
  @Input() isSearch!: boolean;
  @Input() label!: string;
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<any> = new EventEmitter();

  constructor(
    private impactObjetifService:ImpactObjetifService,
  ) { }

  ngOnInit(): void {
    this.initForm();

  }

  initForm() {
    this.form = new FormGroup(
      {
        code: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
      }
    );
    if(this.impactToUpdate!= undefined){
      this.form.get('code')?.setValue(this.impactToUpdate?.code);
      this.form.get('description')?.setValue(this.impactToUpdate?.description);
      this.form.get('managementUnitId')?.setValue(this.getManagementUnitId());
    }
  }

  getManagementUnitId() {
    const managementUnitId = localStorage.getItem('managementUnitId')!;
    return +managementUnitId;
  }

  save(){
    if(this.impactToUpdate != undefined) {
      this.update(this.impactToUpdate?.id, this.form.value);
    }else{
      this.create();
    }
  }


  create(){
    let formImpact = this.form.value;
    formImpact.managementUnitId = this.getManagementUnitId();
    formImpact.detailType = 'IMPACT';
    // formImpact.detailType = 'OBJECTIVE';
    this.impactObjetifService.createImpactObjectif(formImpact).subscribe({
      next:reponse=>{
        console.log('reponse:',reponse)
        Alertes.alerteAddSuccess('Impact attendu');
        this.close();
      },
      error:erreur=>{
        console.log('erreur lors de l\'ajout',erreur)
        Alertes.errorPopPup('Ajout échouée',erreur?.error?.message)
      },
      complete:()=>{

      }
    })
  }

  update(impactId: any, impactForm: any) {
    this.impactObjetifService.updateImpactObjectif(impactId, impactForm).subscribe(
      (value) => {
        Alertes.alerteUpdateSuccess('Impact attendu');
        this.close();
      },
      (value) => {
        console.log('erreur lors de la suppression :',value)
        Alertes.errorPopPup('Suppression échouée',value?.error?.message)
      },
      () => {
        // this.close();
      }
    );
  }

  close(){
    this.submit.emit(true);
  }

  doSearch() {
    // const impactRequest: any = this.searchForm.value;
    // console.log('do_serach: ', impactRequest);
    // this.search.emit(impactRequest);
  }
}

