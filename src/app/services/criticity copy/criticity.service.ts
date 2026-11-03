import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CriticityService {

  constructor(protected http: HttpClient) { }

  //  create criticity
  createcriticity(criticity: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}criticities`, criticity);
  }

  // update a criticity
  updatecriticity(criticityId : any, criticity: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}criticities/${criticityId}`, criticity, {
      observe: 'response',
    });
  }

   // get a criticity
   readcriticity(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}enums/criticities/${id}`, {
      observe: 'response',
    });
  }

  //read all criticities
  readcriticities(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}enums/criticities`, {
      observe: 'response',
    });
  }

  //delete a criticity
  deletecriticity(criticityId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}criticities/${criticityId}`, {
      observe: 'response',
    });
  }
}
