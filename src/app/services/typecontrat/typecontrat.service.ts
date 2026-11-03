import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TypecontratService {

 constructor(protected http: HttpClient) { }

  // Create typecontrat
  createTypecontrat(typecontrat: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}typecontrats`, typecontrat);
  }

  // Update typecontrat
  updateTypecontrat(typecontratId: any, typecontrat: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}typecontrats/${typecontratId}`, typecontrat, {
      observe: 'response',
    });
  }
  // Read all typecontrat
  readTypecontrats(req: any): Observable<any> {
  let parametres: HttpParams = new HttpParams();
  if(req){
    if(req?.code != undefined && req?.code){
      parametres = parametres.append("code",req?.code);
    }
    if(req?.libelle != undefined && req?.libelle){
      parametres = parametres.append("libelle",req?.libelle);
    }
    return this.http.get<any>(
     `${environment.baseUrl}typecontrats?page=${req.page}&size=${req.size}`,{
     params: parametres
   });
  }
  else{
    return this.http.get<any>(
     `${environment.baseUrl}typecontrats?page=${0}&size=${100000}`,{
       params: parametres
      });
    }
  }
  // Read a typecontrat
  readTypecontrat(typecontratId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}typecontrats/${typecontratId}`);
  }

  // Delete typecontrat
  deleteTypecontrat(typecontratId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}typecontrats/${typecontratId}`, {
      observe: 'response',
    });
  }
  // Export typecontrat
  exportTypecontrat() {
      return this.http.get(`${environment.baseUrl}typecontrats/export`, {
       responseType: 'blob'
        });
  }

}
