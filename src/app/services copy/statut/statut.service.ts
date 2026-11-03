import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatutService {

  constructor(protected http: HttpClient) { }

  //  create statut
  createStatut(statut: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}status`, statut);
  }

  // update a statut
  updateStatut(statutId : any, statut: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}status/${statutId}`, statut, {
      observe: 'response',
    });
  }

  //delete statuts
  // update a statut
  deleteStatut(statutId : any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}status/${statutId}`, {
      observe: 'response',
    });
  }
  // get a statut
  readStatut(statutId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}status/${statutId}`, {
      observe: 'response',
    });
  }

  //read all statut
  readstatut(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();

    if(req){
      if(req?.code){
        parametres = parametres.append("code", req?.code);
      }
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle", req?.libelle);
      }
      if(req?.statusType){
        parametres = parametres.append("statusType", req?.statusType);
      }
      if(req?.sortBy != undefined && req?.sortBy){
        parametres = parametres.append("sortBy", req?.sortBy);
      }
      if(req?.ascending != undefined && req?.ascending){
        parametres = parametres.append("ascending", req?.ascending);
      }
      return this.http.get<any>(
        `${environment.baseUrl}status?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}status?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
  }
}
