import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  constructor(protected http: HttpClient) { }

  //  create Recommendation
  createRecommendation(recommendation: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}recommendations`, recommendation);
  }

  // update a recommendation
  updateRecommendation(recommendationId : any, recommendation: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}recommendations/${recommendationId}`, recommendation, {
      observe: 'response',
    });
  }

   // get a recommendation
   readRecommendation(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}recommendations/${id}`, {
      observe: 'response',
    });
  }

  //read all recommendations
  readRecommendations(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();
    if(req){
      if(req?.issueLogId != undefined && req?.issueLogId){
        parametres = parametres.append("issueLogId",req?.issueLogId);
      }
      if(req?.deadline != undefined && req?.deadline){
        parametres = parametres.append("deadline",req?.deadline);
      }
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle",req?.libelle);
      }
      if(req?.statusId != undefined && req?.statusId){
        parametres = parametres.append("statusId",req?.statusId);
      }
      if(req?.responsable != undefined && req?.responsable){
        parametres = parametres.append("responsable",req?.responsable);
      }    
      if(req?.riskId != undefined && req?.riskId){
        parametres = parametres.append("riskId",req?.riskId);
      }
      if(req?.assignmentId != undefined && req?.assignmentId){
        parametres = parametres.append("assignmentId",req?.assignmentId);
      }
      if(req?.projectId != undefined && req?.projectId){
        parametres = parametres.append("projectId",req?.projectId);
      }

      return this.http.get<any>(
        `${environment.baseUrl}recommendations?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}recommendations?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
    
  }

  //delete a recommendation
  deleteRecommendation(recommendationId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}recommendations/${recommendationId}`, {
      observe: 'response',
    });
  }
}
