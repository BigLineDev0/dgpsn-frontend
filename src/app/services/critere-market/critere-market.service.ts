import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CritereMarketService {
  constructor(protected http: HttpClient) { }


  createCritereMarket(criteremrk: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}criteremarket`, criteremrk);
  }

  updateCritereMarket(Id : any, criteremrk: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}criteremarket/${Id}`, criteremrk, {
      observe: 'response',
    });
  }

   readCritereMarket(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}criteremarket/${id}`, {
      observe: 'response',
    });
  }

  //voir tous les criteres d'evaluations d'un marche specifique
  readAllCriterePerMarket(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}criteremarket/marketAll/${id}`, {
      observe: 'response',
    });
  }


  readCritereMarketPage(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();
    if(req){
      if(req?.code){
        parametres = parametres.append("code",req?.code);
      }
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle",req?.libelle);
      }

      if(req?.passationMarketId != undefined && req?.passationMarketId){
        parametres = parametres.append("passationMarketId",req?.passationMarketId);
      }

      
      return this.http.get<any>(
        `${environment.baseUrl}criteremarket?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}criteremarket?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
    
  }

  
  deleteCritereMarket(passationmrkId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}criteremarket/${passationmrkId}`, {
      observe: 'response',
    });
  }


  
}
