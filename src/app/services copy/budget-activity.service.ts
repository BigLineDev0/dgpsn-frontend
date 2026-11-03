import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BudgetActivityService {

  constructor(protected http: HttpClient) { }

  //  Add budget to project
  addBudgetActivity(budget: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}budgetActivity`, budget);
  }

   //  update budget to project
   updateBudgetActivity(budgetId: any, budget: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}budgetActivity/${budgetId}`, budget);
  }

  //  Add budget to project
  deleteBudgetActivity(budgetId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}budgetActivity/${budgetId}`);
  }

  //read all budget of project
  readBudgetActivity(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();

    if(req){
      if(req?.projectId != undefined && req?.projectId){
        parametres = parametres.append("projectId", req?.projectId);
        
      }
      if(req?.typeBudgetId != undefined){
        parametres = parametres.append("typeBudgetId", req?.typeBudgetId);
      }
      if(req?.amount != undefined && req?.amount){
        parametres = parametres.append("amount", req?.amount);
      }
      if(req?.allocation != undefined  && req?.allocation){ 
        parametres = parametres.append("allocation", req?.allocation);
      }
      return this.http.get<any>(
        `${environment.baseUrl}budgetActivity?page=${req.page}&size=${req.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}budgetActivity?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
  }

  importBudgetActivity(file: any, projectId: any) {
    let formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('projectId', projectId);

    return this.http.post<any>(`${environment.baseUrl}budgets/import`, formData, {
      observe: 'response'
    });
  }

  exportMilestone() {
    return this.http.get(`${environment.baseUrl}budgets/export`, {
      responseType: 'blob'
    });
  }
 
}

