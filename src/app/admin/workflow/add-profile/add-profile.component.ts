
// import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
// import { ProfilService } from 'src/app/services/profil/profil.service';
// import { UserService } from 'src/app/services/user/user.service';
// import { ResponseApi } from 'src/app/util/response.model';
// import { map } from 'rxjs';
// import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
// import { WorkflowService } from 'src/app/services/workflow/workflow.service';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatRippleModule } from '@angular/material/core';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatDividerModule } from '@angular/material/divider';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatIconModule } from '@angular/material/icon';
// import { MatInputModule } from '@angular/material/input';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { MatRadioModule } from '@angular/material/radio';
// import { MatSelectModule } from '@angular/material/select';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatStepperModule } from '@angular/material/stepper';
// import { MatTableModule } from '@angular/material/table';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgSelectModule } from '@ng-select/ng-select';
// import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
// import { ButtonModule } from 'primeng/button';
// import { ListboxModule } from 'primeng/listbox';
// import { PickListModule } from 'primeng/picklist';
// import { RadioButtonModule } from 'primeng/radiobutton';

// @Component({
//   selector: 'app-add-profile',
//   templateUrl: './add-profile.component.html',
//   styleUrls: ['./add-profile.component.scss'],
//    standalone: true,
//    imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     ListboxModule,
//     RadioButtonModule,
//     ButtonModule,
//     PickListModule,
//     FormsModule,
//     NgSelectModule,
//     MatDialogModule,
//     HasAnyAuthorityDirective,
//     MatButtonModule,
//     MatCheckboxModule,
//     MatDatepickerModule,
//     MatDividerModule,
//     MatFormFieldModule,
//     MatIconModule,
//     MatInputModule,
//     MatMenuModule,
//     // MatMomentDateModule,
//     MatProgressBarModule,
//     MatRadioModule,
//     MatRippleModule,
//     MatSelectModule,
//     MatSidenavModule,
//     MatTableModule,
//     MatTooltipModule,
//     // FuseFindByKeyPipeModule,
//     // SharedModule,
//     MatStepperModule,
//     NgbPaginationModule,
//     // FuseAlertModule,
//   ],
//   encapsulation: ViewEncapsulation.None
// })
// export class AddProfileComponent implements OnInit {

//   selectedProfils: any
//   selectedStep: string | null = null; 
//   selectedWorkflow: any;
//   selectedSteps: any[] = [];
//   filteredSteps: any[] = [];
//   steps = [
//     { label: 'Analyse du risque par le responsable', selectedStep: false },
//     { label: 'Validation par le comité de conformité', selectedStep: false },
//     { label: 'Approbation par la direction des risques', selectedStep: false },
//     { label: 'Mise en œuvre et suivi', selectedStep: false },
//     { label: 'Aucune validation requise', selectedStep: false },
// ];


//   profils:any[] = [];
//   users: any[] = [];
//   selectedUsers: any[] = [];

//   configValidation: any;

//   constructor(
//     private workflowService: WorkflowService,
//     private profileService: ProfilService,
//     private userService: UserService,
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private dialogRef: MatDialogRef<AddProfileComponent>
//   ) { 
//     if (this.data.users === undefined) {
//       this.data.users = [];
//     }
//   }

//   ngOnInit(): void {
//     console.log("DATA: ", this.data)
//     this.getProfiles();
//     this.selectedProfils = this.profils.length > 0 ? this.profils[0] : null;
//   }

//   getProfiles() {
//     this.profileService.readProfiles().subscribe({
//       next: resopnse => {
//         this.profils = resopnse.content;
//       }
//     })
//   }

//   getUsers() {
//     const params = {
//       profileId : this.selectedProfils.id,
//       page: 0,
//       size: 100
//     };

//     this.userService.readUsers(params).subscribe({
//       next: (response: any) => {
//         this.users = response.payload;
        
//         this.users.map(user => {
//           let userFound = (this.data.users as Array<any>).find(userconfig => userconfig.id == user.id);
//           if (userFound !== undefined) {
//             user.checked = true
//             this.selectedUsers.push(user);
//           } else {
//             user.checked = false;
//           }
//         });
//       }
//     });
//   }

//   toggleCheckBox($event: any, user: any) {
//     if ($event.checked) {
//       this.selectedUsers.push(user);
//     } else {
//       this.selectedUsers.splice(this.selectedUsers.indexOf(user), 1);
//     }
//   }

