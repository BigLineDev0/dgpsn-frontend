import { environment } from '@/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LigneBudgetaireService {

   constructor(protected http: HttpClient) { }


createLigneBudgetaire(ligne: any): Observable<any> {
  return this.http.post<any>(`${environment.baseUrl}ligne-budgetaire`, ligne);
}

createMultipleLigneBudgetaire(lignes: any[]): Observable<any> {
  return this.http.post<any>(`${environment.baseUrl}ligne-budgetaire/multiple`, lignes);
}

updateLigneBudgetaire(ligneId: any, ligne: any): Observable<any> {
  return this.http.put<any>(`${environment.baseUrl}ligne-budgetaire/${ligneId}`, ligne, {
    observe: 'response',
  });
}

deleteLigneBudgetaire(ligneId: any): Observable<any> {
  return this.http.delete<any>(`${environment.baseUrl}ligne-budgetaire/${ligneId}`, {
    observe: 'response',
  });
}

readAllLigneBudgetaire(req?: any): Observable<any> {
  let parametres: HttpParams = new HttpParams();
  if (req) {
    if (req?.budgetId != undefined) {
      parametres = parametres.append("budgetId", req?.budgetId);
    }
    if (req?.libelle != undefined && req?.libelle) {
      parametres = parametres.append("libelle", req?.libelle);
    }
    if (req?.rubriqueId != undefined && req?.rubriqueId) {
      parametres = parametres.append("rubriqueId", req?.rubriqueId);
    }
    if (req?.typeLigneBugetaire != undefined && req?.typeLigneBugetaire) {
      parametres = parametres.append("typeLigneBugetaire", req?.typeLigneBugetaire);
    }
    if (req?.montant != undefined && req?.montant) {
      parametres = parametres.append("montant", req?.montant);
    }
    if (req?.commentaire != undefined && req?.commentaire) {
      parametres = parametres.append("commentaire", req?.commentaire);
    }
    return this.http.get<any>(
      `${environment.baseUrl}ligne-budgetaire?page=${req?.page}&size=${req?.size}`, {
        params: parametres
      }
    );
  } else {
    return this.http.get<any>(
      `${environment.baseUrl}ligne-budgetaire?page=${0}&size=${100000}`, {
        params: parametres
      }
    );
  }
}
}
