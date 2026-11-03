import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AtelierService {

  constructor(protected http : HttpClient) { }

  addAtelier(Atelier: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}ateliers`, Atelier);
  }

  updateAtelier(atelierId: any, atelier: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}ateliers/${atelierId}`, atelier);
  }

  deleteAtelier(atelierId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}ateliers/${atelierId}`);
  }

  readAllAteliers(req?: any): Observable<any> {
    let parametres: HttpParams = new HttpParams();

    if (req) {

      if (req?.titreAtelier != undefined && req?.titreAtelier) {
        parametres = parametres.append("titreAtelier", req.titreAtelier);
      }
      if (req?.theme != undefined && req?.theme) {
        parametres = parametres.append("theme", req.theme);
      }
      if (req?.dateAtelier != undefined && req?.dateAtelier) {
        parametres = parametres.append("dateAtelier", req.dateAtelier);
      }
      if (req?.heurDebut != undefined && req?.heurDebut) {
        parametres = parametres.append("heurDebut", req.heurDebut);
      }
      if (req?.heurFin != undefined && req?.heurFin) {
        parametres = parametres.append("heurFin", req.heurFin);
      }
      if (req?.lieu != undefined && req?.lieu) {
        parametres = parametres.append("lieu", req.lieu);
      }
      if (req?.statut != undefined && req?.statut) {
        parametres = parametres.append("statut", req.statut);
      }
      if (req?.coutOrganisation != undefined && req?.coutOrganisation) {
        parametres = parametres.append("coutOrganisation", req.coutOrganisation);
      }
      if (req?.nombreParticipantsMax != undefined && req?.nombreParticipantsMax) {
        parametres = parametres.append("nombreParticipantsMax", req.nombreParticipantsMax);
      }
      return this.http.get<any>(
          `${environment.baseUrl}ateliers?page=${req.page}&size=${req.size}`, {
            params: parametres
          }
      );
    } else {
      return this.http.get<any>(
          `${environment.baseUrl}ateliers?page=0&size=100000`, {
            params: parametres
          }
      );
    }
  }
  // Import ateliers
  importAtelier(file: any, projetId: any) {
    let formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('projetId', projetId);

    return this.http.post<any>(`${environment.baseUrl}atelier/import`, formData, {
      observe: 'response'
    });
  }

  // Export ateliers
  exportAteliers() {
    return this.http.get(`${environment.baseUrl}atelier/export`, {
      responseType: 'blob'
    });
  }

}