import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeriodeService {
  constructor(protected http: HttpClient) { }

  // Create periode
  createPeriode(periode: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}periodes`, periode);
  }

  // Update periode
  updatePeriode(periodeId: any, periode: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}periodes/${periodeId}`, periode, {
      observe: 'response',
    });
  }
  // Read all periode
  readPeriodes(req: any): Observable<any> {
  let parametres: HttpParams = new HttpParams();
  if(req){
    if(req?.code != undefined && req?.code){
      parametres = parametres.append("code",req?.code);
    }
    if(req?.libelle != undefined && req?.libelle){
      parametres = parametres.append("libelle",req?.libelle);
    }
    return this.http.get<any>(
     `${environment.baseUrl}periodes?page=${req.page}&size=${req.size}`,{
     params: parametres
   });
  }
  else{
    return this.http.get<any>(
     `${environment.baseUrl}periodes?page=${0}&size=${100000}`,{
       params: parametres
      });
    }
  }
  // Read a periode
  readPeriode(periodeId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}periodes/${periodeId}`);
  }

  // Delete periode
  deletePeriode(periodeId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}periodes/${periodeId}`, {
      observe: 'response',
    });
  }
  // Export periode
  exportPeriode() {
      return this.http.get(`${environment.baseUrl}periodes/export`, {
       responseType: 'blob'
        });
  }
}
