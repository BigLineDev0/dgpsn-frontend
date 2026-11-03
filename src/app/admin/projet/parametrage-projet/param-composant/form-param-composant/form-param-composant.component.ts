import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
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
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { InfosActeurModalProjetComponent } from '../../param-acteur-projet/evaluation-acteur-projet/infos-acteur-modal/infos-acteur-modal-projet.component';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';

@Component({
  selector: 'app-form-param-composant',
  templateUrl: './form-param-composant.component.html',
  styleUrls: ['./form-param-composant.component.scss'],
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
export class FormParamComposantComponent implements OnInit{

  form!: FormGroup;
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() composantProjectToUpdate:any;
  @Input() isSearch!:boolean;
  @Input() projetId: any;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        code: new FormControl(null, Validators.required),
        libelle: new FormControl(null, Validators.required),
      }
    );

    this.loadFileds();
  }

  loadFileds() {
    if(this.composantProjectToUpdate !== undefined) {
      this.form.get('code')?.setValue(this.composantProjectToUpdate.code);
      this.form.get('libelle')?.setValue(this.composantProjectToUpdate.libelle);

    }
  }

  save() {
    let composantProjet = this.form.value;
    composantProjet.projetId = +this.projetId;
    if(this.composantProjectToUpdate === undefined) {
      this.create(composantProjet)
    } else {
      this.update(composantProjet)
    }
  }


  create(ugpProject: any) {
    // this.ugpProjectService.addUgpToProject(ugpProject).subscribe({
    //   next:(data) =>{
    //     Alertes.alerteAddSuccess();
    //     this.close()
    //   },
    //   error:(error)=>{
    //     // console.log("error", error)
    //     Alertes.alerteAddDanger(error.error.message)
    //   }
    //
    // })
  }
  update(ugpProject: any) {
    // this.ugpProjectService.updateUgpProject(this.ugpProjectToUpdate.id, ugpProject).subscribe({
    //   next:(data) =>{
    //     Alertes.alerteAddSuccess('Modification reussi');
    //     this.close()
    //   },
    //   error:(error)=>{
    //     // console.log("error", error)
    //     Alertes.alerteAddDanger(error.error.message)
    //   }
    //
    // })
  }

  doSearch(){
    this.search.emit(this.form.value)
  }

  close(){
    this.submit.emit(true);
  }
}
