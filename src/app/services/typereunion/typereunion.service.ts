import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypereunionService {
  constructor(protected http: HttpClient) { }

  // Create typereunion
  createTypereunion(typereunion: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}typereunions`, typereunion);
  }

  // Update typereunion
  updateTypereunion(typereunionId: any, typereunion: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}typereunions/${typereunionId}`, typereunion, {
      observe: 'response',
    });
  }
  // Read all typereunion
  readTypereunions(req: any): Observable<any> {
  let parametres: HttpParams = new HttpParams();
  if(req){
    if(req?.code != undefined && req?.code){
      parametres = parametres.append("code",req?.code);
    }
    if(req?.libelle != undefined && req?.libelle){
      parametres = parametres.append("libelle",req?.libelle);
    }
    return this.http.get<any>(
     `${environment.baseUrl}typereunions?page=${req.page}&size=${req.size}`,{
     params: parametres
   });
  }
  else{
    return this.http.get<any>(
     `${environment.baseUrl}typereunions?page=${0}&size=${100000}`,{
       params: parametres
      });
    }
  }
  // Read a typereunion
  readTypereunion(typereunionId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}typereunions/${typereunionId}`);
  }

  // Delete typereunion
  deleteTypereunion(typereunionId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}typereunions/${typereunionId}`, {
      observe: 'response',
    });
  }
  // Export typereunion
  exportTypereunion() {
      return this.http.get(`${environment.baseUrl}typereunions/export`, {
       responseType: 'blob'
        });
  }
}
