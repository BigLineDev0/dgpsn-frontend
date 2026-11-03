import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IssuelogStructureService {
  constructor(protected http: HttpClient) { }

  //  create issuelogStructure
  createissuelogStructure(issuelogStructure: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}issuelogStructure`, issuelogStructure);
  }

  // update a issuelogStructure
  updateissuelogStructure(issuelogStructureId : any, issuelogStructure: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}issuelogStructure/${issuelogStructureId}`, issuelogStructure, {
      observe: 'response',
    });
  }

   // get a issuelogStructure
   readissuelogStructure(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}issuelogStructure/${id}`, {
      observe: 'response',
    });
  }

  readStructureByIssuelog(issuelogId: any): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}issuelogStructure/structureByIssuelog/${issuelogId}`,{
        observe: 'response'
      }
    );
  }

  //delete a issuelogStructure
  
  deleteissuelogStructure(issuelogStructureId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}issuelogStructure/${issuelogStructureId}`, {
      observe: 'response',
    });
  }
}
