import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlagService {

  constructor(protected http: HttpClient) { }

  //  create flag
  createFlag(flag: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}flags`, flag);
  }

  // update a flag
  updateFlag( flagId: number, flag: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}flags/${flagId}`, flag, {
      observe: 'response',
    });
  }

  // get a flag
  readFlag(flagId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}flags/${flagId}`, {
      observe: 'response',
    });
  }

  //read all flag
  readFlags(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();

    if(req){
      if(req?.code!= undefined && req?.code){
        parametres = parametres.append("code", req?.code);
      }
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle", req?.libelle);
      }
      if(req?.sortBy != undefined && req?.sortBy){
        parametres = parametres.append("sortBy", req?.sortBy);
      }
      if(req?.ascending != undefined && req?.ascending){
        parametres = parametres.append("ascending", req?.ascending);
      }
      return this.http.get<any>(

        `${environment.baseUrl}flags?page=${req.page}&size=${req.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}flags?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
  }
  //delete a phase
  deleteflags(flagId:number): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}flags/${flagId}`, {
      observe: 'response',
    });
  }
}
