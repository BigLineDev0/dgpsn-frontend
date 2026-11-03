import { LabelService } from '@/app/services/labelService/label-service';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { NgbPaginationModule, NgbAccordionModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { SharedModule } from 'primeng/api';
import {CategorieDocumentService} from 'src/app/services/categorieDocument/categorie-document.service';
import {Alertes} from 'src/app/util/alerte';

@Component({
  selector: 'app-form-categorie-document',
  templateUrl: './form-categorie-document.component.html',
  styleUrls: ['./form-categorie-document.component.scss'],
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
export class FormCategorieDocumentComponent implements OnInit{
  form!: FormGroup;
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Input() labelToUpdate: any;
  @Input() referentielType: any;
  type: any = [
    {name: 'OUI', value: 1},
    {name: 'NON', value: 0},
  ]
  typeDocument: any;

  constructor(private readonly categorieDocumentService: CategorieDocumentService,
              private readonly labelService: LabelService
  ) {
  }

  ngOnInit(): void {
    this.getAllTypeDocument()
    this.form = new FormGroup(
      {
        obligatoire: new FormControl("", Validators.required),
        typeDocumentId: new FormControl("", Validators.required),
        collectif: new FormControl("", Validators.required)
      }
    );
    this.loadFileds()
  }

  loadFileds() {
    if (this.labelToUpdate !== undefined) {
      this.form.get('typeDocumentId')?.setValue(this.labelToUpdate.typeDocumentId);
      if (this.labelToUpdate.collectif === false) {
        this.form.get('collectif')?.setValue(0);
      }
      if (this.labelToUpdate.collectif === true) {
        this.form.get('collectif')?.setValue(1);
      }

      if (this.labelToUpdate.obligatoire === false) {
        this.form.get('obligatoire')?.setValue(0);
      }
      if (this.labelToUpdate.obligatoire === true) {
        this.form.get('obligatoire')?.setValue(1);
      }
    }
  }

  save() {
    if (this.labelToUpdate === undefined) {
      this.create()
    } else {
      this.update()
    }
  }

  create() {
    let label = this.form.value;
    label.categoryDocument = this.referentielType.name;
    this.categorieDocumentService.createCategorieDocument(label).subscribe({
      next: (data) => {
        Alertes.alerteAddSuccess();
        this.emitSubmit()
      },
      error: (error) => {
        Alertes.alerteAddDanger(error.error.message)
      }
    })
  }

  update() {
    let label = this.form.value;
    label.categoryDocument = this.referentielType.name;
    this.categorieDocumentService.updateCategorieDocument(this.labelToUpdate.id, label).subscribe({
      next: (data) => {
        Alertes.alerteUpdateSuccess();
        this.emitSubmit()
      },
      error: (error) => {
        Alertes.alerteUpdateDanger(error.error.message)
      }
    })
  }

  getAllTypeDocument() {
    let req = {
      page: 0,
      size: 100000,
      sortBy: 'libelle',
      ascending: true,
      referentielType: 'TYPE_DOCUMENT',
    }
    this.labelService.readLabels(req).subscribe({
      next: reponse => {
        this.typeDocument = reponse.content;
      },
      error: erreur => {
      },
    });
  }

  emitSubmit() {
    this.submit.emit(true);
  }

  sanctionType() {
    return this.referentielType?.name == 'SANCTION';
  }

  // congeType() {
  //   return this.referentielType?.name == 'CONGE_DOCUMENT';
  // }
}
