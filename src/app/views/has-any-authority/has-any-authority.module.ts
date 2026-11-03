// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { HasAnyAuthorityDirective } from './has-any-authority.directive';



// @NgModule({
//   declarations: [
//     // HasAnyAuthorityDirective
//   ],
//   imports: [
//     CommonModule
//   ],
//   exports: [
//     // HasAnyAuthorityDirective
//   ]
// })
// export class HasAnyAuthorityDirective { }
import { AuthService } from '@/app/services/auth/auth.service';
import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';
 // adapte le chemin si nécessaire

@Directive({
  selector: '[afHasAnyAuthority]',
  standalone: true // ✅ Compatible Angular 15+ / 19
})
export class HasAnyAuthorityDirective {
  private authService = inject(AuthService);

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set afHasAnyAuthority(requiredAuthorities: string[] | string) {

    // 🔍 Récupère les permissions actuelles de l’utilisateur
    const userPermissions = this.authService.userPermissions || [];
    console.log("userPermissions", userPermissions);

   // ALL_ACCESS,ROOT_ADMIN
    requiredAuthorities = [...requiredAuthorities, 'ALL_ACCESS', 'ROOT_ADMIN'];

    // Si c’est un seul rôle en string
    if (typeof requiredAuthorities === 'string') {
      requiredAuthorities = [requiredAuthorities];
    }

    // Vérifie si l’utilisateur a au moins une des permissions demandées
    const hasPermission = requiredAuthorities.some(auth =>
      userPermissions.includes(auth)
    );

    // Affiche ou masque le contenu
    if (hasPermission) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
