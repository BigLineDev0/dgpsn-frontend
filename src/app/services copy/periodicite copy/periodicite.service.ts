import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeriodiciteService {
  constructor(protected http: HttpClient) { }

  // Create periodicite
  createPeriodicite(periodicite: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}periodicites`, periodicite);
  }

  // Update periodicite
  updatePeriodicite(periodiciteId: any, periodicite: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}periodicites/${periodiciteId}`, periodicite, {
      observe: 'response',
    });
  }
  // Read all periodicite
  readPeriodicites(req: any): Observable<any> {
  let parametres: HttpParams = new HttpParams();
  if(req){
    if(req?.code != undefined && req?.code){
      parametres = parametres.append("code",req?.code);
    }
    if(req?.libelle != undefined && req?.libelle){
      parametres = parametres.append("libelle",req?.libelle);
    }
    if(req?.periodeId != undefined && req?.periodeId){
      parametres = parametres.append("periodeId",req?.periodeId);
    }
    return this.http.get<any>(
     `${environment.baseUrl}periodicites?page=${req.page}&size=${req.size}`,{
     params: parametres
   });
  }
  else{
    return this.http.get<any>(
     `${environment.baseUrl}periodicites?page=${0}&size=${100000}`,{
       params: parametres
      });
    }
  }
  // Read a periodicite
  readPeriodicite(periodiciteId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}periodicites/${periodiciteId}`);
  }

  // Delete periodicite
  deletePeriodicite(periodiciteId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}periodicites/${periodiciteId}`, {
      observe: 'response',
    });
  }
  // Read By periode
  readByPeriode(periodeId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}periodicites/periode/${periodeId}`);
}
  // Export periodicite
  exportPeriodicite() {
      return this.http.get(`${environment.baseUrl}periodicites/export`, {
       responseType: 'blob'
        });
  }
}
