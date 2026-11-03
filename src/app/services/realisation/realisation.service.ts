import { environment } from '@/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RealisationService {
constructor(protected http: HttpClient) { }

  createRealisation(realisation: any): Observable<any> {
  return this.http.post<any>(`${environment.baseUrl}realisation`, realisation);
}

createMultipleRealisation(realisations: any[]): Observable<any> {
  return this.http.post<any>(`${environment.baseUrl}realisation/multiple`, realisations);
}

updateRealisation(realisationId: any, realisation: any): Observable<any> {
  return this.http.put<any>(`${environment.baseUrl}realisation/${realisationId}`, realisation, {
    observe: 'response',
  });
}

deleteRealisation(realisationId: any): Observable<any> {
  return this.http.delete<any>(`${environment.baseUrl}realisation/${realisationId}`, {
    observe: 'response',
  });
}



readAllRealisation(req?: any): Observable<any> {
  let parametres: HttpParams = new HttpParams();
  if (req) {
    if (req?.ligneBudgetaireId != undefined) {
      parametres = parametres.append("ligneBudgetaireId", req?.ligneBudgetaireId);
    }
    if (req?.code != undefined && req?.code) {
      parametres = parametres.append("code", req?.code);
    }
    if (req?.libelle != undefined && req?.libelle) {
      parametres = parametres.append("libelle", req?.libelle);
    }
    if (req?.montant != undefined && req?.montant) {
      parametres = parametres.append("montant", req?.montant);
    }
    if (req?.date != undefined && req?.date) {
      parametres = parametres.append("date", req?.date);
    }
    if (req?.fournisseur != undefined && req?.fournisseur) {
      parametres = parametres.append("fournisseur", req?.fournisseur);
    }
    if (req?.numeroBon != undefined && req?.numeroBon) {
      parametres = parametres.append("numeroBon", req?.numeroBon);
    }
    if (req?.numeroBE != undefined && req?.numeroBE) {
      parametres = parametres.append("numeroBE", req?.numeroBE);
    }
    if (req?.numeroMandat != undefined && req?.numeroMandat) {
      parametres = parametres.append("numeroMandat", req?.numeroMandat);
    }
    if (req?.description != undefined && req?.description) {
      parametres = parametres.append("description", req?.description);
    }
    return this.http.get<any>(
      `${environment.baseUrl}realisation?page=${req?.page}&size=${req?.size}`, {
        params: parametres
      }
    );
  } else {
    return this.http.get<any>(
      `${environment.baseUrl}realisation?page=${0}&size=${100000}`, {
        params: parametres
      }
    );
  }
}
}
