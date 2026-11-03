import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment'; 

@Injectable({ providedIn: 'root' }) 
export class FournisseurService {
    
    constructor(protected http: HttpClient) { }
    
    // Création d'un fournisseur (payload JSON pour simplicité/propreté)
    createFournisseur(fournisseur: any): Observable<any> { 
        return this.http.post<any>(`${environment.baseUrl}fournisseurs`, fournisseur); 
    }
    
    // Modification d'un fournisseur
    updateFournisseur(fournisseurId: number, fournisseur: any): Observable<any> { 
        return this.http.put<any>(`${environment.baseUrl}fournisseurs/${fournisseurId}`, fournisseur, { 
            observe: 'response',
        });
    }

    // Lire tous les fournisseurs (avec filtres de ListFournisseurComponent [60])
    getAllFournisseurs(req?: any): Observable<any> {
        let parametres: HttpParams = new HttpParams();
        if (req) {
            if (req?.raisonSociale) {
                parametres = parametres.append("raisonSociale", req.raisonSociale);
            }
            if (req?.codeFournisseur) {
                parametres = parametres.append("codeFournisseur", req.codeFournisseur);
            }
            if (req?.ninea) {
                parametres = parametres.append("ninea", req.ninea);
            }
            if (req?.categorieFournisseur) {
                parametres = parametres.append("categorieFournisseur", req.categorieFournisseur);
            }
            if (req?.statut) {
                parametres = parametres.append("statut", req.statut);
            }
            parametres = parametres.append("page", req.page || 0);
            parametres = parametres.append("size", req.size || 20);
            
            // Si le tri est inclus, ajouter sortBy et ascending, 
            if (req?.sortBy) {
                parametres = parametres.append("sortBy", req.sortBy);
            }
            if (req?.ascending !== undefined) {
                parametres = parametres.append("ascending", req.ascending);
            }

            return this.http.get<any>(`${environment.baseUrl}fournisseurs`, { 
                params: parametres 
            }); 
        } else {
            // Requête par défaut (si pas de pagination)
            return this.http.get<any>(`${environment.baseUrl}fournisseurs?page=0&size=100000`);
        }
    }
    
    // Supprimer un fournisseur
    deleteFournisseur(fournisseurId: number): Observable<any> { 
        return this.http.delete<any>(`${environment.baseUrl}fournisseurs/${fournisseurId}`, { 
            observe: 'response',
        }); 
    }

    // Lire un fournisseur (pour les détails si nécessaire)
    readFournisseur(id: number): Observable<any> {
        return this.http.get<any>(`${environment.baseUrl}fournisseurs/${id}`, { observe: 'response' });
    }
}