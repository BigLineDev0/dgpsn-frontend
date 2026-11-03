import { environment } from '@/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinancementBudgetService {

  constructor(
    private http: HttpClient
  ) { }

  createBudgetDgpsn(budget: any): Observable<any> {
  return this.http.post<any>(`${environment.baseUrl}budgetGlobal`, budget);
}

updateBudgetDgpsn(budgetId: any, budget: any): Observable<any> {
  return this.http.put<any>(`${environment.baseUrl}budgetGlobal/${budgetId}`, budget, {
    observe: 'response',
  });
}

deleteBudgetDgpsn(budgetId: any): Observable<any> {
  return this.http.delete<any>(`${environment.baseUrl}budgetGlobal/${budgetId}`, {
    observe: 'response',
  });
}

readAllBudgetDgpsn(req?: any): Observable<any> {
  let parametres: HttpParams = new HttpParams();
  if (req) {
    if (req?.managementUnitId != undefined) {
      parametres = parametres.append("managementUnitId", req?.managementUnitId);
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
    if (req?.annee != undefined && req?.annee) {
      parametres = parametres.append("annee", req?.annee);
    }
    return this.http.get<any>(
      `${environment.baseUrl}budgetGlobal?page=${req?.page}&size=${req?.size}`, {
        params: parametres
      }
    );
  } else {
    return this.http.get<any>(
      `${environment.baseUrl}budgetGlobal?page=${0}&size=${100000}`, {
        params: parametres
      }
    );
  }
}
// getBudgetSynthese(budgetId: any): Observable<any> {
//   return this.http.get<any>(`${environment.baseUrl}budgetGlobal/${budgetId}/synthese`, {
//     observe: 'response',
//   });
// }
getBudgetSynthese(budgetId: any, periode?: string, trimestre?: number, mois?: number): Observable<any> {
  let params = new HttpParams();
  
  if (periode) {
    params = params.set('periode', periode);
  }
  if (trimestre !== undefined) {
    params = params.set('trimestre', trimestre.toString());
  }
  if (mois !== undefined) {
    params = params.set('mois', mois.toString());
  }
  
  return this.http.get<any>(`${environment.baseUrl}budgetGlobal/${budgetId}/synthese`, {
    params: params,
    observe: 'response',
  });
}
}
