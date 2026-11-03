import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IssueLogComponentService {

  constructor(protected http: HttpClient) { }

  //  create issuelogComponent
  createissuelogComponent(issuelogComponent: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}issuelogComponent/link`, issuelogComponent);
  }

  // update a issuelogComponent
  updateissuelogComponent(issuelogComponentId : any, issuelogComponent: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}issuelogComponent/${issuelogComponentId}`, issuelogComponent, {
      observe: 'response',
    });
  }

   // get a issuelogComponent
   readissuelogComponent(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}issuelogComponent/${id}`, {
      observe: 'response',
    });
  }

  //read all issuelogComponent
  readissuelogComponents(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();
    if(req){
      if(req?.projectId){
        parametres = parametres.append("projectId",req?.projectId);
      }
      // if(req?.componentId != undefined && req?.component){
      //   parametres = parametres.append("componentId",req?.componentId);
      // }

      return this.http.get<any>(
        `${environment.baseUrl}issuelogComponent?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}issuelogComponent?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }

  }

  //read all issuelogComponent by component

  readissuelogByComponents(id:any): Observable<any> {

    return this.http.get<any>(`${environment.baseUrl}issuelogComponent/byComponent/${id}`, {
      observe: 'response',
    });
  }

  //delete a issuelogComponent

  deleteissuelogComponent(issuelogComponentId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}issuelogComponent/${issuelogComponentId}`, {
      observe: 'response',
    });
  }
}
