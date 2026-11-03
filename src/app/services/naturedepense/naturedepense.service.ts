import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NaturedepenseService {
  constructor(protected http: HttpClient) { }

  // Create naturedepense
  createNaturedepense(naturedepense: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}naturedepenses`, naturedepense);
  }

  // Update naturedepense
  updateNaturedepense(naturedepenseId: any, naturedepense: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}naturedepenses/${naturedepenseId}`, naturedepense, {
      observe: 'response',
    });
  }
  // Read all naturedepense
  readNaturedepenses(req: any): Observable<any> {
  let parametres: HttpParams = new HttpParams();
  if(req){
    if(req?.code != undefined && req?.code){
      parametres = parametres.append("code",req?.code);
    }
    if(req?.libelle != undefined && req?.libelle){
      parametres = parametres.append("libelle",req?.libelle);
    }
    return this.http.get<any>(
     `${environment.baseUrl}naturedepenses?page=${req.page}&size=${req.size}`,{
     params: parametres
   });
  }
  else{
    return this.http.get<any>(
     `${environment.baseUrl}naturedepenses?page=${0}&size=${100000}`,{
       params: parametres
      });
    }
  }
  // Read a naturedepense
  readNaturedepense(naturedepenseId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}naturedepenses/${naturedepenseId}`);
  }

  // Delete naturedepense
  deleteNaturedepense(naturedepenseId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}naturedepenses/${naturedepenseId}`, {
      observe: 'response',
    });
  }
  // Export naturedepense
  exportNaturedepense() {
      return this.http.get(`${environment.baseUrl}naturedepenses/export`, {
       responseType: 'blob'
        });
  }
}
