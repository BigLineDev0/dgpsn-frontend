import {Directive, Input, OnDestroy, TemplateRef, ViewContainerRef} from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import {Subscription} from 'rxjs';
import { AuthService } from '@/app/services/auth/auth.service';
import { Authority } from '@/app/util/Authority';



@Directive({
    selector: '[afHasAnyAuthority]'
})
export class HasAnyAuthorityDirective implements OnDestroy {
    private authorities: string[] = [];
    private authenticationSubscription?: Subscription;
    constructor(
        private authService: AuthService,
        private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef
    ) {}

    @Input("afHasAnyAuthority")
    set afHasAnyAuthority(value: string | string[]) {
        this.authorities = typeof value === 'string' ? [value] : value;
        // console.log("ok = ", this.authorities)
        this.updateView();
        this.authenticationSubscription = this.authService.getAuthenticationState().subscribe(() => this.updateView());
    }

    ngOnDestroy(): void {
        if (this.authenticationSubscription) {
        this.authenticationSubscription.unsubscribe();
        }
    }

    private updateView(): void {
        if(!this.authorities || this.authorities.length <= 0) {
            this.viewContainerRef.clear();
            this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else {
            const hasAnyAuthority = this.hasAnyAuthority(this.authorities);
            this.viewContainerRef.clear();
            if (hasAnyAuthority) {
                this.viewContainerRef.createEmbeddedView(this.templateRef);
            }
        }

    }

    hasAnyAuthority(authorities: string[]): boolean{

        // let token: any = localStorage.getItem('accessToken');
        let token: any = sessionStorage.getItem('accessToken');
        const decode = new JwtHelperService();
        const decodedToken = decode.decodeToken(token);
        // console.log("decodedToken", decodedToken)
        let roles = decodedToken.auth;
        roles = roles.split(",");


        for (let i = 0; i < authorities.length; i++) {
            if (roles.includes(authorities[i]) || roles.includes(Authority.ALL_ACCESS)) {

              return true;
            }
          }

       return false;
    }

}
