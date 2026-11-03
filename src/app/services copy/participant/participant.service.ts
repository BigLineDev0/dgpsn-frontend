import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(protected http: HttpClient) { }

  // Add participant to formation
  addParticipant(participant: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}participant`, participant);
  }

  // Update participant
  updateParticipant(participantId: any, participant: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}participant/${participantId}`, participant);
  }

  // Delete participant
  deleteParticipant(participantId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}participant/${participantId}`);
  }

  // Read all participants of formation
  readParticipants(req?: any): Observable<any> {
    let parametres: HttpParams = new HttpParams();

    if (req) {
      if (req?.formationId != undefined && req?.formationId) {
        parametres = parametres.append("formationId", req?.formationId);
      }
      if (req?.idEmploye != undefined && req?.idEmploye) {
        parametres = parametres.append("idEmploye", req?.idEmploye);
      }
      if (req?.dateInscription != undefined && req?.dateInscription) {
        parametres = parametres.append("dateInscription", req?.dateInscription);
      }
      if (req?.statutParticipation != undefined && req?.statutParticipation) {
        parametres = parametres.append("statutParticipation", req?.statutParticipation);
      }
      return this.http.get<any>(
        `${environment.baseUrl}participant?page=${req.page}&size=${req.size}`, {
          params: parametres
        }
      );
    } else {
      return this.http.get<any>(
        `${environment.baseUrl}participant?page=${0}&size=${100000}`, {
          params: parametres
        }
      );
    }
  }

  // Import participants
  importParticipant(file: any, formationId: any) {
    let formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('formationId', formationId);

    return this.http.post<any>(`${environment.baseUrl}participant/import`, formData, {
      observe: 'response'
    });
  }

  // Export participants
  exportParticipants() {
    return this.http.get(`${environment.baseUrl}participant/export`, {
      responseType: 'blob'
    });
  }
}