import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NatureService {

  constructor(protected http: HttpClient) { }

  //  create nature
  createnature(nature: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}natures`, nature);
  }

  // update a nature
  updatenature(natureId : any, nature: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}natures/${natureId}`, nature, {
      observe: 'response',
    });
  }

   // get a nature
   readnature(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}natures/${id}`, {
      observe: 'response',
    });
  }

  //read all natures
  readnatures(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();
    if(req){
      if(req?.code){
        parametres = parametres.append("code",req?.code);
      }
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle",req?.libelle);
      }
      return this.http.get<any>(
        `${environment.baseUrl}natures?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}natures?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
    
  }

  //delete a nature
  deletenature(natureId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}natures/${natureId}`, {
      observe: 'response',
    });
  }
}
