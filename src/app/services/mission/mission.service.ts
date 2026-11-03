import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor(protected http: HttpClient) { }

  // Add mission to project
  addMission(mission: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}mission`, mission);
  }

  // Update mission
  updateMission(missionId: any, mission: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}mission/${missionId}`, mission);
  }

  // Delete mission
  deleteMission(missionId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}mission/${missionId}`);
  }

  // Read all missions of project
  readMissions(req?: any): Observable<any> {
    let parametres: HttpParams = new HttpParams();

    if (req) {
      if (req?.projetId != undefined && req?.projetId) {
        parametres = parametres.append("projetId", req?.projetId);
      }
      if (req?.numeroOrdreMission != undefined && req?.numeroOrdreMission) {
        parametres = parametres.append("numeroOrdreMission", req?.numeroOrdreMission);
      }
      if (req?.typeMission != undefined && req?.typeMission) {
        parametres = parametres.append("typeMission", req?.typeMission);
      }
      if (req?.lieuDestination != undefined && req?.lieuDestination) {
        parametres = parametres.append("lieuDestination", req?.lieuDestination);
      }
      if (req?.statut != undefined && req?.statut) {
        parametres = parametres.append("statut", req?.statut);
      }
      return this.http.get<any>(
        `${environment.baseUrl}mission?page=${req.page}&size=${req.size}`, {
          params: parametres
        }
      );
    } else {
      return this.http.get<any>(
        `${environment.baseUrl}mission?page=${0}&size=${100000}`, {
          params: parametres
        }
      );
    }
  }

  // Import missions
  importMission(file: any, projetId: any) {
    let formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('projetId', projetId);

    return this.http.post<any>(`${environment.baseUrl}mission/import`, formData, {
      observe: 'response'
    });
  }

  // Export missions
  exportMissions() {
    return this.http.get(`${environment.baseUrl}mission/export`, {
      responseType: 'blob'
    });
  }
}