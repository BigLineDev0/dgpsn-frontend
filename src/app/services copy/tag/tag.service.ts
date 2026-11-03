import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  constructor(protected http: HttpClient) { }

  //  create Tag
  createTag(tag: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}tags`, tag);
  }

  // update a Tag
  updateTag(tagId : any, tag: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}tags/${tagId}`, tag, {
      observe: 'response',
    });
  }

   // get a Tag
   readTag(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}tags/${id}`, {
      observe: 'response',
    });
  }

  //read all tags
  readTags(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();
    if(req){
      if(req?.code){
        parametres = parametres.append("code",req?.code);
      }
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle",req?.libelle);
      }
      return this.http.get<any>(
        `${environment.baseUrl}tags?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}tags?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
    
  }

  //delete a Tag
  deleteTag(TagId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}tags/${TagId}`, {
      observe: 'response',
    });
  }
}
