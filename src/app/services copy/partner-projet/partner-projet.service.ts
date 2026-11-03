import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartnerProjetService {

  constructor(protected http: HttpClient) { }

  //  Add partner to project
  addPartnerToProject(partnerProject: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}partner-project`, partnerProject);
  }

  //  Add Many Structure  to project
  addManyStructureToProject(partnerProjectList: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}partner-project/many`, partnerProjectList);
  }

  // update partnerProject
  updatePartnerProject(partnerProjectId : any, partnerProject: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}partner-project/${partnerProjectId}`, partnerProject, {
      observe: 'response',
    });
  }

  // get a partnerToProject
  readPartnerProject(partnerProjectId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}partner-project/${partnerProjectId}`, {
      observe: 'response',
    });
  }

  //read all partnerProject
  readPartnerProjects(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();

    if(req){
      if(req?.projectId != undefined && req?.projectId){
        parametres = parametres.append("projectId", req?.projectId);
      }
      if(req.montant) {
        parametres = parametres.append("montant", req?.montant);
      }
      if(req.structureId) {
        parametres = parametres.append("structureId", req?.structureId);
      }
      if(req.startDate) {
        parametres = parametres.append("startDate", req?.startDate);
      }
      if(req.endDate) {
        parametres = parametres.append("endDate", req?.endDate);
      }
      if(req.structureType) {
        parametres = parametres.append("structureType", req?.structureType);
      }
      if(req.structureProjectType) {
        parametres = parametres.append("structureProjectType", req?.structureProjectType);
      }
      if(req.structureProjectTypeList) {
        parametres = parametres.append("structureProjectTypeList", req?.structureProjectTypeList);
      }
      if(req?.sortBy != undefined && req?.sortBy){
        parametres = parametres.append("sortBy", req?.sortBy);
      }
      if(req?.ascending != undefined && req?.ascending){
        parametres = parametres.append("ascending", req?.ascending);
      }
      
      return this.http.get<any>(
        `${environment.baseUrl}partner-project?page=${req.page}&size=${req.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}partner-project?page=${0}&size=${100000}`,{
          params: parametres  
        }
      );
    }
  }

  //delet partner
  deletePartner(partnerProjectId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}partner-project/${partnerProjectId}`, {
      observe: 'response',
    });
  }

  importPartner(file: any, projectId: any) {
    let formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('projectId', projectId);

    return this.http.post<any>(`${environment.baseUrl}partner-project/import`, formData, {
      observe: 'response'
    });
  }

  exportPartner() {
    return this.http.get(`${environment.baseUrl}partner-project/export`, {
      responseType: 'blob'
    });
  }

  // projects by structure
  readProjectsByStructure(structureId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}partner-project/reportingByStructure/${structureId}`, {
      observe: 'response',
    });
  }
}
