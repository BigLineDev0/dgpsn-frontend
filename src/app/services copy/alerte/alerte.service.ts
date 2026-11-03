import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Helper } from 'src/app/util/helper';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlerteService {

  constructor(
    private http: HttpClient
  ) { }

   //read all alertes by profile
   readAlertes(profileId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}alertes/${profileId}`);
  }

  setAlertToRead(alertId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}alertes/${alertId}`);
  }

  readAll(req?: any): Observable<any> {
    let parametres: HttpParams = new HttpParams();
    if(req){
      if(req?.message != undefined && req?.message){
        parametres = parametres.append("message",req?.message);
      }
      if(req?.date != undefined && req?.date){
        console.log("date ",req.date)
        parametres = parametres.append("date", req?.date);
      }
      if(req?.endDate != undefined && req?.endDate){
        parametres = parametres.append("endDate", req?.endDate);
      }
      if(req?.critere != undefined && req?.critere){
        parametres = parametres.append("critere", req?.critere);
      }
      if(req?.read != undefined){
        parametres = parametres.append("read",req?.read);
      }
      if(req?.priority != undefined && req?.priority){
        parametres = parametres.append("priority",req?.priority);
      }
      if(req?.username != undefined && req?.username){
        parametres = parametres.append("username",req?.username);
      }
      return this.http.get<any>(
        `${environment.baseUrl}alertes?page=${req.page}&size=${req.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}alertes?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
  }
}
