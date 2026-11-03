import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {NgbDropdownItem, NgbModal, NgbPagination, NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import { ProfilService } from 'src/app/services/profil/profil.service';
import {
  MatCell, MatCellDef, MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import { Alertes } from 'src/app/util/alerte';
import {FormProfileComponent} from "@views/pages/securite/profile/form-profile/form-profile.component";
import {SpinnerComponent} from "@/app/util/spinner/spinner.component";
import {FeatherIconDirective} from "@core/feather-icon/feather-icon.directive";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatRipple} from "@angular/material/core";
@Component({
  selector: 'app-list-profile',
  templateUrl: './list-profile.component.html',
  styleUrls: ['./list-profile.component.scss'],
  imports: [
    FormProfileComponent,
    SpinnerComponent,
    MatTable,
    MatHeaderCell,
    MatCell,
    NgbTooltip,
    FeatherIconDirective,
    MatRipple,
    MatMenuTrigger,
    MatRipple,
    MatMenu,
    NgbDropdownItem,
    NgIf,
    MatIcon,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    NgbPagination,
    MatColumnDef,
    MatCellDef,
    MatHeaderCellDef,
    MatRowDef
  ],
  standalone: true
})
export class ListProfileComponent implements OnInit{
  displayedColumns: string[] = [
    'code',
    'libelle',
    'portee',
    'actions'
  ];

  datasource: any;
  profiles: any;
  profileForm!: FormGroup;
  searchValue!: any;
  profileToUpdate: any;
  pageOptions: any = { page: 0, size: 20 };
  loadingIndicator = true;
  showErrorMessage= false;

  // add = Authority.ADD_PROFIL;
  // read = Authority.READ_PROFIL;
  // update = Authority.EDIT_PROFIL;
  // delete = Authority.DELETE_PROFIL;
  // config = Authority.CONFIGURE_PROFIL;

  constructor(
    private readonly fb: FormBuilder,
    private readonly profileService: ProfilService,
    private readonly router: Router,
    private readonly modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getAllProfiles();

    this.createForm();
  }

  createForm() {
    this.profileForm = this.fb.group({
      code: [''],
      libelle: ['']
    })
  }

  createProfile() {
    const profileRequest = this.getProfileRequest();

    this.profileService.createProfile(profileRequest).subscribe({
      next: value => console.log('profil ', value.libelle, ' added successfully'),
      error: value => { },
      complete: () => {
        this.profileForm.reset();
        this.getAllProfiles();
      }
    })
  }

  getProfileRequest(): any {
    return {
      code: this.profileForm.value.code,
      libelle: this.profileForm.value.libelle
    }
  }

  getAllProfiles() {
    this.loadingIndicator = true;
    this.profileService.readProfiles(this.pageOptions).subscribe({
      next: value => {
        this.datasource = value;
        this.profiles = value.content;
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

  goToConfigProfile(profileId: any) {
    localStorage.setItem('profileId', JSON.stringify(profileId));
    this.router.navigateByUrl('/admin/securite/config-profile');
  }

  openBasicModal(content: TemplateRef<any>, profile?: any) {
    this.profileToUpdate = profile;
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    }).catch((res) => { });
  }

  close(event: boolean) {
    if (event) {
      this.modalService.dismissAll();
      this.getAllProfiles();
    }
  }


  doSearch(data: any) {
    this.pageOptions = data;
    this.pageOptions.page = 0;
    this.pageOptions.size = 20;
    this.getAllProfiles();
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllProfiles();
  }

  deleteProfile(profileId: any){
    Alertes.confirmAction(
      'Voulez-vous supprimer ?',
      'Cet élément sera definitivement supprimé',
      () => {
        this.profileService.deleteProfile(profileId).subscribe({
          next: value => Alertes.alerteDeleteSuccess('Suppression reussie'),
          error: value => Alertes.alerteDeleteDanger(value.error.message),
          complete: () => this.getAllProfiles()
        })
      }
    );
  }

  protected readonly Number = Number;
}
