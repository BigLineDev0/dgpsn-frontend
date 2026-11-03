import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ProfilService } from 'src/app/services/profil/profil.service';
import { Alertes } from 'src/app/util/alerte';
import {NgIf} from "@angular/common";
import {NgSelectComponent} from "@ng-select/ng-select";
@Component({
  selector: 'app-form-profile',
  templateUrl: './form-profile.component.html',
  styleUrls: ['./form-profile.component.scss'],
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgSelectComponent
  ],
  standalone: true

})
export class FormProfileComponent {
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();

  
  @Input() label: string | undefined;
  @Input() isSearch: boolean | undefined;
  @Input() profileToUpdate: any;

  form: FormGroup = new FormGroup({});
  permissions: any;
  toUpdate = false;
  protees: any

  constructor(
    private profileService: ProfilService

  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getPortee()
    if(this.profileToUpdate != undefined) {
      this.toUpdate = true
      this.editForm();
    }else {
      this.toUpdate = false
    }
  }
  getPortee(){
    this.protees = [
      {name: "TOUT", description: "Tout"},
      {name: "MES_DONNEES_UNIQUEMENT", description: "Mes données uniquement"},
      {name: "MES_DONNEES_ET_CELLES_DE_MA_STRUCTURE", description: "Mes données et celles de ma structure"}
    ]
  }

  initForm() {
    this.form = new FormGroup(
      {
        code: new FormControl('', Validators.required),
        libelle: new FormControl('', Validators.required),
        portee: new FormControl(null, Validators.required)
      }
    );
  }

  editForm() {
    this.form.get('code')?.setValue(this.profileToUpdate?.code);
    this.form.get('libelle')?.setValue(this.profileToUpdate?.libelle);
    this.form.get('portee')?.setValue(this.profileToUpdate?.portee?.name);
    this.permissions = this.profileToUpdate?.permissions
  }

  create() {
    const profileRequest = this.form.value;
    profileRequest.permissions = this.permissions

    this.profileService.createProfile(profileRequest).subscribe({
      next: value => {
        Alertes.alerteAddSuccess();
      },
      error: value => {
        Alertes.alerteAddDanger(value.error.message)
      },
      complete: () => {
        this.close();
      }
    })
  }

  close() {
    this.submit.emit(true);
  }
  doSearch() {
    const profile: any = this.form.value;
     this.search.emit(profile);
  }

  save() {
    if(this.profileToUpdate == undefined) {
      this.create();
    }else {
      this.updateProfile();
    }
  }

  updateProfile() {
    const profileRequest = this.form.value;
    profileRequest.permissions = this.permissions
    this.profileService.updateProfile(this.profileToUpdate?.id,profileRequest).subscribe({
      next: value => {
        Alertes.alerteUpdateSuccess();
      },
      error: value => {
        Alertes.alerteUpdateDanger(value.error.message)
      },
      complete: () => {
        this.close();
      }
    })
  }
}
