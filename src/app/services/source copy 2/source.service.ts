import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SourceService {

  constructor(protected http: HttpClient) { }

  //  create nature
  createSources(source: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}sources`,source);
  }

  // update a nature
  updateSources(SourcesId : any, source: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}sources/${SourcesId}`, source, {
      observe: 'response',
    });
  }

   // get a nature
   readSources(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}sources/${id}`, {
      observe: 'response',
    });
  }

  //read all natures
  readsources(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();
    if(req){
      if(req?.code){
        parametres = parametres.append("code",req?.code);
      }
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle",req?.libelle);
      }
      return this.http.get<any>(
        `${environment.baseUrl}sources?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}sources?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
    
  }

  //delete a nature
  deleteSousCategories(sourcesId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}sources/${sourcesId}`, {
      observe: 'response',
    });
  }
}
