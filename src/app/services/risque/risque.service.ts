import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RisqueService {
  constructor(protected http: HttpClient) { }

  // Create risque
  createRisque(risque: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}risques`, risque);
  }

  // Update risque
  updateRisque(risqueId: any, risque: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}risques/${risqueId}`, risque, {
      observe: 'response',
    });
  }
  // Read all risque
  readRisques(req: any): Observable<any> {
  let parametres: HttpParams = new HttpParams();
  if(req){
    if(req?.code != undefined && req?.code){
      parametres = parametres.append("code",req?.code);
    }
    if(req?.libelle != undefined && req?.libelle){
      parametres = parametres.append("libelle",req?.libelle);
    }
    return this.http.get<any>(
     `${environment.baseUrl}risques?page=${req.page}&size=${req.size}`,{
     params: parametres
   });
  }
  else{
    return this.http.get<any>(
     `${environment.baseUrl}risques?page=${0}&size=${100000}`,{
       params: parametres
      });
    }
  }
  // Read a risque
  readRisque(risqueId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}risques/${risqueId}`);
  }

  // Delete risque
  deleteRisque(risqueId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}risques/${risqueId}`, {
      observe: 'response',
    });
  }
  // Export risque
  exportRisque() {
      return this.http.get(`${environment.baseUrl}risques/export`, {
       responseType: 'blob'
        });
  }
}
