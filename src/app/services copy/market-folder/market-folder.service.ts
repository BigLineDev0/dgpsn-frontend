import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MarketFolderService {
  constructor(protected http: HttpClient) { }


  createFolderMarket(foldermrk: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}marketfile`, foldermrk);
  }

  updateFolderMarket(Id : any, foldermrk: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}marketfile/${Id}`, foldermrk, {
      observe: 'response',
    });
  }

   readFolderMarket(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}marketfile/${id}`, {
      observe: 'response',
    });
  }


  readFolderMarketPage(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();
    if(req){
      if(req?.code){
        parametres = parametres.append("code",req?.code);
      }
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle",req?.libelle);
      }

      if(req?.passationMarketId != undefined && req?.passationMarketId){
        parametres = parametres.append("passationMarketId",req?.passationMarketId);
      }
      
      return this.http.get<any>(
        `${environment.baseUrl}marketfile?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}marketfile?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
    
  }

  deleteFolderMarket(foldermrkId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}marketfile/${foldermrkId}`, {
      observe: 'response',
    });
  }

  
}


