import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(protected http: HttpClient) { }

  //  create query
  createQuery(query: any): Observable<any> {
    // let formData: FormData = new FormData();
    // formData.append('QueryDTO', JSON.stringify(query));
    // if(file){
    //   formData.append('file', file[0], file.name);
    // }
    return this.http.post<any>(`${environment.baseUrl}queries`, query);
  }

  // update a query
  updateQuery(queryId : any, query: any, file: any): Observable<any> {

    let formData: FormData = new FormData();
    formData.append('QueryDTO', JSON.stringify(query));
    if(file){
      formData.append('file', file[0], file.name);
    }
    return this.http.put<any>(`${environment.baseUrl}queries/${queryId}`, formData, {
      observe: 'response',
    });
  }

   // get a query
   readQuery(id: any,file:any): Observable<any> {

    return this.http.get<any>(`${environment.baseUrl}queries/${id}`, {
      observe: 'response',
    });
  }

  //read all query
  readQueries(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();
    if(req){
      if(req?.object != undefined && req?.object){
        parametres = parametres.append("object",req?.object);
      }
      if(req?.date != undefined && req?.date){
        parametres = parametres.append("date",req?.date);
      }
      if(req?.amount != undefined && req?.amount){
        parametres = parametres.append("amount",req?.amount);
      }
      if(req?.partenerId != undefined && req?.partenerId){
        parametres = parametres.append("partenerId",req?.partenerId);
      }
      if(req?.executiveId != undefined && req?.executiveId){
        parametres = parametres.append("executiveId",req?.executiveId);
      }
      if(req?.projetId != undefined && req?.projetId){
        parametres = parametres.append("projetId",req?.projetId);
      }
      return this.http.get<any>(
        `${environment.baseUrl}queries?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}queries?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }

  }

  //delete a query
  deleteQuery(queryId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}queries/${queryId}`, {
      observe: 'response',
    });
  }
  readFile(id: any): Observable <any>{
    return this.http
    .get(
      `${environment.baseUrl}queries/${id}/_download`,
      {

        responseType: 'blob'
      }
    );
  }

  importQuery(file: any, projectId: any) {
    let formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('projectId', projectId);

    return this.http.post<any>(`${environment.baseUrl}queries/import`, formData, {
      observe: 'response'
    });
  }

  exportQuery() {
    return this.http.get(`${environment.baseUrl}queries/export`, {
      responseType: 'blob'
    });
  }
}
