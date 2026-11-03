import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PreselectionnedFileService {

  constructor(protected http: HttpClient) { }


  createPreselectionnedfile(passation: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}preselectiondfile`, passation);
  }

  updatePreselectionnedfile(preselectiondId : any, passation: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}preselectiondfile/${preselectiondId}`, passation, {
      observe: 'response',
    });
  }

   readPreselectionnedfile(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}preselectiondfile/${id}`, {
      observe: 'response',
    });
  }

  readPreselectionnedfiles(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();
    if(req){
      if(req?.code){
        parametres = parametres.append("code",req?.code);
      }
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle",req?.libelle);
      }
      if(req?.passationMarketId != undefined && req?.passationMarketId){
        parametres = parametres.append("passationMarketId",req?.passationMarketId);
      }

      
      return this.http.get<any>(
        `${environment.baseUrl}preselectiondfile?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}preselectiondfile?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
    
  }

  //delete a nature
  deletePreselectionnedfile(preselectiondId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}preselectiondfile/${preselectiondId}`, {
      observe: 'response',
    });
  }
}
