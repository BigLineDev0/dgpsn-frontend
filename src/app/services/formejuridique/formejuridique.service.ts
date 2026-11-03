import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormejuridiqueService {
  constructor(protected http: HttpClient) { }

  // Create formejuridique
  createFormejuridique(formejuridique: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}formejuridiques`, formejuridique);
  }

  // Update formejuridique
  updateFormejuridique(formejuridiqueId: any, formejuridique: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}formejuridiques/${formejuridiqueId}`, formejuridique, {
      observe: 'response',
    });
  }
  // Read all formejuridique
  readFormejuridiques(req: any): Observable<any> {
  let parametres: HttpParams = new HttpParams();
  if(req){
    if(req?.code != undefined && req?.code){
      parametres = parametres.append("code",req?.code);
    }
    if(req?.libelle != undefined && req?.libelle){
      parametres = parametres.append("libelle",req?.libelle);
    }
    return this.http.get<any>(
     `${environment.baseUrl}formejuridiques?page=${req.page}&size=${req.size}`,{
     params: parametres
   });
  }
  else{
    return this.http.get<any>(
     `${environment.baseUrl}formejuridiques?page=${0}&size=${100000}`,{
       params: parametres
      });
    }
  }
  // Read a formejuridique
  readFormejuridique(formejuridiqueId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}formejuridiques/${formejuridiqueId}`);
  }

  // Delete formejuridique
  deleteFormejuridique(formejuridiqueId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}formejuridiques/${formejuridiqueId}`, {
      observe: 'response',
    });
  }
  // Export formejuridique
  exportFormejuridique() {
      return this.http.get(`${environment.baseUrl}formejuridiques/export`, {
       responseType: 'blob'
        });
  }
}
