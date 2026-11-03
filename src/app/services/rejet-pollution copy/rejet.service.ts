import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RejetService {
 constructor(protected http: HttpClient) { }

  // Create Rejet
  createRejet(rejet: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}rejet-pollution`, rejet);
  }

  // Update Rejet
  updateRejet(rejetId: any, Rejet: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}rejet-pollution/${rejetId}`, Rejet, {
      observe: 'response',
    });
  }
  // Read all Rejet
  readRejets(req: any): Observable<any> {
  let parametres: HttpParams = new HttpParams();
  if(req){
    if(req?.ph != undefined && req?.ph){
      parametres = parametres.append("ph",req?.ph);
    }
    if(req?.dco != undefined && req?.dco){
      parametres = parametres.append("dco",req?.dco);
    }
     if(req?.dbo != undefined && req?.dbo){
      parametres = parametres.append("dbo",req?.dbo);
    }
    if(req?.volume != undefined && req?.volume){
      parametres = parametres.append("volume",req?.volume);
    }
     if(req?.datePrelevement != undefined && req?.datePrelevement){
      parametres = parametres.append("datePrelevement",req?.datePrelevement);
    }
    if(req?.entrepriseId != undefined && req?.entrepriseId){
      parametres = parametres.append("entrepriseId",req?.entrepriseId);
    }
    return this.http.get<any>(
     `${environment.baseUrl}rejet-pollution?page=${req.page}&size=${req.size}`,{
     params: parametres
   });
  }
  else{
    return this.http.get<any>(
     `${environment.baseUrl}Rejets?page=${0}&size=${100000}`,{
       params: parametres
      });
    }
  }
  // Read a Rejet
  readRejet(rejetId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}rejet-pollution/${rejetId}`);
  }

  // Delete Rejet
  deleteRejet(rejetId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}rejet-pollution/${rejetId}`, {
      observe: 'response',
    });
  }
  // Export Rejet
  exportRejet() {
      return this.http.get(`${environment.baseUrl}rejet-pollution/export`, {
       responseType: 'blob'
        });
  }
  updateStatut(id: number, statut: string): Observable<any> {
    return this.http.put<any>(
       `${environment.baseUrl}rejet-pollution/${id}/statut`,
       null,
       { params: { statutType: statut } }
     );
   }
}
