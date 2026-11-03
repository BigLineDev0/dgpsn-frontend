import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoryStatusService {

  constructor(private http: HttpClient) { }

  //  Add valueIndicatorProject to project
  addHistoryStatusOfProject(historyStatus: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}histories-status`, historyStatus);
  }

  //  update valueIndicatorProject to project
  updateHistoryStatusOfProject(historyStatusId: any, historyStatus: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}histories-status/${historyStatusId}`, historyStatus);
  }

  //  Add valueIndicatorProject to project
  deleteHistoryStatusOfProject(historyStatusId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}histories-status/${historyStatusId}`);
  }


  //read all valueIndicatorProject
  readHistoriesStatusProjects(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();

    if(req){
      if(req?.projectId != undefined && req?.projectId){
        parametres = parametres.append("projectId", req?.projectId);
      }
      if(req?.statusId != undefined && req?.statusId){
        parametres = parametres.append("statusId", req?.statusId);
      }
      if(req?.startDate != undefined && req?.startDate){
        parametres = parametres.append("startDate", req?.startDate);
      }
      if(req?.endDate != undefined && req?.endDate){
        parametres = parametres.append("endDate", req?.endDate);
      }
      return this.http.get<any>(
        `${environment.baseUrl}histories-status?page=${req.page}&size=${req.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}histories-status?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
  }

  importStatut(file: any, projectId: any) {
    let formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('projectId', projectId);

    return this.http.post<any>(`${environment.baseUrl}histories-status/import`, formData, {
      observe: 'response'
    });
  }

  //read historyStatus by libelle
  readHistoriesStatusByLibelle(statusLibelle: string): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}histories-status/byStatusLibelle?libelle=${statusLibelle}`);
  }
}
