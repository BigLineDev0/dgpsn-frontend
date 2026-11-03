import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(protected http: HttpClient) { }

  // Add participants to formation
  addParticipant(participant: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}participants`, participant);
  }

  // Update participants
  updateParticipant(participantsId: any, participant: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}participants/${participantsId}`, participant);
  }

  // Delete participants
  deleteParticipant(participantId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}participants/${participantId}`);
  }

  // Read all participantss of formation
  readParticipants(req?: any): Observable<any> {
    let parametres: HttpParams = new HttpParams();

    if (req) {
      if (req?.formationId != undefined && req?.formationId) {
        parametres = parametres.append("formationId", req.formationId);
      }

      if (req?.agentId != undefined && req?.agentId) {
        parametres = parametres.append("agentId", req.agentId);
      }

      if (req?.dateInscription != undefined && req?.dateInscription) {
        parametres = parametres.append("dateInscription", req.dateInscription);
      }

      if (req?.statut != undefined && req?.statut) {
        parametres = parametres.append("statut", req.statut);
      }

      if (req?.typeParticipant != undefined && req?.typeParticipant) {
        parametres = parametres.append("typeParticipant", req.typeParticipant);
      }

      if (req?.noteEvaluation != undefined && req?.noteEvaluation) {
        parametres = parametres.append("noteEvaluation", req.noteEvaluation);
      }

      if (req?.certificatObtenu != undefined && req?.certificatObtenu) {
        parametres = parametres.append("certificatObtenu", req.certificatObtenu);
      }

      if (req?.commentaires != undefined && req?.commentaires) {
        parametres = parametres.append("commentaires", req.commentaires);
      }

      return this.http.get<any>(
        `${environment.baseUrl}participants?page=${req.page}&size=${req.size}`, {
          params: parametres
        }
      );
    } else {
      return this.http.get<any>(
        `${environment.baseUrl}participants?page=${0}&size=${100000}`, {
          params: parametres
        }
      );
    }
  }

  // Import participantss
  importParticipant(file: any, formationId: any) {
    let formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('formationId', formationId);

    return this.http.post<any>(`${environment.baseUrl}participants/import`, formData, {
      observe: 'response'
    });
  }

  // Export participantss
  exportParticipants() {
    return this.http.get(`${environment.baseUrl}participants/export`, {
      responseType: 'blob'
    });
  }
}