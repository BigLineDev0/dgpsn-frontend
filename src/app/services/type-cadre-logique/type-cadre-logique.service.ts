import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeCadreLogiqueService {

  constructor(protected http: HttpClient) { }

  //  create type cadre logique
  createTypeCadreLogique(typeCadreLogique: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}typeCadreLogique`, typeCadreLogique);
  }

  // update a type cadre logique
  updateTypeCadreLogique(typeCadreLogiqueId : any, typeCadreLogique: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}typeCadreLogique/${typeCadreLogiqueId}`, typeCadreLogique, {
      observe: 'response',
    });
  }

  // get a typeCadreLogique
  readTypeCadreLogique(typeCadreLogiqueId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}typeCadreLogique/${typeCadreLogiqueId}`, {
      observe: 'response',
    });
  }

  //read all typeCadreLogique
  readTypeCadreLogiques(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();

    if(req){
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle", req?.libelle);
      }
      return this.http.get<any>(
        `${environment.baseUrl}typeCadreLogique?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}typeCadreLogique?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
  }
  //delete a structures
  deleteTypeCadrelogique(typeCadreLogiqueId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}typeCadreLogique/${typeCadreLogiqueId}`, {
      observe: 'response',
    });
  }
}

