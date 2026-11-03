import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(protected http: HttpClient) { }

  //  create review
  createReview(review: any, file: any): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('ReviewDTO', JSON.stringify(review));
    if(file){
      formData.append('file', file[0], file.name);
    }
    return this.http.post<any>(`${environment.baseUrl}reviews`, formData);
  }

  // update a review
  updateReview(reviewId : any, review: any , file: any): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('ReviewDTO', JSON.stringify(review));
    if(file){
      formData.append('file', file[0], file.name);
    }
    return this.http.put<any>(`${environment.baseUrl}reviews/${reviewId}`, formData, {
      observe: 'response',
    });
  }

   // get a review
   readReview(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}reviews/${id}`, {
      observe: 'response',
    });
  }

  //read all reviews
  readReviews(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();
    if(req){

      if(req?.projetId != undefined && req?.projetId){
        parametres = parametres.append("projetId",req?.projetId);
      }
      if(req?.keyPoint != undefined && req?.keyPoint){
        parametres = parametres.append("keyPoint",req?.keyPoint);
      }
      if(req?.date != undefined && req?.date){
        parametres = parametres.append("date",req?.date);
      }
      return this.http.get<any>(
        `${environment.baseUrl}reviews?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}reviews?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }

  }

  //delete a review
  deleteReview(queryId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}reviews/${queryId}`, {
      observe: 'response',
    });
  }


  //read Issue Log by review
  readIssuelogByReview(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();
    if(req){

      if(req?.reviewId != undefined && req?.reviewId){
        parametres = parametres.append("reviewId",req?.reviewId);
      }
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle",req?.libelle);
      }
      if(req?.description != undefined && req?.description){
        parametres = parametres.append("description",req?.description);
      }
      if(req?.author != undefined && req?.author){
        parametres = parametres.append("author",req?.author);
      }
      if(req?.natureId != undefined && req?.natureId){
        parametres = parametres.append("natureId",req?.natureId);
      }
      if(req?.statusId != undefined && req?.statusId){
        parametres = parametres.append("statusId",req?.statusId);
      }
      if(req?.financialImpactId != undefined && req?.financialImpactId){
        parametres = parametres.append("financialImpactId",req?.financialImpactId);
      }
      if(req?.delayImpactId != undefined && req?.delayImpactId){
        parametres = parametres.append("delayImpactId",req?.delayImpactId);
      }
      if(req?.criticityId != undefined && req?.criticityId){
        parametres = parametres.append("criticityId",req?.criticityId);
      }

      return this.http.get<any>(
        `${environment.baseUrl}reviewIssuelogs?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}reviewIssuelogs?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }

  }

   //  create issueLog of review
   createIssueLogListOfReview(reviewIssueLog: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}reviewIssuelogs`, reviewIssueLog);
  }

    //  create issueLog of review
    createIssueLogOfReview(reviewIssueLog: any): Observable<any> {
      return this.http.post<any>(`${environment.baseUrl}reviewIssuelogs/new`, reviewIssueLog);
    }

    //read risk  by review
  readRiskByReview(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();
    if(req){

      if(req?.reviewId != undefined && req?.reviewId){
        parametres = parametres.append("reviewId",req?.reviewId);
      }
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle",req?.libelle);
      }
      if(req?.description != undefined && req?.description){
        parametres = parametres.append("description",req?.description);
      }
      if(req?.author != undefined && req?.author){
        parametres = parametres.append("author",req?.author);
      }
      if(req?.natureId != undefined && req?.natureId){
        parametres = parametres.append("natureId",req?.natureId);
      }
      if(req?.statusId != undefined && req?.statusId){
        parametres = parametres.append("statusId",req?.statusId);
      }
      if(req?.financialImpactId != undefined && req?.financialImpactId){
        parametres = parametres.append("financialImpactId",req?.financialImpactId);
      }
      if(req?.delayImpactId != undefined && req?.delayImpactId){
        parametres = parametres.append("delayImpactId",req?.delayImpactId);
      }
      if(req?.probability != undefined && req?.probability){
        parametres = parametres.append("probability",req?.probability);
      }
      if(req?.resolutionDate != undefined && req?.resolutionDate){
        parametres = parametres.append("resolutionDate",req?.resolutionDate);
      }
      if(req?.identificationDate != undefined && req?.identificationDate){
        parametres = parametres.append("statusId",req?.identificationDate);
      }

      return this.http.get<any>(
        `${environment.baseUrl}reviewRisks?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}reviewRisks?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }

  }

   //  create risk of review
   createRiskListOfReview(reviewRisk: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}reviewRisks`, reviewRisk);
  }

    //  create risk of review
    createRiskOfReview(reviewRisk: any): Observable<any> {
      return this.http.post<any>(`${environment.baseUrl}reviewRisks/new`, reviewRisk);
    }

  //  delete issueLog of review
  deleteIssueLogOfReview(reviewIssueLogId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}reviewIssuelogs/${reviewIssueLogId}`);
  }

  //  delete risk of review
  deleteRiskOfReview(reviewRiskId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}reviewRisks/${reviewRiskId}`);
  }

    readFile(id: any): Observable <any>{
      return this.http
      .get(
        `${environment.baseUrl}reviews/${id}/_download`,
        {

          responseType: 'blob'
        }
      );
    }

    importReview(file: any, projectId: any) {
      let formData: FormData = new FormData();
      formData.append('file', file);
      formData.append('projectId', projectId);
  
      return this.http.post<any>(`${environment.baseUrl}reviews/import`, formData, {
        observe: 'response'
      });
    }

    exportReview() {
      return this.http.get(`${environment.baseUrl}reviews/export`, {
        responseType: 'blob'
      });
    }
}
