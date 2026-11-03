import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediathequeService {

  constructor(private http: HttpClient) { }

  //  Add mediatheque to project
  addMediathequeToProject(mediatheque: any, file?: any): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('MediathequeDTO', JSON.stringify(mediatheque));
    if(file){
      formData.append('file', file[0]);
    }
    console.log("file mediathèque ", file)
    return this.http.post<any>(`${environment.baseUrl}mediatheques`, formData);
  }


  //read all mediatheque
  readMediathequeOfProjects(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();

    if(req){
      
      if(req?.projectId != undefined && req?.projectId){
        parametres = parametres.append("projectId", req?.projectId);
      }

      if(req?.entrepriseId != undefined && req?.entrepriseId){
        parametres = parametres.append("entrepriseId", req?.entrepriseId);
      }

      if(req?.managementUnitId != undefined && req?.managementUnitId){
        parametres = parametres.append("managementUnitId", req?.managementUnitId);
      }
      
      if(req?.mediathequeType != undefined && req?.mediathequeType){
        parametres = parametres.append("mediathequeType", req?.mediathequeType);
      }
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle", req?.libelle);
      }
      if(req?.date != undefined && req?.date){
        parametres = parametres.append("date", req?.date);
      }
      return this.http.get<any>(
        `${environment.baseUrl}mediatheques?page=${req.page}&size=${req.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}mediatheques?page=${0}&size=${10000}`,{
          params: parametres
        }
      );
    }
  }
  updateMediatheque(mediathequeId : any, mediatheque: any, file?: any): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('MediathequeDTO', JSON.stringify(mediatheque));
    if(file){
      formData.append('file', file[0]);
    }
    return this.http.put<any>(`${environment.baseUrl}mediatheques/${mediathequeId}`, formData, {
      observe: 'response',
    });
  }
  updateMediathequevideo(mediathequeId : any, mediatheque: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}mediatheques/${mediathequeId}`, mediatheque, {
      observe: 'response',
    });
  }
  deleteMediatheques(mediathequeId: any) {
    return this.http.delete<any>(`${environment.baseUrl}mediatheques/${mediathequeId}`, {
      observe: 'response',
    });
  }

  readFile(id: any): Observable <any>{
    return this.http
    .get(
      `${environment.baseUrl}mediatheques/${id}/_download`,
      {
        responseType: 'blob'
      }
    );
  }


}
