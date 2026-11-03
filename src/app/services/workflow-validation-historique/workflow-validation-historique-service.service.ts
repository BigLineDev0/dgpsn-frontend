import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkflowValidationHistoriqueServiceService {

  constructor(protected http: HttpClient) { }
  
    // create historique
    // createHistorique(workflow: any): Observable<any> {
    //   return this.http.post<any>(`${environment.baseUrl}workflow-validation-historiques`, workflow);
    // }
  
    // update a historique 
    updateHistorique(historiqueId: any, workflow: any): Observable<any> {
      return this.http.put<any>(`${environment.baseUrl}workflow-validation-historiques/${historiqueId}`, workflow, {
        observe: 'response',
      });
    }
  
    // get a historique
    readHistorique(id: any): Observable<any> {
      return this.http.get<any>(`${environment.baseUrl}workflow-validation-historiques/${id}`, {
        observe: 'response',
      });
    }
  
    //read all historique
    readHistoriques(historique: { [key:string]: string} | null, page: any, size: any): Observable<any> {
      let params = new HttpParams()
        .set('page', page)
        .set('size', size);
  
      if (historique !== null) {
        Object.entries(historique).forEach(([key, value]) => {
          if (value !== undefined) {
            params = params.set(key, value); 
          }
        });
      }
  
      return this.http.get<any>(`${environment.baseUrl}workflow-validation-historiques`, { params: params });
  
    }
  
    //delete a historique
    deleteHistorique(historiqueId: any): Observable<any> {
      return this.http.delete<any>(`${environment.baseUrl}workflow-validation-historiques/${historiqueId}`, {
        observe: 'response',
      });
    }
}
