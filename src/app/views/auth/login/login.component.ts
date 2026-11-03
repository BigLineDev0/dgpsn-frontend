

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Alertes } from '@/app/util/alerte';
import { AuthService } from '@/app/services/auth/auth.service';
import { Authority } from '@/app/util/Authority';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MENU } from '@layouts/admin-layout/sidebar/menu';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
//   signInForm: FormGroup;
//   returnUrl: string;
//   loading: boolean = false;
//   showPassword: boolean = false;

//   constructor(
//     private router: Router,
//     private route: ActivatedRoute,
//     private fb: FormBuilder
//   ) {
//     this.returnUrl = '/tableauboard/alm-2';
//     this.signInForm = this.fb.group({
//       login: [''],
//       password: [''],
//     });
//   }

//   ngOnInit(): void {
//     const signUpButton: HTMLElement | null = document.getElementById('signUp');
//     const signInButton: HTMLElement | null = document.getElementById('signIn');
//     const container: HTMLElement | null = document.getElementById('container');

//     if (signUpButton && container) {
//       signUpButton.addEventListener('click', () => {
//         container.classList.add('right-panel-active');
//       });
//     }

//     if (signInButton && container) {
//       signInButton.addEventListener('click', () => {
//         container.classList.remove('right-panel-active');
//       });
//     }

//     this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/acces/list-agents';
//   }

//   togglePassword(input: HTMLInputElement) {
//     input.type = input.type === 'password' ? 'text' : 'password';
//     this.showPassword = input.type === 'text';
//   }

//   getIcon(): string {
//     return this.showPassword ? 'visibility' : 'visibility_off';
//   }

//   signIn(e: Event) {
//     e.preventDefault();
//     this.loading = true;

//     this.router.navigate([this.returnUrl]).then(() => {
//       this.loading = false;
//     }).catch((error) => {
//       Alertes.errorPopPup('Erreur', 'Erreur lors de la redirection.');
//       this.loading = false;
//     });
//   }

//   redirectToPublic(event: Event) {
//     event.preventDefault();
//     this.router.navigateByUrl('/').then(() => {
//       window.location.reload();
//     });
//   }
// }
 signInForm!: FormGroup;
  returnUrl: any;
  loading:boolean=false;
  showPassword: boolean = false;

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const signUpButton: any = document.getElementById('signUp');
    const signInButton: any = document.getElementById('signIn');
    const container: any = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/acces/list-agents';

    this.initForm();
  }

  togglePassword(input: any) {
    input.type === 'password' ? input.type = 'text' : input.type = 'password';
  }

  getIcon(input: any): any {
    return {
      off: input.type === 'password',
      on: input.type === 'text'
    }
  }

  initForm() {
    this.signInForm = this.fb.group({
      login     : ['', Validators.required],
      password  : ['', Validators.required]
    });
  }

  // signIn(){
  //   this.loading = true
  //   this._authService.signIn(this.signInForm.value).subscribe({
  //     next: (value) => {
  //       localStorage.setItem('isLoggedin', 'true');
  //       const decode = new JwtHelperService();
  //       const decodedToken = decode.decodeToken(value.access_token);
  //       console.log("decodedToken", decodedToken);
  //       localStorage.setItem('idUser',decodedToken.IdUser);
  //       this.router.navigate([this.returnUrl]);
  //     },
  //     error: (error) => {
  //       // console.log("lost", error)
  //       Alertes.alerteGlobal(undefined, error.error.message)
  //       this.loading=false;
  //     },
  //   });
  // }

  signIn() {
    this.loading = true;
    this._authService.signIn(this.signInForm.value).subscribe({
      next: (value) => {
        localStorage.setItem('isLoggedin', 'true');
        const decode = new JwtHelperService();
        const decodedToken = decode.decodeToken(value.access_token);
        localStorage.setItem('idUser', decodedToken.IdUser);
        console.log('decodedToken',decodedToken);
          console.log('decode',decode);
        

        // Récupérer les permissions du token
        const userPermissions = decodedToken.auth ? decodedToken.auth.split(',') : [];

        // Trouver la première page accessible
        const accessibleRoute = this.findAccessibleRoute(userPermissions);

        // Rediriger vers la page accessible
        this.router.navigate([accessibleRoute]);
        this.loading = false;
      },
      error: (error) => {
        Alertes.errorPopPup(
          error.error.message ?? "Une erreur est survenue. Il peut s’agir d’un problème de connexion réseau ou d’un souci temporaire côté serveur.",
          '',
        );
        this.loading = false;
      }
    });
  }

  // Fonction pour trouver la première page accessible
  findAccessibleRoute(permissions: string[]): string {
    // Vérifier d'abord le tableau de bord
    if (
      permissions.includes(Authority.READ_TDB_RESUME) ||
      permissions.includes(Authority.ALL_ACCESS) ||
      Authority.MODULE.DASHBOARD.DASHBOARD.some((perm: string) => permissions.includes(perm))
    ) {
      return '/admin/acces/list-agents';
    }

    // Parcourir le menu pour trouver une page accessible
    for (const menuItem of MENU) {
      // Vérifier si l'élément a un lien direct et une permission correspondante
      if (menuItem.link && menuItem.permissions) {
        if (
          typeof menuItem.permissions === 'string' &&
          (permissions.includes(menuItem.permissions) || permissions.includes(Authority.ALL_ACCESS))
        ) {
          return menuItem.link;
        } else if (
          Array.isArray(menuItem.permissions) &&
          menuItem.permissions.some((perm: string) => permissions.includes(perm))
        ) {
          return menuItem.link;
        }
      }

      // Vérifier les sous-éléments
      if (menuItem.subItems && menuItem.subItems.length > 0) {
        for (const subItem of menuItem.subItems) {
          if (
            subItem.link &&
            subItem.permissions &&
            (typeof subItem.permissions === 'string' &&
              (permissions.includes(subItem.permissions) || permissions.includes(Authority.ALL_ACCESS)))
          ) {
            return subItem.link;
          } else if (
            Array.isArray(subItem.permissions) &&
            subItem.permissions.some((perm: string) => permissions.includes(perm))
          ) {
            return subItem.link;
          }
        }
      }
    }

    // Si aucune page n'est accessible, rediriger vers une page par défaut
    Alertes.errorPopPup('Erreur', 'Vous n\'avez pas les permissions nécessaires pour accéder à cette page.');
    return '/securite/users'; // Exemple : page utilisateur ou page d'erreur
  }

  redirectToPublic(event: any) {
    event?.preventDefault();

    this.router.navigateByUrl('/').then(val => {
      window.location.reload();
    })
  }

  redirectToDashboard() {
    this.router.navigate(['/admin/acces/list-agents']);
  }
}

