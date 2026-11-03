import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IssuelogResolveChannelService {

  constructor(protected http: HttpClient) { }

  //  create issuelogResolveChannel
  createissuelogResolveChannel(issuelogResolveChannel: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}issuelogResolveChannel`, issuelogResolveChannel);
  }

  // update a issuelogResolveChannel
  updateissuelogResolveChannel(issuelogResolveChannelId : any, issuelogResolveChannel: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}issuelogResolveChannel/${issuelogResolveChannelId}`, issuelogResolveChannel, {
      observe: 'response',
    });
  }

   // get a issuelogResolveChannel
   readissuelogResolveChannel(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}issuelogResolveChannel/${id}`, {
      observe: 'response',
    });
  }

  //read all issuelogResolveChannel
  readissuelogResolveChannels(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();
    if(req){
      if(req?.issuelogResolveChannel){
        parametres = parametres.append("issuelogResolveChannel",req?.issuelogResolveChannel);
      }
      if(req?.resolveChannel != undefined && req?.resolveChannel){
        parametres = parametres.append("resolveChannel",req?.resolveChannel);
      }
      
      return this.http.get<any>(
        `${environment.baseUrl}issuelogResolveChannel?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}issuelogResolveChannel?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
    
  }

  readResolveChannelByIssuelog(issuelogId: any): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}issuelogResolveChannel/resolveChannelByIssuelog/${issuelogId}`,{
        observe: 'response'
      }
    );
  }

  //delete a issuelogResolveChannel
  
  deleteissuelogResolveChannel(issuelogResolveChannelId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}issuelogResolveChannel/${issuelogResolveChannelId}`, {
      observe: 'response',
    });
  }
}
