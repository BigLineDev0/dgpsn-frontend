import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AtelierService {

  constructor(protected http: HttpClient) { }

  // Add atelier to project
  addAtelier(atelier: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}atelier`, atelier);
  }

  // Update atelier
  updateAtelier(atelierId: any, atelier: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}atelier/${atelierId}`, atelier);
  }

  // Delete atelier
  deleteAtelier(atelierId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}atelier/${atelierId}`);
  }

  // Read all ateliers of project
  readAteliers(req?: any): Observable<any> {
    let parametres: HttpParams = new HttpParams();

    if (req) {
      if (req?.projetId != undefined && req?.projetId) {
        parametres = parametres.append("projetId", req?.projetId);
      }
      if (req?.titreAtelier != undefined && req?.titreAtelier) {
        parametres = parametres.append("titreAtelier", req?.titreAtelier);
      }
      if (req?.theme != undefined && req?.theme) {
        parametres = parametres.append("theme", req?.theme);
      }
      if (req?.lieu != undefined && req?.lieu) {
        parametres = parametres.append("lieu", req?.lieu);
      }
      if (req?.statut != undefined && req?.statut) {
        parametres = parametres.append("statut", req?.statut);
      }
      return this.http.get<any>(
        `${environment.baseUrl}atelier?page=${req.page}&size=${req.size}`, {
          params: parametres
        }
      );
    } else {
      return this.http.get<any>(
        `${environment.baseUrl}atelier?page=${0}&size=${100000}`, {
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