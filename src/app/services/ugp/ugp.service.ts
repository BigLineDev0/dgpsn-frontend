import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UgpService {

  constructor(protected http: HttpClient) { }

  //  Add ugp to project
  addUgpToProject(ugp: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}ugp-project`, ugp);
  }

  // update ugp
  updateUgpProject(ugpId : any, ugp: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}ugp-project/${ugpId}`, ugp, {
      observe: 'response',
    });
  }

  // get a ugp
  readUgpProject(ugpId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}ugp-project/${ugpId}`, {
      observe: 'response',
    });
  }

  // delete ugp
  deleteUgpProject(ugpId : any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}ugp-project/${ugpId}`, {
      observe: 'response',
    });
  }

  //read all actorProject
  readUgpProjects(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();

    if(req){
      if(req?.projectId != undefined && req?.projectId){
        parametres = parametres.append("projectId", req?.projectId);
      }
      if(req?.existed != undefined && req?.existed){
        parametres = parametres.append("existed", req?.existed);
      }
      if(req?.occupied != undefined && req?.occupied){
        parametres = parametres.append("occupied", req?.occupied);
      }
      if(req?.status != undefined && req?.status){
        parametres = parametres.append("status", req?.status);
      }
      if(req?.ugpRoleId != undefined && req?.ugpRoleId){
        parametres = parametres.append("ugpRoleId", req?.ugpRoleId);
      }
      return this.http.get<any>(
        `${environment.baseUrl}ugp-project?page=${req.page}&size=${req.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}ugp-project?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
  }

}
