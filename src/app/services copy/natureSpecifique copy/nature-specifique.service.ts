import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NatureSpecifiqueService {

  constructor(protected http: HttpClient) { }

  //  create nature
  createnatureSpecifique(natureSpecifique: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}specificNatures`, natureSpecifique);
  }

  // update a nature
  updatenatureSpecifique(specificNatureId : any, specificNature: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}specificNatures/${specificNatureId}`, specificNature, {
      observe: 'response',
    });
  }

   // get a nature
   readnatureSpecifique(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}specificNatures/${id}`, {
      observe: 'response',
    });
  }

  //read all natures
  readnaturesSpecifiques(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();
    if(req){
      if(req?.code){
        parametres = parametres.append("code",req?.code);
      }
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle",req?.libelle);
      }
      if(req?.natureId != undefined && req?.natureId){
        parametres = parametres.append("natureId",req?.natureId);
      }
      return this.http.get<any>(
        `${environment.baseUrl}specificNatures?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}specificNatures?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }

  }

  //delete a nature
  deletenature(specificNatureId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}specificNatures/${specificNatureId}`, {
      observe: 'response',
    });
  }
}
