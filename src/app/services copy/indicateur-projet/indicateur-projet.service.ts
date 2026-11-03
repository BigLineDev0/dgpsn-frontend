import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IndicateurProjetService {

  constructor(protected http: HttpClient) { }

  //  Add indicatorProject to project
  addIndicatorToProject(indicatorProject: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}indicator-project`, indicatorProject);
  }

  // update indicatorProject
  updateIndicatorProject(indicatorProjectId : any, indicatorProject: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}indicator-project/${indicatorProjectId}`, indicatorProject, {
      observe: 'response',
    });
  }

  // get a indicatorProject
  readIndicatorProject(indicatorProjectId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}indicator-project/${indicatorProjectId}`, {
      observe: 'response',
    });
  }

  //read all indicatorProject
  readIndicatorProjects(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();

    if(req){
      if(req?.projetId != undefined){
        parametres = parametres.append("projetId", req?.projetId);
      }
      if(req?.indicatorId != undefined || req?.indicatorId != null){
        parametres = parametres.append("indicatorId", req?.indicatorId);
      }
      if(req?.periodicityId != undefined || req?.periodicityId != null){
        parametres = parametres.append("periodicityId", req?.periodicityId);
      }
      if(req?.targetValue != undefined || req?.targetValue != null){
        parametres = parametres.append("targetValue", req?.targetValue);
      }
      return this.http.get<any>(
        `${environment.baseUrl}indicator-project?page=${req.page}&size=${req.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}indicator-project?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
  }

  //deleteIndicateur
  deleteIndcateurProject(indicatorProjectId: any) {
    return this.http.delete<any>(`${environment.baseUrl}indicator-project/${indicatorProjectId}`, {
      observe: 'response',
    });
  }
  importIndicator(file: any, projectId: any) {
    let formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('projectId', projectId);

    return this.http.post<any>(`${environment.baseUrl}indicator-project/import`, formData, {
      observe: 'response'
    });
  }

  exportIndicator() {
    return this.http.get(`${environment.baseUrl}indicator-project/export`, {
      responseType: 'blob'
    });
  }
}
