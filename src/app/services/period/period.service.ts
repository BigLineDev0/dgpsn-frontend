import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

  constructor(private http: HttpClient) {}

  //read all valueIndicatorProject
  readAllPeriodPeriodicity(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();

    if(req){
      if(req?.periodicityId != undefined && req?.periodicityId){
        parametres = parametres.append("periodicityId", req?.periodicityId);
      }
      if(req?.code != undefined && req?.code){
        parametres = parametres.append("code", req?.code);
      }
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle", req?.libelle);
      }
      if(req?.shortBy != undefined && req?.shortBy){
        parametres = parametres.append("shortBy", req?.shortBy);
      }
      return this.http.get<any>(
        `${environment.baseUrl}periods?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}periods?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
  }

  createPeriod(period: any):Observable<any>{
    return this.http.post<any>(`${environment.baseUrl}periods`,period)
  }

  // update a periodicite
updatePeriodicite(periodId:number, periodS:any): Observable<any> {
  return this.http.put<any>(`${environment.baseUrl}periods/${periodId}`, periodS, {
    observe: 'response',
  });
}
//delete a periodicite
deleteperiodicite(periodId:number): Observable<any> {
  return this.http.delete<any>(`${environment.baseUrl}periods/${periodId}`, {
    observe: 'response',
  });
}
}
