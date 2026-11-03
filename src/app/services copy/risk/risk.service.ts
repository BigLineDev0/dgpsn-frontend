import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RiskService {
  
  constructor(protected http: HttpClient) { }

  //  create risk
  createRisk(risk: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}risks`, risk);
  }

  // update a risk
  updateRisk(riskId : any, risk: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}risks/${riskId}`, risk, {
      observe: 'response',
    });
  }

   // get a risk
   readRisk(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}risks/${id}`, {
      observe: 'response',
    });
  }

  //read all risks
  readRisks(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();
    if(req){
      if(req?.projetId != undefined){
        parametres = parametres.append("projetId",req?.projetId);
      }
      if(req.libelle != undefined){
        parametres = parametres.append("libelle",req.libelle);
      }
      if(req.statusId != undefined){
        parametres = parametres.append("statusId",req.statusId);
      }
      if(req.natureId != undefined){
        parametres = parametres.append("natureId",req.natureId);
      }
      if(req.criticity != undefined){
        parametres = parametres.append("criticity",req.criticity);
      }
      if(req.identificationDate != undefined){
        parametres = parametres.append("identificationDate",req.identificationDate);
      }
     
      

      return this.http.get<any>(
        `${environment.baseUrl}risks?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}risks?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
    
  }

  //delete a risk
  deleteRisk(riskId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}risks/${riskId}`, {
      observe: 'response',
    });
  }

  //read issueLog by risk
  readRiskByRisk(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();
    if(req){
      
      if(req?.riskId != undefined && req?.projetId){
        parametres = parametres.append("riskId",req?.riskId);
      }
      return this.http.get<any>(
        `${environment.baseUrl}risks?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}risks?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
    
  }

  // get a risk
  readRiskByIssueLog(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}risks/byIssueLog/${id}`, {
      observe: 'response',
    });
  }
  importrisk(file: any, projectId: any) {
    let formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('projectId', projectId);

    return this.http.post<any>(`${environment.baseUrl}risks/import`, formData, {
      observe: 'response'
    });
  }

  //export to excel
  exportRiskToExcel() {
    
    return this.http.get('http://localhost:9090/siggi-api-v1/risks/export/excel', { responseType: 'blob' }).subscribe(
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
}
