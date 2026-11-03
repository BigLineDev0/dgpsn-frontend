import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AxePseService {


  constructor(protected http: HttpClient) { }


   //  create axePSe
   createAxePse(axePse: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}axePSE`, axePse);
  }

  // update a AxePse
  updateAxePse(axePSEId: any, axePse: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}axePSE/${axePSEId}`, axePse, {
      observe: 'response',
    });
  }

  // get a AxePse
  readAxePse(axePSEId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}axePSE/${axePSEId}`, {
      observe: 'response',
    });
  }


  //read all AxePse
  readAxePses(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();

    if(req){

      if(req?.code != undefined && req?.code){
        parametres = parametres.append("code", req?.code);
      }

      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle", req?.libelle);
      }

      return this.http.get<any>(
        `${environment.baseUrl}axePSE?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}axePSE?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
  }
   //delete a AxePse
   deleteAxePse(axePSEId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}axePSE/${axePSEId}`)
   }

}
