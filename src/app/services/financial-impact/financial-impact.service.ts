import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinancialImpactService {

  constructor(protected http: HttpClient) { }

  //  create financialImpact
  createfinancialImpact(financialImpact: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}financialImpacts`, financialImpact);
  }

  // update a financialImpact
  updatefinancialImpact(financialImpactId : any, financialImpact: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}financialImpacts/${financialImpactId}`, financialImpact, {
      observe: 'response',
    });
  }

   // get a financialImpact
   readfinancialImpact(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}financialImpacts/${id}`, {
      observe: 'response',
    });
  }

  //read all financialImpacts
  readfinancialImpacts(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();
    if(req){
      if(req?.code){
        parametres = parametres.append("code",req?.code);
      }
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle",req?.libelle);
      }
      if(req?.poids != undefined && req?.poids){
        parametres = parametres.append("poids",req?.poids);
      }
      return this.http.get<any>(
        `${environment.baseUrl}financialImpacts?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}financialImpacts?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }

  }

  //delete a financialImpact
  deletefinancialImpact(financialImpactId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}financialImpacts/${financialImpactId}`, {
      observe: 'response',
    });
  }
}
