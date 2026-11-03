import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MarketPassationService {

  constructor(protected http: HttpClient) { }


  createMarketPassation(passation: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}passationmarket`, passation);
  }

  updateMarketPassation(passationId : any, passation: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}passationmarket/${passationId}`, passation, {
      observe: 'response',
    });
  }

   readMarketPassation(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}passationmarket/${id}`, {
      observe: 'response',
    });
  }

  readMarketPassations(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();
    if(req){
      if(req?.code){
        parametres = parametres.append("code",req?.code);
      }
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle",req?.libelle);
      }
      if(req?.passationPlanId != undefined && req?.passationPlanId){
        parametres = parametres.append("passationPlanId",req?.passationPlanId);
      }

      
      return this.http.get<any>(
        `${environment.baseUrl}passationmarket?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}passationmarket?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
    
  }

  //delete a nature
  deleteMarketPassation(passationId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}passationmarket/${passationId}`, {
      observe: 'response',
    });
  }
}
