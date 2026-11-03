import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MilestoneService {

  constructor(protected http: HttpClient) { }

  //  Add milestone to project
  addMilestoneToProject(milestone: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}milestones`, milestone);
  }

   //  update milestone to project
   updateMilestoneToProject(milestoneId: any, milestone: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}milestones/${milestoneId}`, milestone);
  }

  //  Add milestone to project
  deleteMilestoneToProject(milestoneId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}milestones/${milestoneId}`);
  }

  //read all milestone of project
  readMilestoneProjects(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();

    if(req){
      if(req?.projectId != undefined && req?.projectId){
        parametres = parametres.append("projectId", req?.projectId);
      }
      if(req?.libelle != undefined){
        parametres = parametres.append("libelle", req?.libelle);
      }
      if(req?.predicatedDate != undefined && req?.predicatedDate){
        parametres = parametres.append("predicatedDate", req?.predicatedDate);
      }
      if(req?.readDate != undefined  && req?.readDate){ 
        parametres = parametres.append("readDate", req?.readDate);
      }
      return this.http.get<any>(
        `${environment.baseUrl}milestones?page=${req.page}&size=${req.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}milestones?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
  }

  importMilestoneToProject(file: any, projectId: any) {
    let formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('projectId', projectId);

    return this.http.post<any>(`${environment.baseUrl}milestones/import`, formData, {
      observe: 'response'
    });
  }

  exportMilestone() {
    return this.http.get(`${environment.baseUrl}milestones/export`, {
      responseType: 'blob'
    });
  }
}
