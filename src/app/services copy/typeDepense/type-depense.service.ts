import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeDepenseService {
  constructor(private http: HttpClient) { }

  createTypeDepense(depense: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}typeExpense`, depense);
  }

  updateTypeDepense(depenseId: any, depense: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}typeExpense/${depenseId}`, depense);
  }

  deleteTypeDepense(depenseId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}typeExpense/${depenseId}`);
  }

  readTypeDepense(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();

    if(req){
      if(req?.code != undefined && req?.code){
        parametres = parametres.append("code", req?.code);
      }
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle", req?.libelle);
      }
      if(req?.categorieDepenseId != undefined && req?.categorieDepenseId){
        parametres = parametres.append("categorieDepenseId", req?.categorieDepenseId);
      }
      return this.http.get<any>(
        `${environment.baseUrl}typeExpense?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}typeExpense?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
  }


 

}
