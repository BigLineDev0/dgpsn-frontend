import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(protected http: HttpClient) { }

  //  create assignment
  createAssignment(file: any, assignment: any): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('AssignmentDTO', JSON.stringify(assignment));
    if(file){
      formData.append('file', file[0]);
    }    
    return this.http.post<any>(`${environment.baseUrl}assignments`, formData);
  }

  updateAssignment(file: any, assignmentId : any, assignment: any): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('AssignmentDTO', JSON.stringify(assignment));
    if(file){
      formData.append('file', file[0]);
    }  
    return this.http.put<any>(`${environment.baseUrl}assignments/${assignmentId}`, formData, {
      observe: 'response',
    });
  }
  
  createAssignmentActivity(assignment: any){
    return this.http.post<any>(`${environment.baseUrl}assignments/assignmentActivity`, assignment);
  }
  // update a assignment
  updateAssignmentACtivity(assignmentId : any, assignment: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}assignments/assignmentActivity/${assignmentId}`, assignment, {
      observe: 'response',
    });
  }


   // get a assignment
   readAssignment(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}assignments/${id}`, {
      observe: 'response',
    });
  }

  //read all assignment
  readAssignments(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();
    if(req){
      
      if(req?.projetId != undefined && req?.projetId){
        parametres = parametres.append("projetId",req?.projetId);
      }
      if(req?.assignmentTypeId!= undefined && req?.assignmentTypeId){
        parametres = parametres.append("assignmentTypeId",req?.assignmentTypeId);
      }
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle",req?.libelle);
      }
      if(req?.startDate != undefined && req?.startDate){
        parametres = parametres.append("startDate",req?.startDate);
      }
      if(req?.endDate != undefined && req?.endDate){
        parametres = parametres.append("endDate",req?.endDate);
      }
      if(req?.structureExecutionId != undefined && req?.structureExecutionId){
        parametres = parametres.append("structureExecutionId",req?.structureExecutionId);
      }
      if(req?.partenerId != undefined && req?.partenerId){
        parametres = parametres.append("partenerId",req?.partenerId);
      }
      if(req?.statusId != undefined && req?.statusId){
        parametres = parametres.append("statusId",req?.statusId);
      }
      
      return this.http.get<any>(
        `${environment.baseUrl}assignments?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}assignments?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
    
  }

  //delete a assignment
  deleteAssignment(assignmentId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}assignments/${assignmentId}`, {
      observe: 'response',
    });
  }

  readIssuelogByAssignment(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();
    if(req){
      
      if(req?.assignmentId != undefined && req?.assignmentId){
        parametres = parametres.append("assignmentId",req?.assignmentId);
      }
         
      if(req?.projetId != undefined && req?.projetId){
        parametres = parametres.append("projetId",req?.projetId);
      }
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle",req?.libelle);
      }
      if(req?.natureId != undefined && req?.natureId){
        parametres = parametres.append("natureId",req?.natureId);
      }
      if(req?.identificationDate != undefined && req?.identificationDate){
        parametres = parametres.append("identificationDate",req?.identificationDate);
      }
      if(req?.resolutionDate != undefined && req?.resolutionDate){
        parametres = parametres.append("resolutionDate",req?.resolutionDate);
      }
      if(req?.deadline != undefined && req?.deadline){
        parametres = parametres.append("deadline",req?.deadline);
      }
      if(req?.criticityId != undefined && req?.criticityId){
        parametres = parametres.append("criticityId",req?.criticityId);
      }
      if(req?.statusId != undefined && req?.statusId){
        parametres = parametres.append("statusId",req?.statusId);
      }
      return this.http.get<any>(
        `${environment.baseUrl}issuelogs?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}issuelogs?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
    
  }

   //  create issueLog of assignment
   createIssueLogListOfAssignment(assignmentIssueLog: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}assignmentIssuelogs`, assignmentIssueLog);
  }

    //  create issueLog of assignment
    createIssueLogOfAssignment(assignmentIssueLog: any): Observable<any> {
      return this.http.post<any>(`${environment.baseUrl}issuelogs`, assignmentIssueLog);
    }

      // delete a issuelog
  deleteIssuelogAssignment(assignmentId: any, issuelogId: any): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('assignmentId', assignmentId);
    params = params.append('issuelogId', issuelogId);

     return this.http.delete<any>(`${environment.baseUrl}issuelogs/${assignmentId}`, {
      observe: 'response',
      params: params
    });
  }

  readFile(id: any): Observable <any>{
    return this.http
    .get(
      `${environment.baseUrl}assignments/${id}/_download`, 
      {
        responseType: 'blob'
      }
    );
  }

  importAssignment(file: any, projectId: any) {
    let formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('projectId', projectId);

    return this.http.post<any>(`${environment.baseUrl}assignments/import`, formData, {
      observe: 'response'
    });
  }
  
  exportAssignment() {
    return this.http.get(`${environment.baseUrl}assignments/export`, {
      responseType: 'blob'
    });
  }
}
