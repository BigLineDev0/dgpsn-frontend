import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormationExterieurService {

  constructor(protected http: HttpClient) { }

  // Add formation to project
  addFormationExterieur(formation: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}formationExterieur`, formation);
  }

  // Update formation
  updateFormationExterieur(formationId: any, formation: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}formationExterieur/${formationId}`, formation);
  }

  // Delete formation
  deleteFormationExterieur(formationId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}formationExterieur/${formationId}`);
  }

  // Read all formations of project
  readFormations(req?: any): Observable<any> {
    let parametres: HttpParams = new HttpParams();

    if (req) {
      if (req?.projectId != undefined && req?.projectId) {
        parametres = parametres.append("projectId", req?.projectId);
      }
      if (req?.titreFormation != undefined && req?.titreFormation) {
        parametres = parametres.append("titreFormation", req?.titreFormation);
      }
      if (req?.organismeFormateur != undefined && req?.organismeFormateur) {
        parametres = parametres.append("organismeFormateur", req?.organismeFormateur);
      }
      if (req?.dateDebut != undefined && req?.dateDebut) {
        parametres = parametres.append("dateDebut", req?.dateDebut);
      }
      if (req?.statut != undefined && req?.statut) {
        parametres = parametres.append("statut", req?.statut);
      }
      return this.http.get<any>(
        `${environment.baseUrl}formationExterieur?page=${req.page}&size=${req.size}`, {
          params: parametres
        }
      );
    } else {
      return this.http.get<any>(
        `${environment.baseUrl}formationExterieur?page=${0}&size=${100000}`, {
          params: parametres
        }
      );
    }
  }

  // Import formations
  importFormationExterieur(file: any, projectId: any) {
    let formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('projectId', projectId);

    return this.http.post<any>(`${environment.baseUrl}formationExterieur/import`, formData, {
      observe: 'response'
    });
  }

  // Export formations
  exportFormations() {
    return this.http.get(`${environment.baseUrl}formationExterieur/export`, {
      responseType: 'blob'
    });
  }
}