import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecrutementService {

  constructor(protected http: HttpClient) { }

  // ==================== CONTRATS ====================
  
  // Create contrat
  createcontrat(contrat: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}contrats`, contrat);
  }

  // Update contrat
  updatecontrat(contratId: any, contrat: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}contrats/${contratId}`, contrat, {
      observe: 'response',
    });
  }

  // Read all contrat
  readcontrats(req: any): Observable<any> {
    let parametres: HttpParams = new HttpParams();
    if(req){
      if(req?.code != undefined && req?.code){
        parametres = parametres.append("code", req?.code);
      }
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle", req?.libelle);
      }
      
      return this.http.get<any>(
        `${environment.baseUrl}contrats?page=${req.page}&size=${req.size}`, {
        params: parametres
      });
    } else {
      return this.http.get<any>(
        `${environment.baseUrl}contrats?page=${0}&size=${100000}`, {
        params: parametres
      });
    }
  }

  // Read a contrat
  readcontrat(contratId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}contrats/${contratId}`);
  }

  // Delete contrat
  deletecontrat(contratId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}contrats/${contratId}`, {
      observe: 'response',
    });
  }

  // Read By entreprise
  readByEntreprise(entrepriseId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}contrats/entreprise/${entrepriseId}`);
  }

  // Export contrat
  exportcontrat() {
    return this.http.get(`${environment.baseUrl}contrats/export`, {
      responseType: 'blob'
    });
  }

  // ==================== RECRUTEMENTS ====================

  /**
   * Créer un nouveau recrutement
   */
  createRecrutement(recrutement: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}recrutements`, recrutement);
  }

  /**
   * Mettre à jour un recrutement existant
   */
  updateRecrutement(recrutementId: any, recrutement: any): Observable<any> {
    // Retirez { observe: 'response' } pour obtenir directement le corps de la réponse JSON
    return this.http.put<any>(`${environment.baseUrl}recrutements/${recrutementId}`, recrutement);
}

  /**
   * Lire tous les recrutements avec pagination et filtres
   */
  readRecrutements(req: any): Observable<any> {
    let parametres: HttpParams = new HttpParams();
    
    if (req) {
      if (req?.libelle != undefined && req?.libelle) {
        parametres = parametres.append("libelle", req?.libelle);
      }
      if (req?.typeContrat != undefined && req?.typeContrat) {
        parametres = parametres.append("typeContrat", req?.typeContrat);
      }
      if (req?.dateRecrutement != undefined && req?.dateRecrutement) {
        parametres = parametres.append("dateRecrutement", req?.dateRecrutement);
      }
      
      return this.http.get<any>(
        `${environment.baseUrl}recrutements/all?page=${req.page}&size=${req.size}`, {
        params: parametres
      });
    } else {
      return this.http.get<any>(
        `${environment.baseUrl}recrutements?page=${0}&size=${100000}`, {
        params: parametres
      });
    }
  }

  /**
   * Lire un recrutement spécifique
   */
  readRecrutement(recrutementId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}recrutements/${recrutementId}`);
  }

  /**
   * Supprimer un recrutement
   */
  deleteRecrutement(recrutementId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}recrutements/${recrutementId}`, {
      observe: 'response',
    });
  }

   updateStatut(recrutementId: number, statut: string): Observable<any> {
    const url = `${environment.baseUrl}recrutements/${recrutementId}/statut`;
    const params = new HttpParams().set('statutType', statut);

    console.log(`Envoi de la requête PUT vers : ${url} avec le paramètre :`, params.toString());

    // CORRECTION : Passez `null` pour le corps (body) car le backend ne l'attend pas.
    return this.http.put<any>(url, null, { params });
  }

  /**
   * Exporter les recrutements
   */
  exportRecrutements() {
    return this.http.get(`${environment.baseUrl}recrutements/export`, {
      responseType: 'blob'
    });
  }

  /**
   * Rechercher des recrutements
   */
  searchRecrutements(searchParams: any): Observable<any> {
    let parametres: HttpParams = new HttpParams();
    
    if (searchParams) {
      Object.keys(searchParams).forEach(key => {
        if (searchParams[key] !== null && searchParams[key] !== undefined && searchParams[key] !== '') {
          parametres = parametres.append(key, searchParams[key].toString());
        }
      });
    }
    
    return this.http.get<any>(`${environment.baseUrl}recrutements/search`, {
      params: parametres
    });
  }
}