import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValueIndicatorService {

  constructor(protected http: HttpClient) { }

  //  Add valueIndicatorProject to project
  addValueIndicatorToProject(valueIndicatorProject: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}value-indicators`, valueIndicatorProject);
  }

   //  Update valueIndicatorProject to project
   updateValueIndicatorToProject(valueIndicatorProjectId: any, valueIndicatorProject: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}value-indicators/${valueIndicatorProjectId}`, valueIndicatorProject);
  }

  //  delete valueIndicatorProject to project
  deleteValueIndicatorToProject(valueIndicatorProjectId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}value-indicators/${valueIndicatorProjectId}`);
  }


  //read all valueIndicatorProject
  readValueIndicatorProjects(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();

    if(req){
      if(req.projectId != undefined){
        parametres = parametres.append("projectId", req.projectId);
      }
      if(req.activityId != undefined){
        parametres = parametres.append("activityId", req.activityId);
      }
      if(req.indicatorId != undefined){
        parametres = parametres.append("indicatorId", req.indicatorId);
      }
      if(req.targetValue != undefined){
        parametres = parametres.append("targetValue", req.targetValue);
      }
      if(req.valueReched != undefined){
        parametres = parametres.append("valueReched", req.valueReched);
      }
      if(req.period != undefined){
        parametres = parametres.append("period", req.period);
      }
      return this.http.get<any>(
        `${environment.baseUrl}value-indicators?page=${req.page}&size=${req.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}value-indicators?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
  }

  //  Import value indicator
  importValueIndicatort(file: File, projectId: any): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('projectId', projectId);
    return this.http.post<any>(`${environment.baseUrl}value-indicators/import`, formData,{
      observe: 'response'
    })
  }

  exportProjetToExcel() {

    return this.http.get(`${environment.baseUrl}value-indicators/export/excel`, {
      responseType: 'blob'
    });
  }

  //read last valueIndicatorProject
  readLastValueIndicator(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();

      if(req.projectId != undefined){
        parametres = parametres.append("projectId", req.projectId);
      }
      return this.http.get<any>(
        `${environment.baseUrl}value-indicators/last`,{
          params: parametres
        }
      );

  }


 }

