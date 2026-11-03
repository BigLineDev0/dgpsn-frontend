import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PlanPassationService {
  constructor(protected http: HttpClient) { }


  createPlanPassation(passation: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}passationplan`, passation);
  }

  updatePlanPassation(passationId : any, passation: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}passationplan/${passationId}`, passation, {
      observe: 'response',
    });
  }

   readPlanPassation(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}passationplan/${id}`, {
      observe: 'response',
    });
  }

  readPlanPassations(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();
    if(req){
      if(req?.code){
        parametres = parametres.append("code",req?.code);
      }
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle",req?.libelle);
      }
      if(req?.managementUnitId != undefined && req?.managementUnitId){
        parametres = parametres.append("managementUnitId",req?.managementUnitId);
      }

      
      return this.http.get<any>(
        `${environment.baseUrl}passationplan?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}passationplan?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
    
  }

  //delete a nature
  deletePlanPassation(passationId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}passationplan/${passationId}`, {
      observe: 'response',
    });
  }
}
