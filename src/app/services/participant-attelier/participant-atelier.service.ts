import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParticipantAtelierService {

  constructor(protected http: HttpClient) { }

  // Add participant to atelier
  addParticipantAtelier(participantAtelier: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}participantAtelier`, participantAtelier);
  }

  // Update participant atelier
  updateParticipantAtelier(participantAtelierId: any, participantAtelier: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}participantAtelier/${participantAtelierId}`, participantAtelier);
  }

  // Delete participant atelier
  deleteParticipantAtelier(participantAtelierId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}participantAtelier/${participantAtelierId}`);
  }

  // Read all participants of atelier
  readParticipantAteliers(req?: any): Observable<any> {
    let parametres: HttpParams = new HttpParams();

    if (req) {
      if (req?.atelierId != undefined && req?.atelierId) {
        parametres = parametres.append("atelierId", req?.atelierId);
      }
      if (req?.idEmploye != undefined && req?.idEmploye) {
        parametres = parametres.append("idEmploye", req?.idEmploye);
      }
      if (req?.dateInscription != undefined && req?.dateInscription) {
        parametres = parametres.append("dateInscription", req?.dateInscription);
      }
      if (req?.statutPresence != undefined && req?.statutPresence) {
        parametres = parametres.append("statutPresence", req?.statutPresence);
      }
      return this.http.get<any>(
        `${environment.baseUrl}participantAtelier?page=${req.page}&size=${req.size}`, {
          params: parametres
        }
      );
    } else {
      return this.http.get<any>(
        `${environment.baseUrl}participantAtelier?page=${0}&size=${100000}`, {
          params: parametres
        }
      );
    }
  }

  // Import participant ateliers
  importParticipantAtelier(file: any, atelierId: any) {
    let formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('atelierId', atelierId);

    return this.http.post<any>(`${environment.baseUrl}participantAtelier/import`, formData, {
      observe: 'response'
    });
  }

  // Export participant ateliers
  exportParticipantAteliers() {
    return this.http.get(`${environment.baseUrl}participantAtelier/export`, {
      responseType: 'blob'
    });
  }
}