import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NaturedelarecetteService {
  constructor(protected http: HttpClient) { }

  // Create naturedelarecette
  createNaturedelarecette(naturedelarecette: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}naturedelarecettes`, naturedelarecette);
  }

  // Update naturedelarecette
  updateNaturedelarecette(naturedelarecetteId: any, naturedelarecette: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}naturedelarecettes/${naturedelarecetteId}`, naturedelarecette, {
      observe: 'response',
    });
  }
  // Read all naturedelarecette
  readNaturedelarecettes(req: any): Observable<any> {
  let parametres: HttpParams = new HttpParams();
  if(req){
    if(req?.code != undefined && req?.code){
      parametres = parametres.append("code",req?.code);
    }
    if(req?.libelle != undefined && req?.libelle){
      parametres = parametres.append("libelle",req?.libelle);
    }
    return this.http.get<any>(
     `${environment.baseUrl}naturedelarecettes?page=${req.page}&size=${req.size}`,{
     params: parametres
   });
  }
  else{
    return this.http.get<any>(
     `${environment.baseUrl}naturedelarecettes?page=${0}&size=${100000}`,{
       params: parametres
      });
    }
  }
  // Read a naturedelarecette
  readNaturedelarecette(naturedelarecetteId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}naturedelarecettes/${naturedelarecetteId}`);
  }

  // Delete naturedelarecette
  deleteNaturedelarecette(naturedelarecetteId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}naturedelarecettes/${naturedelarecetteId}`, {
      observe: 'response',
    });
  }
  // Export naturedelarecette
  exportNaturedelarecette() {
      return this.http.get(`${environment.baseUrl}naturedelarecettes/export`, {
       responseType: 'blob'
        });
  }
}
