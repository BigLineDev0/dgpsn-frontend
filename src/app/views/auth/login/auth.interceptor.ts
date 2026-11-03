import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Alertes } from '../../../util/alerte';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router, private modal: NgbModal) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Exclure les requêtes pour l'authentification et toutes les routes publiques
        const PUBLIC_URLS = ['/signIn', '/login', '/public'];

        if (PUBLIC_URLS.some(url => req.url.includes(url))) {
            return next.handle(req);
        }

        const token = sessionStorage.getItem('accessToken');
        if (token) {
            const decode = new JwtHelperService();
            const decodedToken = decode.decodeToken(token);
            const exp = decodedToken.exp;
            const newDate = Math.floor(new Date().getTime() / 1000);
            if (newDate > exp) {
                sessionStorage.clear();
                localStorage.clear();
                this.router.navigateByUrl('/auth/login'); // Corriger la typo /siginIn -> /signIn
                this.modal.dismissAll();
                Alertes.alerteCustomDanger('Session expirée, veuillez-vous reconnecter');
                return next.handle(req); // Continue la requête après redirection
            }

            // Ajouter le token aux en-têtes pour les requêtes authentifiées
            const request = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token.trim()}`,
                },
            });
            return next.handle(request).pipe(
                tap({
                    error: (err: HttpErrorResponse) => {
                        if (err.status === 401) {
                            sessionStorage.clear();
                            localStorage.clear();
                            this.router.navigateByUrl('/auth/login');
                            this.modal.dismissAll();
                            Alertes.alerteCustomDanger('Session invalide, veuillez-vous reconnecter');
                        } else if (err.status === 403) {
                            // Gérer les erreurs 403 si nécessaire
                        }
                    },
                })
            );
        } else {
            // Rediriger vers la page de connexion pour les routes non publiques sans token
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigateByUrl('/auth/login');
            this.modal.dismissAll();
            Alertes.alerteCustomDanger('Vous n\'êtes pas authentifié. Veuillez vous connecter.');
            return next.handle(req);
        }
    }
}
