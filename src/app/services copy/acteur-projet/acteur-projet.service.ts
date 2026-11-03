import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActeurProjetService {

  constructor(protected http: HttpClient) { }

  //  Add actorProject to project
  addActorToProject(actorProject: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}actor-project`, actorProject);
  }

  // update actorProject
  updateActorProject(actorProjectId : any, actorProject: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}actor-project/${actorProjectId}`, actorProject, {
      observe: 'response',
    });
  }

  // get a actorProject
  readActorProject(actorProjectId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}actor-project/${actorProjectId}`, {
      observe: 'response',
    });
  }

  // delete actorProject
  deleteActorProject(deleteProjectId : any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}actor-project/${deleteProjectId}`, {
      observe: 'response',
    });
  }

  //read all actorProject
  readActorProjects(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();

    if(req){
      if(req?.projectId != undefined && req?.projectId){
        parametres = parametres.append("projectId", req?.projectId);
      }
      if(req?.agentId != undefined && req?.agentId){
        parametres = parametres.append("agentId", req?.agentId);
      }
      if(req?.roleId != undefined && req?.roleId){
        parametres = parametres.append("roleId", req?.roleId);
      }
      return this.http.get<any>(
        `${environment.baseUrl}actor-project?page=${req.page}&size=${req.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}actor-project?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
  }

  importActeur(file: any, projectId: any) {
    let formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('projectId', projectId);

    return this.http.post<any>(`${environment.baseUrl}actor-project/import`, formData, {
      observe: 'response'
    });
  }

  exportActor() {
    return this.http.get(`${environment.baseUrl}actor-project/export`, {
      responseType: 'blob'
    });
  }
}
