import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DelayImpactService {

  constructor(protected http: HttpClient) { }

  //  create delayImpact
  createdelayImpact(delayImpact: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}delayImpacts`, delayImpact);
  }

  // update a delayImpact
  updatedelayImpact(delayImpactId : any, delayImpact: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}delayImpacts/${delayImpactId}`, delayImpact, {
      observe: 'response',
    });
  }

   // get a delayImpact
   readdelayImpact(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}delayImpacts/${id}`, {
      observe: 'response',
    });
  }

  //read all delayImpacts
  readdelayImpacts(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();
    if(req){
      if(req?.code != undefined && req?.code){
        parametres = parametres.append("code",req?.code);
      }
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle",req?.libelle);
      }
      if(req?.poids != undefined && req?.poids){
        parametres = parametres.append("poids",req?.poids);
      }
      return this.http.get<any>(
        `${environment.baseUrl}delayImpacts?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}delayImpacts?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }

  }

  //delete a delayImpact
  deletedelayImpact(delayId:any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}delayImpacts/${delayId}`, {
      observe: 'response',
    });
  }
}
