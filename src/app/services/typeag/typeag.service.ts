import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeagService {
  constructor(protected http: HttpClient) { }

  // Create typeag
  createTypeag(typeag: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}typeags`, typeag);
  }

  // Update typeag
  updateTypeag(typeagId: any, typeag: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}typeags/${typeagId}`, typeag, {
      observe: 'response',
    });
  }
  // Read all typeag
  readTypeags(req: any): Observable<any> {
  let parametres: HttpParams = new HttpParams();
  if(req){
    if(req?.code != undefined && req?.code){
      parametres = parametres.append("code",req?.code);
    }
    if(req?.libelle != undefined && req?.libelle){
      parametres = parametres.append("libelle",req?.libelle);
    }
    return this.http.get<any>(
     `${environment.baseUrl}typeags?page=${req.page}&size=${req.size}`,{
     params: parametres
   });
  }
  else{
    return this.http.get<any>(
     `${environment.baseUrl}typeags?page=${0}&size=${100000}`,{
       params: parametres
      });
    }
  }
  // Read a typeag
  readTypeag(typeagId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}typeags/${typeagId}`);
  }

  // Delete typeag
  deleteTypeag(typeagId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}typeags/${typeagId}`, {
      observe: 'response',
    });
  }
  // Export typeag
  exportTypeag() {
      return this.http.get(`${environment.baseUrl}typeags/export`, {
       responseType: 'blob'
        });
  }
}
