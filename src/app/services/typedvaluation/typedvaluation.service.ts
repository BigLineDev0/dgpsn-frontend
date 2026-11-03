import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypedvaluationService {
  constructor(protected http: HttpClient) { }

  // Create typedvaluation
  createTypedvaluation(typedvaluation: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}typedvaluations`, typedvaluation);
  }

  // Update typedvaluation
  updateTypedvaluation(typedvaluationId: any, typedvaluation: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}typedvaluations/${typedvaluationId}`, typedvaluation, {
      observe: 'response',
    });
  }
  // Read all typedvaluation
  readTypedvaluations(req: any): Observable<any> {
  let parametres: HttpParams = new HttpParams();
  if(req){
    if(req?.code != undefined && req?.code){
      parametres = parametres.append("code",req?.code);
    }
    if(req?.libelle != undefined && req?.libelle){
      parametres = parametres.append("libelle",req?.libelle);
    }
    return this.http.get<any>(
     `${environment.baseUrl}typedvaluations?page=${req.page}&size=${req.size}`,{
     params: parametres
   });
  }
  else{
    return this.http.get<any>(
     `${environment.baseUrl}typedvaluations?page=${0}&size=${100000}`,{
       params: parametres
      });
    }
  }
  // Read a typedvaluation
  readTypedvaluation(typedvaluationId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}typedvaluations/${typedvaluationId}`);
  }

  // Delete typedvaluation
  deleteTypedvaluation(typedvaluationId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}typedvaluations/${typedvaluationId}`, {
      observe: 'response',
    });
  }
  // Export typedvaluation
  exportTypedvaluation() {
      return this.http.get(`${environment.baseUrl}typedvaluations/export`, {
       responseType: 'blob'
        });
  }
}
