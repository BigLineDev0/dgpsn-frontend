import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CADRE_LOGIQUE_TYPE } from '@/app/util/type-cadre-logique';
import { CommonModule } from '@angular/common';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbAccordionModule, NgbModal, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { SharedModule } from 'primeng/api';
import { CadreLogiqueService } from 'src/app/services/cadre-logique/cadre-logique.service';
import { TypeCadreLogiqueService } from 'src/app/services/type-cadre-logique/type-cadre-logique.service';
import { Alertes } from 'src/app/util/alerte';


@Component({
  selector: 'app-create-or-update-cadrelogique',
  templateUrl: './create-or-update-cadrelogique.component.html',
  styleUrls: ['./create-or-update-cadrelogique.component.scss'],
     standalone:true,
    imports: [
    CommonModule,
    SpinnerComponent,
    MaterialModule,
    SharedModule,
    NgbPaginationModule,
    NgbAccordionModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    HasAnyAuthorityDirective
  ],
})
export class CreateOrUpdateCadrelogiqueComponent {
  @Input() isResearch:any;
  @Input() niveau:any;
  cadretype:any;
  form!: FormGroup;
  currentPage = 0;
  length: any;
  pageOptions: any = {page: 0, size: 10000};
  @Input() isSearch :any;
  @Output() search: EventEmitter<any> = new EventEmitter();

  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Input() cadreLogToUpdate: any;
  niveauPrent: any
  parents: any;
  addParent = true

  constructor(private cadrelogService: CadreLogiqueService, private TypeCadreService: TypeCadreLogiqueService ,private modalService: NgbModal) { }

  ngOnInit(): void {
    if(this.niveau?.type != CADRE_LOGIQUE_TYPE.REGION) {
      this.addParent = true
      this.form = new FormGroup(
        {
          code: new FormControl("", Validators.required),
          libelle: new FormControl("", Validators.required),
          parentId: new FormControl(null, Validators.required),
          latitude: new FormControl(""),
          longitude: new FormControl(""),
          typeCadreLogiqueId:new FormControl("")
        }
      );
    }else {
      this.addParent = false
      this.form = new FormGroup(
        {
          code: new FormControl("", Validators.required),
          libelle: new FormControl("", Validators.required),
          latitude: new FormControl(""),
          longitude: new FormControl(""),
          typeCadreLogiqueId:new FormControl("")
        }
      );
    }
    
    
    // alert(this.niveau.type)
    this.getParent()
    this.loadFileds();
  }

//cette methode permet de preremplir les champs a modifier avec leurs anciennes valeurs
  loadFileds() {
    if(this.cadreLogToUpdate !== undefined) {
      this.form.get('code')?.setValue(this.cadreLogToUpdate.code);
      this.form.get('libelle')?.setValue(this.cadreLogToUpdate.libelle);
      this.form.get('latitude')?.setValue(this.cadreLogToUpdate.latitude);
      this.form.get('longitude')?.setValue(this.cadreLogToUpdate.longitude);
      // this.form.get('typeCadreLogiqueId')?.setValue(this.cadreLogToUpdate.typeCadreLogique.id);
      this.form.get('parentId')?.setValue(this.cadreLogToUpdate.parent.id);
    }
  }

  //create methode for update end create

  save() {
    if(this.cadreLogToUpdate === undefined) {
      this.create()
    } else {
      this.update()
    }
  }
  listtypeCadrelogique(){
    this.TypeCadreService.readTypeCadreLogiques(this.pageOptions).subscribe(data => {
      this.cadretype = data.content;

   })}

   getParent(){
    this.pageOptions.codeType = this.niveau.niveauPrent
    // console.log("pageOption" , this.pageOptions)
    this.cadrelogService.readCadreLogiques(this.pageOptions).subscribe(data => {
      this.parents = data.content;

   })}

  create() {
    let cadrelogique = this.form.value;
    cadrelogique.typeCadreLogique = this.niveau?.type
    cadrelogique.latitude = this.form.value.latitude.replace(/,/g,'.')
    cadrelogique.longitude = this.form.value.longitude.replace(/,/g,'.')
    // alert(cadrelogique.latitude);
  
    this.cadrelogService.createCadreLogique( cadrelogique).subscribe({
      next:(data) =>{
        Alertes.alerteAddSuccess();
        this.close()
      },
      error:(error)=>{
        // console.log("error", error)
        Alertes.alerteAddDanger(error.error.message)
      }

    })
  }

  update() {
    let cadreLog = this.form.value;
    cadreLog.latitude = this.form.value.latitude.replace(/,/g,'.')
    cadreLog.longitude = this.form.value.longitude.replace(/,/g,'.')
    cadreLog.typeCadreLogique = this.niveau?.type
    this.cadrelogService.updateCadreLogique(this.cadreLogToUpdate.id, cadreLog).subscribe({
      next:(data) =>{
        Alertes.alerteAddSuccess('Modification reussi');
        this.close()
      },
      error:(error)=>{
        // console.log("error", error)
        Alertes.alerteAddDanger(error.error.message)
      }

    })
  }
  close(){
    this.submit.emit(true);
  }
  doSearch() {
    this.search.emit(this.form.value);
  }

  
}
