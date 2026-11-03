import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ImpactObjetifService {

  constructor(protected http: HttpClient) { }



  readAllImpactObjectif(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();
    if (req) {
      if (req?.code != undefined && req?.code) {
        parametres = parametres.append("code", req?.code);
      }
      if(req?.description != undefined && req?.description){
        parametres = parametres.append("description", req?.description);
      }
      if(req?.detailType != undefined && req?.detailType){
        parametres = parametres.append("detailType", req?.detailType);
      }
      if(req?.managementUnitId != undefined && req?.managementUnitId){
        parametres = parametres.append("managementUnitId", req?.managementUnitId);
      }
      return this.http.get<any>(
        `${environment.baseUrl}impactsAndObjectives?page=${req?.page}&size=${req?.size}`, {
          params: parametres
        }
      );
    } else {
      return this.http.get<any>(
        `${environment.baseUrl}impactsAndObjectives?page=${0}&size=${100000}`, {
          params: parametres
        }
      );
    }
  }

  readImpactObjectif(impactsAndObjectiveId: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();
        parametres = parametres.append("impactsAndObjectiveId", impactsAndObjectiveId);

    return this.http.get<any>(
      `${environment.baseUrl}impactsAndObjectives`, {
        params: parametres
      }
    );
  }

  createImpactObjectif(impactObjectif: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}impactsAndObjectives`, impactObjectif);
  }

  updateImpactObjectif( impactObjectifId:any, impactObjectif: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}impactsAndObjectives/${impactObjectifId}`, impactObjectif, {
      observe: 'response',
    });
  }

  deleteImpactObjectif(impactObjectifId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}impactsAndObjectives/${impactObjectifId}`, {
      observe: 'response',
    });
  }


}
