import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecteuractiviteService {
  constructor(protected http: HttpClient) { }

  // Create secteuractivite
  createSecteuractivite(secteuractivite: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}secteuractivites`, secteuractivite);
  }

  // Update secteuractivite
  updateSecteuractivite(secteuractiviteId: any, secteuractivite: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}secteuractivites/${secteuractiviteId}`, secteuractivite, {
      observe: 'response',
    });
  }
  // Read all secteuractivite
  readSecteuractivites(req: any): Observable<any> {
  let parametres: HttpParams = new HttpParams();
  if(req){
    if(req?.code != undefined && req?.code){
      parametres = parametres.append("code",req?.code);
    }
    if(req?.libelle != undefined && req?.libelle){
      parametres = parametres.append("libelle",req?.libelle);
    }
    return this.http.get<any>(
     `${environment.baseUrl}secteuractivites?page=${req.page}&size=${req.size}`,{
     params: parametres
   });
  }
  else{
    return this.http.get<any>(
     `${environment.baseUrl}secteuractivites?page=${0}&size=${100000}`,{
       params: parametres
      });
    }
  }
  // Read a secteuractivite
  readSecteuractivite(secteuractiviteId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}secteuractivites/${secteuractiviteId}`);
  }

  // Delete secteuractivite
  deleteSecteuractivite(secteuractiviteId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}secteuractivites/${secteuractiviteId}`, {
      observe: 'response',
    });
  }
  // Export secteuractivite
  exportSecteuractivite() {
      return this.http.get(`${environment.baseUrl}secteuractivites/export`, {
       responseType: 'blob'
        });
  }
}
