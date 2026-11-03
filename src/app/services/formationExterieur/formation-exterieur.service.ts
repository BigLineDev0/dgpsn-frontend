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
    return this.http.post<any>(`${environment.baseUrl}formation-exterieurs`, formation);
  }

  // Update formation
  updateFormationExterieur(formationId: any, formation: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}formation-exterieurs/${formationId}`, formation);
  }

  // Delete formation
  deleteFormationExterieur(formationId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}formation-exterieurs/${formationId}`);
  }

  // Read all formations of project
  readFormations(req?: any): Observable<any> {
    let parametres: HttpParams = new HttpParams();

    if (req) {
      if (req?.titreFormation != undefined && req?.titreFormation) {
        parametres = parametres.append("titreFormation", req.titreFormation);
      }
      if (req?.organismeFormateur != undefined && req?.organismeFormateur) {
        parametres = parametres.append("organismeFormateur", req.organismeFormateur);
      }
      if (req?.lieu != undefined && req?.lieu) {
        parametres = parametres.append("lieu", req.lieu);
      }
      if (req?.dateDebut != undefined && req.dateDebut) {
        parametres = parametres.append("dateDebut", req.dateDebut);
      }
      if (req?.dateFin != undefined && req.dateFin) {
        parametres = parametres.append("dateFin", req.dateFin);
      }
      if (req?.dureeJours != undefined && req.dureeJours) {
        parametres = parametres.append("dureeJours", req.dureeJours.toString());
      }
      if (req?.agentId != undefined && req.agentId) {
        parametres = parametres.append("agentId", req.agentId);
      }
      if (req?.coutTotal != undefined && req.coutTotal) {
        parametres = parametres.append("coutTotal", req.coutTotal.toString());
      }
      if (req?.statut != undefined && req.statut) {
        parametres = parametres.append("statut", req.statut);
      }
      if (req?.objectifs != undefined && req.objectifs) {
        parametres = parametres.append("objectifs", req.objectifs.toString());
      }

    return this.http.get<any>(
        `${environment.baseUrl}formation-exterieurs?page=${req.page}&size=${req.size}`, {
          params: parametres
        }
      );
    } else {
      return this.http.get<any>(
        `${environment.baseUrl}formation-exterieurs?page=${0}&size=${100000}`, {
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

    return this.http.post<any>(`${environment.baseUrl}formation-exterieurs/import`, formData, {
      observe: 'response'
    });
  }

  // Export formations
  exportFormations() {
    return this.http.get(`${environment.baseUrl}formation-exterieurs/export`, {
      responseType: 'blob'
    });
  }
}