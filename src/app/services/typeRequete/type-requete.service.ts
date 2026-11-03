import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeRequeteService {
  constructor(private http: HttpClient) { }

  createTypeRequete(requete: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}typeRequete`, requete);
  }

  updateTypeRequete(requeteId: any, requete: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}typeRequete/${requeteId}`, requete);
  }

  deleteTypeRequete(requeteId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}typeRequete/${requeteId}`);
  }

  readTypeRequete(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();

    if(req){
      if(req?.code != undefined && req?.code){
        parametres = parametres.append("code", req?.code);
      }
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle", req?.libelle);
      }
      if(req?.categorieRequeteId != undefined && req?.categorieRequeteId){
        parametres = parametres.append("categorieRequeteId", req?.categorieRequeteId);
      }
      return this.http.get<any>(
        `${environment.baseUrl}typeRequete?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}typeRequete?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
  }


 

}