//   getConfigWorkflow() {
//     const params = {
//       profileId: this.selectedProfils.id,
//       workflowStepId: this.data.step.id
//     };

//     this.workflowService.readWorkflowUserConfig(params.workflowStepId, params.profileId).subscribe({
//       next: (response: any) => {
//         this.configValidation = response;
//       }
//     })
//   }

//   saveConfig() {
//     const userIds = this.selectedUsers.map(user => {
//       return {
//         id: user.id,
//         prenom: user.agent.prenom,
//         nom: user.agent.nom
//       }
//     })

//     this.dialogRef.close(userIds);
//   }
  
// }

import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { ProfilService } from 'src/app/services/profil/profil.service';
import { UserService } from 'src/app/services/user/user.service';
import { ResponseApi } from 'src/app/util/response.model';
import { map } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss'],
  
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    MatDialogModule,
    HasAnyAuthorityDirective,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatTableModule,
    MatProgressBarModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatTooltipModule,
    MatStepperModule,
    MatListModule,
    NgbPaginationModule,
  ],
  encapsulation: ViewEncapsulation.None
})
export class AddProfileComponent implements OnInit {

  selectedProfils: any;
  selectedStep: string | null = null; 
  selectedWorkflow: any;
  selectedSteps: any[] = [];
  filteredSteps: any[] = [];
  
  steps = [
    { label: 'Analyse du risque par le responsable', selectedStep: false },
    { label: 'Validation par le comité de conformité', selectedStep: false },
    { label: 'Approbation par la direction des risques', selectedStep: false },
    { label: 'Mise en œuvre et suivi', selectedStep: false },
    { label: 'Aucune validation requise', selectedStep: false },
  ];

  profils: any[] = [];
  users: any[] = [];
  selectedUsers: any[] = [];
  
  // Colonnes affichées dans le tableau
  displayedColumns: string[] = ['select', 'nom', 'prenom', 
    // 'skip'
  ];

  configValidation: any;

  constructor(
    private workflowService: WorkflowService,
    private profileService: ProfilService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddProfileComponent>
  ) { 
    if (this.data.users === undefined) {
      this.data.users = [];
    }
  }

  ngOnInit(): void {
    console.log("DATA: ", this.data);
    this.getProfiles();
  }

  getProfiles() {
    this.profileService.readProfiles().subscribe({
      next: response => {
        this.profils = response.content;
        // Sélectionner le premier profil par défaut
        if (this.profils.length > 0) {
          this.selectedProfils = [this.profils[0]];
          this.getUsers();
        }
      }
    });
  }

  getUsers() {
    if (!this.selectedProfils || this.selectedProfils.length === 0) {
      return;
    }

    const selectedProfile = this.selectedProfils[0];
    
    const params = {
      profileId: selectedProfile.id,
      page: 0,
      size: 100
    };

    this.userService.readUsers(params).subscribe({
      next: (response: any) => {
        this.users = response.content;
        console.log("this.users",this.users)
        
        this.users.map(user => {
          let userFound = (this.data.users as Array<any>).find(userconfig => userconfig.id == user.id);
          if (userFound !== undefined) {
            user.checked = true;
            this.selectedUsers.push(user);
          } else {
            user.checked = false;
          }
        });
      }
    });
  }

  toggleCheckBox($event: any, user: any) {
    if ($event.checked) {
      this.selectedUsers.push(user);
    } else {
      this.selectedUsers.splice(this.selectedUsers.indexOf(user), 1);
    }
  }

  getConfigWorkflow() {
    if (!this.selectedProfils || this.selectedProfils.length === 0) {
      return;
    }

    const selectedProfile = this.selectedProfils[0];
    
    const params = {
      profileId: selectedProfile.id,
      workflowStepId: this.data.step.id
    };

    this.workflowService.readWorkflowUserConfig(params.workflowStepId, params.profileId).subscribe({
      next: (response: any) => {
        this.configValidation = response;
      }
    });
  }

  saveConfig() {
    const userIds = this.selectedUsers.map(user => {
      return {
        id: user.id,
        prenom: user.agent.prenom,
        nom: user.agent.nom
      };
    });

    this.dialogRef.close(userIds);
  }
}