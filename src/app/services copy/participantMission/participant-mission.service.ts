import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParticipantMissionService {

  constructor(protected http: HttpClient) { }

  // Add participant to mission
  addParticipantMission(participantMission: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}participantMission`, participantMission);
  }

  // Update participant mission
  updateParticipantMission(participantMissionId: any, participantMission: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}participantMission/${participantMissionId}`, participantMission);
  }

  // Delete participant mission
  deleteParticipantMission(participantMissionId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}participantMission/${participantMissionId}`);
  }

  // Read all participants of mission
  readParticipantMissions(req?: any): Observable<any> {
    let parametres: HttpParams = new HttpParams();

    if (req) {
      if (req?.missionId != undefined && req?.missionId) {
        parametres = parametres.append("missionId", req?.missionId);
      }
      if (req?.idEmploye != undefined && req?.idEmploye) {
        parametres = parametres.append("idEmploye", req?.idEmploye);
      }
      if (req?.roleMission != undefined && req?.roleMission) {
        parametres = parametres.append("roleMission", req?.roleMission);
      }
      if (req?.dateAssignation != undefined && req?.dateAssignation) {
        parametres = parametres.append("dateAssignation", req?.dateAssignation);
      }
      return this.http.get<any>(
        `${environment.baseUrl}participantMission?page=${req.page}&size=${req.size}`, {
          params: parametres
        }
      );
    } else {
      return this.http.get<any>(
        `${environment.baseUrl}participantMission?page=${0}&size=${100000}`, {
          params: parametres
        }
      );
    }
  }

  // Import participant missions
  importParticipantMission(file: any, missionId: any) {
    let formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('missionId', missionId);

    return this.http.post<any>(`${environment.baseUrl}participantMission/import`, formData, {
      observe: 'response'
    });
  }

  // Export participant missions
  exportParticipantMissions() {
    return this.http.get(`${environment.baseUrl}participantMission/export`, {
      responseType: 'blob'
    });
  }
}