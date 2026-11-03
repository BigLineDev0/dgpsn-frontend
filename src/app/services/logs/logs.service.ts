import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(
    private http: HttpClient
  ) { }

  getLogs(req?: any): Observable<any>  {
    //return this.http.get('https://geo.ipify.org/api/v2/country,city?apiKey=at_39zubGd75CvyW6w7Fa4vZu6VlMeKT&ipAddress=154.124.48.148');
    let parametres: HttpParams = new HttpParams();
    if(req){
      if(req?.user != undefined && req?.user){
        parametres = parametres.append("user", req?.user);
      }
      if(req?.login != undefined && req?.login){
        parametres = parametres.append("login", req?.login);
      }
      if(req?.actionType != undefined && req?.actionType){
        parametres = parametres.append("actionType", req?.actionType);
      }
      if(req?.creationDate != undefined && req?.creationDate){
        parametres = parametres.append("creationDate", req?.creationDate);
      }
      if(req?.critere != undefined && req?.critere){
        parametres = parametres.append("critere", req?.critere);
      }
      if(req?.endDate != undefined && req?.endDate){
        parametres = parametres.append("endDate", req?.endDate);
      }
      
      return this.http.get<any>(
        `${environment.baseUrl}journals?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}journals`,{
          params: parametres
        }
      );
    }
  }
}
