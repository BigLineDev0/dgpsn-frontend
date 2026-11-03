import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcedurenominationService {
  constructor(protected http: HttpClient) { }

  // Create procedurenomination
  createProcedurenomination(procedurenomination: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}procedurenominations`, procedurenomination);
  }

  // Update procedurenomination
  updateProcedurenomination(procedurenominationId: any, procedurenomination: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}procedurenominations/${procedurenominationId}`, procedurenomination, {
      observe: 'response',
    });
  }
  // Read all procedurenomination
  readProcedurenominations(req: any): Observable<any> {
  let parametres: HttpParams = new HttpParams();
  if(req){
    if(req?.code != undefined && req?.code){
      parametres = parametres.append("code",req?.code);
    }
    if(req?.libelle != undefined && req?.libelle){
      parametres = parametres.append("libelle",req?.libelle);
    }
    return this.http.get<any>(
     `${environment.baseUrl}procedurenominations?page=${req.page}&size=${req.size}`,{
     params: parametres
   });
  }
  else{
    return this.http.get<any>(
     `${environment.baseUrl}procedurenominations?page=${0}&size=${100000}`,{
       params: parametres
      });
    }
  }
  // Read a procedurenomination
  readProcedurenomination(procedurenominationId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}procedurenominations/${procedurenominationId}`);
  }

  // Delete procedurenomination
  deleteProcedurenomination(procedurenominationId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}procedurenominations/${procedurenominationId}`, {
      observe: 'response',
    });
  }
  // Export procedurenomination
  exportProcedurenomination() {
      return this.http.get(`${environment.baseUrl}procedurenominations/export`, {
       responseType: 'blob'
        });
  }
}
