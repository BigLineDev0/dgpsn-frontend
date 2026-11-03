import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IssueLogActionRealizedService {

  constructor(protected http: HttpClient) { }

  //  create activity
  createIssueLogActionRealized(issueLogActionRealized: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}issueLogActionRealized`, issueLogActionRealized);
  }
 
  // update a Activity
  updateIssueLogActionRealized(issueLogActionRealizedId: any, issueLogActionRealized: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}issueLogActionRealized/${issueLogActionRealizedId}`, issueLogActionRealized, {
      observe: 'response',
    });
  }
 
  // get a Activity
  readIssueLogActionRealized(issueLogActionRealized: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}issueLogActionRealized/${issueLogActionRealized}`, {
      observe: 'response',
    });
  }
 
  readByIssueLog(issuelogId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}issueLogActionRealized/byIssuelog/${issuelogId}`, {
      observe: 'response',
    });
  }
   //delete a Activity
   deleteIssueLogActionRealized(issueLogActionRealized: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}issueLogActionRealized/${issueLogActionRealized}`)
   }
}
