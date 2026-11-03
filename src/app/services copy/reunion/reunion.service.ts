import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReunionService {
  constructor(protected http: HttpClient) { }

  // Create reunion
  createReunion(reunion: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}reunions`, reunion);
  }

  // Update reunion
  updateReunion(reunionId: any, reunion: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}reunions/${reunionId}`, reunion, {
      observe: 'response',
    });
  }
  // Read all reunion
  readReunions(req: any): Observable<any> {
  let parametres: HttpParams = new HttpParams();
  if(req){
    if(req?.libelle != undefined && req?.libelle){
      parametres = parametres.append("libelle",req?.libelle);
    }
    if(req?.typereunion != undefined && req?.typereunion){
      parametres = parametres.append("typereunion",req?.typereunion);
    }
    if(req?.participant != undefined && req?.participant){
      parametres = parametres.append("participant",req?.participant);
    }
    if(req?.dateprevue != undefined && req?.dateprevue){
      parametres = parametres.append("dateprevue",req?.dateprevue);
    }
    if(req?.datereelle != undefined && req?.datereelle){
      parametres = parametres.append("datereelle",req?.datereelle);
    }
    if(req?.heuredebutprevue != undefined && req?.heuredebutprevue){
      parametres = parametres.append("heuredebutprevue",req?.heuredebutprevue);
    }
    if(req?.heurefinprevue != undefined && req?.heurefinprevue){
      parametres = parametres.append("heurefinprevue",req?.heurefinprevue);
    }
    if(req?.heuredebutreelle != undefined && req?.heuredebutreelle){
      parametres = parametres.append("heuredebutreelle",req?.heuredebutreelle);
    }
    if(req?.heurefinreelle != undefined && req?.heurefinreelle){
      parametres = parametres.append("heurefinreelle",req?.heurefinreelle);
    }
    if(req?.coment != undefined && req?.coment){
      parametres = parametres.append("coment",req?.coment);
    }
    if(req?.conseiladministratifId != undefined && req?.conseiladministratifId){
      parametres = parametres.append("conseiladministratifId",req?.conseiladministratifId);
    }
    return this.http.get<any>(
     `${environment.baseUrl}reunions?page=${req.page}&size=${req.size}`,{
     params: parametres
   });
  }
  else{
    return this.http.get<any>(
     `${environment.baseUrl}reunions?page=${0}&size=${100000}`,{
       params: parametres
      });
    }
  }
  // Read a reunion
  readReunion(reunionId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}reunions/${reunionId}`);
  }

  // Delete reunion
  deleteReunion(reunionId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}reunions/${reunionId}`, {
      observe: 'response',
    });
  }
  // Update Status
  updateStatus(reunionId: any, statut: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}reunions/${reunionId}/statut?statut=${statut}`, {
      observe: 'response',
    });
}
  // Read By conseiladministratif
  readByConseiladministratif(conseiladministratifId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}reunions/conseiladministratif/${conseiladministratifId}`);
}
  // Export reunion
  exportReunion() {
      return this.http.get(`${environment.baseUrl}reunions/export`, {
       responseType: 'blob'
        });
  }
}
