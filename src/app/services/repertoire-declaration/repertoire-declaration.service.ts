import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RepertoireDeclarationService {

  constructor(protected http: HttpClient) { }

  createRepertoireDeclaration(repertoireDeclaration: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}repertoire-declarations`, repertoireDeclaration);
  }

  updateRepertoireDeclaration(repertoireDeclarationId: any, repertoireDeclaration: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}repertoire-declarations/${repertoireDeclarationId}`, repertoireDeclaration, {
      observe: 'response',
    });
  }

  readRepertoireDeclaration(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}repertoire-declarations/${id}`, {
      observe: 'response',
    });
  }

  readRepertoireDeclarations(repertoireDeclaration: { [key: string]: string } | null, page: any, size: any): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (repertoireDeclaration !== null) {
      Object.entries(repertoireDeclaration).forEach(([key, value]) => {
        params = params.set(key, value);
      });
    }

    return this.http.get<any>(`${environment.baseUrl}repertoire-declarations`, { params: params });
  }

  deleteRepertoireDeclaration(repertoireDeclarationId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}repertoire-declarations/${repertoireDeclarationId}`, {
      observe: 'response',
    });
  }
}