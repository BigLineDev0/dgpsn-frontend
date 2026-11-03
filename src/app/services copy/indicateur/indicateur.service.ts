import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IndicateurService {

  constructor(protected http: HttpClient) { }

  //read all indicateur
  readIndicators(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();

    if(req){
      if(req?.code != undefined && req?.projectId){
        parametres = parametres.append("code", req?.code);
      }
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle", req?.libelle);
      }
      if(req?.code != undefined && req?.code){
        parametres = parametres.append("code", req?.code);
      }
      if(req?.unitId != undefined && req?.unitId){
        parametres = parametres.append("unitId", req?.unitId);
      }
      if(req?.indicatorTypeId != undefined && req?.indicatorTypeId){
        parametres = parametres.append("indicatorTypeId", req?.indicatorTypeId);
      }
       if(req?.sortBy != undefined && req?.sortBy){
        parametres = parametres.append("sortBy", req?.sortBy);
      }
      if(req?.ascending != undefined && req?.ascending){
        parametres = parametres.append("ascending", req?.ascending);
      }
      return this.http.get<any>(
        `${environment.baseUrl}indicators?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}indicators?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
  }

  //  create indicateur
  createIndicateur(indicateur: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}indicators`, indicateur);
  }

  // update a indicateur
  updateIndicateur( indicateurId:any, indicateur: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}indicators/${indicateurId}`, indicateur, {
      observe: 'response',
    });
  }

  // get a indicateur
  readIndicateur(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}indicators/${id}`, {
      observe: 'response',
    });
  }

  //delete a indicateur
  deleteIndicateur(indicateurId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}indicators/${indicateurId}`, {
      observe: 'response',
    });
  }
}
