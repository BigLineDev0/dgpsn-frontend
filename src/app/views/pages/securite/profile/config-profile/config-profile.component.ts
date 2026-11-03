import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProfilService} from 'src/app/services/profil/profil.service';
import {Alertes} from 'src/app/util/alerte';
import {RouterLink} from "@angular/router";
import {NgSelectComponent} from "@ng-select/ng-select";
import {NgForOf} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {PermissionsService} from "@/app/services/permissions/permissions.service";
import {MatAccordion, MatExpansionModule, MatExpansionPanel, MatExpansionPanelTitle} from "@angular/material/expansion";

@Component({
  selector: 'app-config-profile',
  templateUrl: './config-profile.component.html',
  styleUrls: ['./config-profile.component.scss'],

  imports: [
    RouterLink,
    NgSelectComponent,
    ReactiveFormsModule,
    FormsModule,
    NgForOf,
    NgbModule,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  standalone: true
})
export class ConfigProfileComponent implements OnInit{
  permissions: any;
  profile: any;
  selectedModule: any;
  selectedPermissions: any[] = [];
  modules: any;
  features: any;
  form: FormGroup = new FormGroup({});
  default_module: any = { module: 'DASHBOARD', feature: 'LIST_PROGRAMME'};

  constructor(
    private readonly profileService: ProfilService,
    private readonly permissionService: PermissionsService,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();

    this.getAllFeatures();

    this.getProfile();

    this.filterByModuleAndFeature({module: this.default_module.module});

    this.getAllModules();
  }

  initForm() {
    this.form = this.fb.group({
      moduleName: [this.default_module.module, Validators.required],
      featureName: [null, Validators.required]
    })
  }

  getAllModules() {
    this.profileService.readModules().subscribe({
      next: value => {
        this.modules = value;
        //Trie les modules par ordre alphabétique
        this.modules.sort((a: any, b: any) => a.description.localeCompare(b.description));
      }
    })
  }

  getFeature(event?: any) {
    this.permissionService.readFeatureByModule(event?.name).subscribe({
      next: value => {
        this.features = value?.body;
        //Trie les permissions par ordre alphabétique
        this.features.sort((a: any, b: any) => a.description.localeCompare(b.description));
      }
    });

    this.doSearch();
  }

  getAllFeatures() {
    this.permissionService.readFeatureByModule(this.default_module.module).subscribe({
      next: value => {
        this.features = value.body;
        //Trie les permissions par ordre alphabétique
        this.features.sort((a: any, b: any) => a.description.localeCompare(b.description));
      }
    });
  }

  getProfile() {
    const profileId = JSON.parse(localStorage.getItem('profileId')!);
    this.profileService.readProfile(profileId).subscribe({
      next: value => {
        this.profile = value;
        //trie les permissions par ordre alphabétique
        this.profile.permissions.sort((a: any, b: any) => a.description.localeCompare(b.description));
        this.selectedPermissions = this.profile.permissions;
      }
    })
  }

  filterByModuleAndFeature(req: any) {
    this.permissionService.filterByModuleAndFeature(req).subscribe({
      next: value => {
        this.permissions = value?.body;
        console.log("this.permissions", this.permissions);
        //Trie les permissions par ordre alphabétique
        this.permissions.sort((a: any, b: any) => a.description.localeCompare(b.description));
        this.permissions = this.mapPermissions(this.permissions);
      },
      error: value => console.log(value)
    });
  }

  doSearch() {
    const req = {
      module: this.form.value.moduleName,
      feature: this.form.value.featureName
    }
    this.filterByModuleAndFeature(req);
  }

  saveConfig() {
    this.profile.permissions = this.selectedPermissions
    this.profileService.updateProfile(this.profile.id, this.profile).subscribe({
      next: value => Alertes.alerteAddSuccess(),
      error: value => Alertes.alerteAddDanger(),
      complete: () => this.getProfile()
    })
  }

  changePermission(permission: any): any {
    if(permission.checked) {
      this.selectedPermissions.push(permission);
    } else {
      let i = 0;
      this.selectedPermissions.forEach(action=> {
        if(action.name === permission.name)
          this.selectedPermissions.splice(i, 1);
        i++;
      })
    }
  }

  isChecked(profile: any, permission: any): any {
    // Vérification supplémentaire pour éviter l'erreur
    if (!profile || !profile.permissions || !Array.isArray(profile.permissions)) {
      return false;
    }

    (profile.permissions as Array<any>).forEach(action => {
      if(action.name == permission.name) {
        permission.checked = true;
      }
    });

    return permission.checked;
  }

  mapPermissions(permissions: any[]): any[] {
    return permissions.map(permission => {
      permission.checked = false;
      return permission;
    });
  }

  changeAllPermission(event: any, permissions: any[]) {
    if(event.srcElement.checked) {
      permissions.forEach(permission => {
        let value: boolean = true;
        this.selectedPermissions.forEach(selectedPermission => {
          if(selectedPermission.name === permission.name) {
            value = false;
            return;
          }
        });

        if(value) this.selectedPermissions.push(permission);
      })
    } else {
      permissions.forEach(permission => {
        let i = 0;
        this.selectedPermissions.forEach(selectedPermission => {
          if(permission.name === selectedPermission.name) {
            this.selectedPermissions.splice(i, 1);
            permission.checked = false;
          }
          i++;
          return;
        })
      });
    }
  }

  setCkeckAllPermission(permissions: any[]): boolean {
    let i = 0;
    permissions?.forEach(permission => {
      this.selectedPermissions.forEach(selectedPermission => {
        if(permission.name === selectedPermission.name) {
          i++;
          return;
        }
      })
    });
    return (permissions?.length === i)? true: false;
  }
}
