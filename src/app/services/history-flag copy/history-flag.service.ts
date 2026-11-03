import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoryFlagService {

  constructor(private http: HttpClient) { }

  //  Add historyFlag to project
  addHistoryFlagOfProject(historyFlag: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}histories-flag`, historyFlag);
  }

   //  update historyFlag to project
   updateHistoryFlagOfProject(historyFlagId: any, historyFlag: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}histories-flag/${historyFlagId}`, historyFlag);
  }

   //  delete historyFlag to project
   deleteHistoryFlagOfProject(historyFlagId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}histories-flag/${historyFlagId}`);
  }


  //read all historyFlag
  readHistoriesFlagProjects(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();

    if(req){
      if(req?.projectId != undefined && req?.projectId){
        parametres = parametres.append("projectId", req?.projectId);
      }
      if(req?.flagId != undefined && req?.flagId){
        parametres = parametres.append("flagId", req?.flagId);
      }
      if(req?.startDate != undefined && req?.startDate){
        parametres = parametres.append("startDate", req?.startDate);
      }
      if(req?.endDate != undefined && req?.endDate){
        parametres = parametres.append("endDate", req?.endDate);
      }
      return this.http.get<any>(
        `${environment.baseUrl}histories-flag?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}histories-flag?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
  }

    //read historyFlag by code
    readHistoriesFlagByCode(flagCode: string): Observable<any> {
      return this.http.get<any>(
        `${environment.baseUrl}histories-flag/byFlagCode?code=${flagCode}`);
    }
}
