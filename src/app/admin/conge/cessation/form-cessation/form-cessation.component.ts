import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { FeatherIconDirective } from '@core/feather-icon/feather-icon.directive';
import { NgbAccordionModule, NgbAlertModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { QuillModule } from 'ngx-quill';
import { AgentService } from 'src/app/services/agent/agent.service';
import { PriseServiceService } from 'src/app/services/cessation/prise-service.service';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';
import { REFERENTIEL_TYPE } from 'src/app/util/type-referentiel';
import { AddDemandeComponent } from '../../demande-conge/add-demande/add-demande.component';

@Component({
  selector: 'app-form-cessation',
  templateUrl: './form-cessation.component.html',
  styleUrls: ['./form-cessation.component.scss'],
   imports: [
    CommonModule,
    AddDemandeComponent,
     NgbPaginationModule,
        NgbDropdownModule,
        SpinnerComponent,
        MatTabsModule,
        NgbAccordionModule,
        MatDialogModule,
        MatTableModule,
        NgbTooltipModule,
        MatMenuModule,
        MatIconModule,
        MatDialogModule,
        FeatherIconDirective,
        MatRippleModule,
        ReactiveFormsModule,
        NgSelectModule,
        MatButtonModule,
        QuillModule,
        MatRadioModule,
        NgbNavModule,
        MatCardModule,
        FormsModule,
        MatPaginatorModule,
        MatSelectModule,
        NgbAlertModule,
        HasAnyAuthorityDirective,
        NgbPopoverModule,
  ],
})
export class FormCessationComponent {
  form!: FormGroup;
  @Input() isSearch!: boolean;
  @Input() cessationToUpdate: any;
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() showAlert: EventEmitter<{ type: string; message: string }> =
    new EventEmitter();
  @Output() cessationCreated: EventEmitter<any> = new EventEmitter();

  agents!: any[];
  congeId: any;
  filteredMatricules: string[] = [];
  constructor(
    private fb: FormBuilder,
    private cessationService: PriseServiceService
  ) {}

  ngOnInit() {
    this.congeId = localStorage.getItem('congeId');
    console.log("cessation", this.congeId);
    this.initform();
  }

  initform() {
    const currentDate = new Date().toISOString().slice(0, 10);
    const formattedDate = currentDate.split('/').reverse().join('/');
    this.form = this.fb.group({
      libelle: [''],
      soldeAnnuel: [30],
      nombreDeJoursdemande: ['', Validators.required],
      numFicheCessation: [''],
      dateCessation: ['', Validators.required],
      description: [''],
    });
    this.loadFields();
  }

  loadFields() {
    if (this.cessationToUpdate !== undefined) {
      this.form.get('libelle')?.setValue(this.cessationToUpdate?.libelle);
      this.form
        .get('dateCessation')
        ?.setValue(Helper.editDate(this.cessationToUpdate?.dateCessation));
      this.form
        .get('numFicheCessation')
        ?.setValue(this.cessationToUpdate?.numFicheCessation);
      this.form
        .get('description')
        ?.setValue(this.cessationToUpdate?.description);
      this.form
        .get('nombreDeJoursdemande')
        ?.setValue(this.cessationToUpdate?.nombreDeJoursdemande);
    }
  }

  save() {
    let cessation = this.form.value;
    cessation.congeId = +this.congeId;
    console.log("cessation",cessation);
    
    if (this.cessationToUpdate === undefined) {
      this.create(cessation);
    } else {
      this.update(cessation);
    }

  }

  create(cessation: any) {
    this.cessationService.create(cessation).subscribe({
      next: (response) => {
        if (response?.status === 'BAD_REQUEST') {
          Alertes.errorPopPup('Ajout échoué', response?.message);
          this.showAlert.emit({ type: 'error', message: response?.message });
        } else {
          this.form.patchValue({ soldeAnnuel: response.soldeAnnuel });
          Alertes.alerteAddSuccess();
          this.cessationCreated.emit(response);
          this.close();
        }
      },
      error: (error) => {
        const message =
          error?.error?.message || 'Solde de congé épuisé pour cette année';
        Alertes.errorPopPup('Ajout échoué', message);
        this.showAlert.emit({ type: 'error', message: message });
      },
    });
  }

  close() {
    this.submit.emit(true);
  }

  update(cessation: any) {
    let cessationId = this.cessationToUpdate.id;
    this.cessationService.update(cessationId, cessation).subscribe({
      next: (response) => {
        this.form.patchValue({ soldeAnnuel: response.soldeAnnuel });
        this.close();
        if (response?.status == 'BAD_REQUEST') {
          Alertes.errorPopPup('Ajout échoué', response?.message);
          console.log('response?.message', response?.message);

          this.close();
        } else {
          Alertes.alerteUpdateSuccess();
          this.close();
        }
      },
      error: (response) => Alertes.alerteUpdateDanger(),
    });
  }

  doSearch() {}
  onInputDuration() {
    const dureeControl = this.form.get('nombreDeJoursdemande');
    if (dureeControl && dureeControl?.value > 30) {
      dureeControl.setValue(30);
    }
  }
}
