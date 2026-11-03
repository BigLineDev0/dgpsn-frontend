import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssueLogService {

  constructor(protected http: HttpClient) { }

  //  create issueLog
  createIssueLog(issueLog: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}issuelogs`, issueLog);
  }

  // update a issuelog
  updateIssuelog(issuelogId : any, issuelog: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}issuelogs/${issuelogId}`, issuelog, {
      observe: 'response',
    });
  }

   // update a issuelog
   validIssuelog(issuelogId : any, issuelog: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}issuelogs/valid/${issuelogId}`, issuelog, {
      observe: 'response',
    });
  }

  // update a issuelog
  updateIssuelogRisk(issuelogId : any, issuelogRisk: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}issuelogs/issueLogRisk/${issuelogId}`, issuelogRisk, {
      observe: 'response',
    });
  }

  // issueLog a issuelog
  deleteIssuelogRisk(issuelogRiskId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}issuelogs/issueLogRisk/${issuelogRiskId}`, {
      observe: 'response',
    });
  }

   // get a issuelog
   readIssuelog(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}issuelogs/${id}`, {
      observe: 'response',
    });
  }

  //read all issuelogs
  readIssuelogs(req?: any): Observable<any> {
    
    let parametres: HttpParams = new HttpParams();
    if(req){
      
      if(req?.projetId != undefined && req?.projetId){
        parametres = parametres.append("projetId",req?.projetId);
      }
      if(req?.statusId != undefined && req?.statusId){
        parametres = parametres.append("statusId",req?.statusId);
      }
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle",req?.libelle);
      }
      if(req?.criticityId != undefined && req?.criticityId){
        parametres = parametres.append("criticityId",req?.criticityId);
      }
      if(req?.financialImpactId != undefined && req?.financialImpactId){  
        parametres = parametres.append("financialImpactId",req?.financialImpactId);
      }
      if(req?.delayImpactId != undefined && req?.delayImpactId){
        parametres = parametres.append("delayImpactId",req?.delayImpactId);
      }
      if(req?.identificationDate != undefined && req?.identificationDate){
        parametres = parametres.append("identificationDate",req?.identificationDate);
      }
      if(req?.deadline != undefined && req?.deadline){
        parametres = parametres.append("deadline",req?.deadline);
      }
      if(req?.resolutionDate != undefined && req?.resolutionDate){
        parametres = parametres.append("resolutionDate",req?.resolutionDate);
      }
      
      
      if(req?.natureId != undefined && req?.natureId){
        parametres = parametres.append("natureId",req?.natureId);
      }
      console.log("params ", parametres)
      
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

  //delete a issuelog
  deleteIssuelog(issuelogId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}issuelogs/${issuelogId}`, {
      observe: 'response',
    });
  }

  //read all issuelogs
  readIssuelogByRisk(req?: any): Observable<any> {
    // console.log("req ", req)
    let parametres: HttpParams = new HttpParams();
    if(req){
      
      if(req?.riskId != undefined && req?.riskId){
        parametres = parametres.append("riskId",req?.riskId);
      }
      return this.http.get<any>(
        `${environment.baseUrl}risks/issueLog?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}risks/issueLog?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
    
  }
  importProblem(file: any, projectId: any) {
    let formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('projectId', projectId);

    return this.http.post<any>(`${environment.baseUrl}issuelogs/import`, formData, {
      observe: 'response'
    });
  }
 //export to excel
 exportProblemExcel() {
    
  return this.http.get(`${environment.baseUrl}issuelogs/export/excel`, { responseType: 'blob' }).subscribe(
     (data) => {
       console.log("data",data)
       // const blob = new Blob([data], { type: 'text/csv' });
       const url = window.URL.createObjectURL(data);
       window.open(url);
     },
     (error) => {
       console.error('Une erreur s\'est produite lors de l\'exportation CSV :', error);
     }
   );
 }

 readListIssuelog(projectId: any): Observable<any> {
  console.log("projectId ", projectId)
  return this.http.get<any>(`${environment.baseUrl}issuelogs/list/${projectId}`, {
    observe: 'response',
  });
}

}
