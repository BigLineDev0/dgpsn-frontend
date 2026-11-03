import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResolveChannelService {
  constructor(protected http: HttpClient) { }

  //  create resolveChannel
  createResolveChannel(resolveChannel: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}resolveChannels`, resolveChannel);
  }

  // update a resolveChannel
  updateResolveChannel(resolveChannelId : any, resolveChannel: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}resolveChannels/${resolveChannelId}`, resolveChannel, {
      observe: 'response',
    });
  }

   // get a resolveChannel
   readResolveChannel(resolveChannelId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}resolveChannels/${resolveChannelId}`, {
      observe: 'response',
    });
  }

  //read all resolveChannel
  readResolveChannels(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();
    if(req){
      if(req?.code != undefined && req?.code){
        parametres = parametres.append("code",req?.code);
      }
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle",req?.libelle);
      }
    
      return this.http.get<any>(
        `${environment.baseUrl}resolveChannels?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}resolveChannels?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
    
  }

  //delete a resolveChannel
  deleteResolveChannel(resolveChannelId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}resolveChannels/${resolveChannelId}`, {
      observe: 'response',
    });
  }
}
