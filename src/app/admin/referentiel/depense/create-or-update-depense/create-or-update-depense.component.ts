import { LabelService } from '@/app/services/labelService/label-service';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SubSectorService} from 'src/app/services/sub-sector/sub-sector.service';
import {TypeDepenseService} from 'src/app/services/typeDepense/type-depense.service';
import {Alertes} from 'src/app/util/alerte';

@Component({
  selector: 'app-create-or-update-depense',
  templateUrl: './create-or-update-depense.component.html',
  styleUrls: ['./create-or-update-depense.component.scss']
})
export class CreateOrUpdateDepenseComponent implements OnInit{

  form!: FormGroup
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Input() typeDepenseToUpdate: any;
  @Input() referentielType: any;
  @Input() isSearch!: boolean;

  sector: any;

  constructor(private readonly typeDepense: TypeDepenseService,
              private readonly modalService: NgbModal,
              private readonly labelService: LabelService,
  ) {
  }

  ngOnInit(): void {
    this.getSecteur()
    this.form = new FormGroup(
      {
        code: new FormControl("", Validators.required),
        libelle: new FormControl("", Validators.required),
        categorieDepenseId: new FormControl(null),
      }
    );
    this.loadFileds()
  }

  loadFileds() {
    if (this.typeDepenseToUpdate !== undefined) {
      this.form.get('code')?.setValue(this.typeDepenseToUpdate.code);
      this.form.get('libelle')?.setValue(this.typeDepenseToUpdate.libelle);
      this.form.get('categorieDepenseId')?.setValue(this.typeDepenseToUpdate?.categorieDepense.id);

    }
  }

  save() {
    if (this.typeDepenseToUpdate === undefined) {
      this.create()
    } else {
      this.update()
    }
  }

  create() {
    let typeDepense = this.form.value;
    // this.sector.referentielType = this.referentielType.name;
    console.log("typeDepense ", typeDepense);
    this.typeDepense.createTypeDepense(typeDepense).subscribe({
      next: (data) => {
        Alertes.alerteAddSuccess('Enregistrement reussi');
        this.emitSubmit()
      },
      error: (error) => {
        Alertes.alerteAddDanger(error.error.message)
      }
    })
  }

  update() {
    let typeDepense = this.form.value;
    typeDepense.referentielType = this.referentielType.name;
    this.typeDepense.updateTypeDepense(this.typeDepenseToUpdate.id, typeDepense).subscribe({
      next: (data) => {
        Alertes.alerteAddSuccess('Modification reussi');
        this.emitSubmit()
      },
      error: (error) => {
        Alertes.alerteAddDanger(error.error.message)
      }
    })
  }

  getSecteur() {
    let req = {page: 0, size: 20, referentielType: 'CATEGORY_DEPENSE'}
    this.labelService.readLabels(req).subscribe({
      next: response => {
        this.sector = response.content;
      },
      error: response => {
      },

    })
  }

  close() {
    this.modalService.dismissAll();

  }

  emitSubmit() {
    this.submit.emit(true);
  }

  doSearch() {
    const depenseRequest: any = this.form.value;
    this.search.emit(depenseRequest);
    this.emitSubmit();
  }

}

